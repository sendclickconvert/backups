import { useState, useRef, useCallback } from 'react';
import { LETTER_SPEC, POSTCARD_SPEC, ZONES, ZONE_COLORS, ZONE_STROKE_COLORS, ZONE_LABELS, SHOW_NOTICE67_OVERLAY } from '../../data/notice67-specs';

type PieceType = 'letter' | 'postcard';

interface CheckResult {
  label: string;
  pass: boolean;
  value: string;
  limit: string;
  note?: string;
}

interface PDFDimensions {
  widthPts: number;
  heightPts: number;
  widthIn: number;
  heightIn: number;
  lengthIn: number; // longer dimension
  heightDimIn: number; // shorter dimension
}

const PT_PER_INCH = 72;

function runChecks(dims: PDFDimensions, pieceType: PieceType): CheckResult[] {
  const spec = pieceType === 'letter' ? LETTER_SPEC : POSTCARD_SPEC;
  const { lengthIn, heightDimIn } = dims;
  const aspect = lengthIn / heightDimIn;

  const results: CheckResult[] = [
    {
      label: 'Height (shorter dimension)',
      pass: heightDimIn >= spec.height.min && heightDimIn <= spec.height.max,
      value: `${heightDimIn.toFixed(3)}"`,
      limit: `${spec.height.min}" – ${spec.height.max}"`,
    },
    {
      label: 'Length (longer dimension)',
      pass: lengthIn >= spec.length.min && lengthIn <= spec.length.max,
      value: `${lengthIn.toFixed(3)}"`,
      limit: `${spec.length.min}" – ${spec.length.max}"`,
    },
    {
      label: 'Aspect ratio (length ÷ height)',
      pass: aspect >= LETTER_SPEC.aspectRatio.min && aspect <= LETTER_SPEC.aspectRatio.max,
      value: aspect.toFixed(3),
      limit: `${LETTER_SPEC.aspectRatio.min} – ${LETTER_SPEC.aspectRatio.max}`,
      note: 'Applies to both letters and postcards — DMM 101.1.2',
    },
  ];

  return results;
}

function drawZones(
  canvas: HTMLCanvasElement,
  dims: PDFDimensions,
  scale: number,
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const cw = canvas.width;
  const ch = canvas.height;

  // Convert inches to canvas pixels
  const inToPx = (inches: number) => inches * PT_PER_INCH * scale;

  // Helper: draw a zone rectangle.
  // USPS zones use bottom-left origin; canvas uses top-left.
  // fromBottom/fromTop are measured from respective edges.
  const drawZone = (
    key: keyof typeof ZONES,
    fromLeft: number,       // inches from left edge (or NaN to use fromRight)
    fromRight: number | null, // inches from right edge
    fromBottom: number | null, // inches from bottom edge
    fromTop: number | null,    // inches from top edge
    width: number,
    height: number,
  ) => {
    const x = fromRight !== null
      ? cw - inToPx(fromRight) - inToPx(width)
      : inToPx(fromLeft);
    const y = fromBottom !== null
      ? ch - inToPx(fromBottom) - inToPx(height)
      : inToPx(fromTop!);
    const w = inToPx(width);
    const h = inToPx(height);

    ctx.fillStyle = ZONE_COLORS[key];
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = ZONE_STROKE_COLORS[key];
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, y, w, h);

    // Label
    ctx.fillStyle = ZONE_STROKE_COLORS[key];
    ctx.font = `bold ${Math.max(9, inToPx(0.12))}px system-ui, sans-serif`;
    ctx.fillText(ZONE_LABELS[key], x + 4, y + Math.max(12, inToPx(0.16)));
  };

  const z = ZONES;
  const pieceWidthIn = dims.widthPts / PT_PER_INCH;
  const pieceHeightIn = dims.heightPts / PT_PER_INCH;

  // OCR Read Area
  const ocrWidth = pieceWidthIn - z.ocrReadArea.fromLeftEdge - z.ocrReadArea.fromRightEdge;
  const ocrHeight = z.ocrReadArea.toBottomEdge - z.ocrReadArea.fromBottomEdge;
  drawZone('ocrReadArea', z.ocrReadArea.fromLeftEdge, null, z.ocrReadArea.fromBottomEdge, null, ocrWidth, ocrHeight);

  // Barcode Clear Zone
  const bcWidth = Math.min(z.barcodeZone.extentFromRight - z.barcodeZone.fromRightEdge, pieceWidthIn);
  const bcHeight = z.barcodeZone.toBottomEdge - z.barcodeZone.fromBottomEdge;
  drawZone('barcodeZone', 0, z.barcodeZone.fromRightEdge, z.barcodeZone.fromBottomEdge, null, bcWidth, bcHeight);

  // FIM
  drawZone('fim', 0, z.fim.fromRightEdge, null, z.fim.fromTopEdge, z.fim.width, z.fim.height);

  // Return Address
  drawZone('returnAddress', z.returnAddress.fromLeftEdge, null, null, z.returnAddress.fromTopEdge, z.returnAddress.width, z.returnAddress.height);
}

export default function Notice67Checker() {
  const [pieceType, setPieceType] = useState<PieceType>('letter');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [checks, setChecks] = useState<CheckResult[]>([]);
  const [dims, setDims] = useState<PDFDimensions | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (file: File) => {
    if (!file || file.type !== 'application/pdf') {
      setErrorMsg('Please upload a PDF file.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    setChecks([]);
    setDims(null);

    try {
      // Dynamic import — pdfjs-dist loads in browser only
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      // PDF viewport at scale 1 → 1px per pt (72pt = 1in)
      const viewport = page.getViewport({ scale: 1 });
      const widthPts = viewport.width;
      const heightPts = viewport.height;
      const widthIn = widthPts / PT_PER_INCH;
      const heightIn = heightPts / PT_PER_INCH;
      const lengthIn = Math.max(widthIn, heightIn);
      const heightDimIn = Math.min(widthIn, heightIn);

      const pdfDims: PDFDimensions = { widthPts, heightPts, widthIn, heightIn, lengthIn, heightDimIn };
      setDims(pdfDims);

      const results = runChecks(pdfDims, pieceType);
      setChecks(results);

      // Render to canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const containerWidth = Math.min(canvas.parentElement?.clientWidth ?? 640, 640);
        const displayScale = containerWidth / widthPts;
        canvas.width = Math.round(widthPts * displayScale);
        canvas.height = Math.round(heightPts * displayScale);
        canvas.style.width = `${canvas.width}px`;
        canvas.style.height = `${canvas.height}px`;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          const renderViewport = page.getViewport({ scale: displayScale });
          await page.render({ canvasContext: ctx, viewport: renderViewport }).promise;
          if (SHOW_NOTICE67_OVERLAY) drawZones(canvas, pdfDims, displayScale);
        }
      }

      setStatus('done');
    } catch (err) {
      console.error(err);
      setErrorMsg('Could not read that PDF. Make sure it is a valid, unencrypted PDF file.');
      setStatus('error');
    }
  }, [pieceType]);

  const handleFiles = (files: FileList | null) => {
    if (files && files[0]) processFile(files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const allPass = checks.length > 0 && checks.every(c => c.pass);
  const anyFail = checks.some(c => !c.pass);

  return (
    <div className="space-y-6">

      {/* Privacy banner */}
      <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
        <svg className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <p className="text-sm text-emerald-800">
          <strong>Your file never leaves your browser.</strong> This tool uses PDF.js to read and render your artwork locally. No file is uploaded to any server.
        </p>
      </div>

      {/* Piece type selector */}
      <div className="flex gap-3">
        {(['letter', 'postcard'] as PieceType[]).map(type => (
          <button
            key={type}
            onClick={() => { setPieceType(type); setStatus('idle'); setChecks([]); setDims(null); }}
            className={`px-5 py-2 rounded-lg text-sm font-semibold border transition-colors ${
              pieceType === type
                ? 'bg-crst-primary text-white border-crst-primary'
                : 'bg-white text-navy-700 border-navy-200 hover:border-crst-primary'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
        <span className="text-xs text-navy-400 self-center ml-1">Select piece type, then upload PDF</span>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-crst-primary bg-crst-primary/5'
            : 'border-navy-200 hover:border-crst-primary bg-navy-50 hover:bg-crst-primary/5'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />
        <svg className="w-10 h-10 text-navy-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
        {status === 'loading' ? (
          <p className="text-navy-600 font-heading font-semibold">Reading PDF…</p>
        ) : (
          <>
            <p className="text-navy-700 font-heading font-semibold mb-1">Drop your print-ready PDF here</p>
            <p className="text-sm text-navy-400">or click to browse — page 1 dimensions will be checked automatically</p>
          </>
        )}
      </div>

      {/* Error */}
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4">
          <p className="text-sm text-red-700 font-semibold">{errorMsg}</p>
        </div>
      )}

      {/* Results */}
      {status === 'done' && dims && (
        <div className="space-y-5">

          {/* Pass / fail banner */}
          <div className={`flex items-center gap-3 rounded-xl px-5 py-4 border ${
            allPass ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
          }`}>
            <span className={`text-2xl ${allPass ? 'text-emerald-500' : 'text-red-500'}`}>
              {allPass ? '✓' : '✗'}
            </span>
            <div>
              <p className={`font-heading font-bold ${allPass ? 'text-emerald-800' : 'text-red-800'}`}>
                {allPass
                  ? `Dimensions pass all ${pieceType} size checks`
                  : `One or more size checks failed`}
              </p>
              <p className="text-xs text-navy-500 mt-0.5">
                Checked against USPS DMM 101.1.2 · Page 1 of uploaded PDF
              </p>
            </div>
          </div>

          {/* Dimension readout */}
          <div className="bg-white border border-navy-100 rounded-xl px-5 py-4 text-sm text-navy-600 grid grid-cols-2 gap-x-6 gap-y-1">
            <span className="text-navy-400">Page 1 width</span><span>{dims.widthIn.toFixed(3)}" ({dims.widthPts.toFixed(0)} pt)</span>
            <span className="text-navy-400">Page 1 height</span><span>{dims.heightIn.toFixed(3)}" ({dims.heightPts.toFixed(0)} pt)</span>
            <span className="text-navy-400">USPS length (longer)</span><span className="font-semibold">{dims.lengthIn.toFixed(3)}"</span>
            <span className="text-navy-400">USPS height (shorter)</span><span className="font-semibold">{dims.heightDimIn.toFixed(3)}"</span>
          </div>

          {/* Check rows */}
          <div className="divide-y divide-navy-100 border border-navy-100 rounded-xl overflow-hidden">
            {checks.map((c, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-4 bg-white">
                <span className={`mt-0.5 text-lg font-bold shrink-0 ${c.pass ? 'text-emerald-500' : 'text-red-500'}`}>
                  {c.pass ? '✓' : '✗'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-heading font-semibold text-navy-800">{c.label}</p>
                  <p className="text-xs text-navy-500 mt-0.5">
                    Measured: <strong className={c.pass ? 'text-emerald-700' : 'text-red-700'}>{c.value}</strong>
                    <span className="mx-2">·</span>
                    Limit: {c.limit}
                  </p>
                  {c.note && <p className="text-xs text-navy-400 mt-1">{c.note}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* PDF preview canvas — renders page 1 without zone overlay until overlay values are sourced */}
          <div>
            <p className="text-sm font-heading font-semibold text-navy-700 mb-3">PDF preview — page 1</p>
            <div className="overflow-x-auto">
              <canvas ref={canvasRef} className="rounded-xl border border-navy-200 max-w-full shadow-sm" />
            </div>
          </div>

          {/* Zone overlay + legend — hidden until SHOW_NOTICE67_OVERLAY = true in notice67-specs.ts */}
          {SHOW_NOTICE67_OVERLAY && (
            <div>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {(Object.keys(ZONE_LABELS) as (keyof typeof ZONE_LABELS)[]).map(key => (
                  <div key={key} className="flex items-center gap-1.5 text-xs text-navy-600">
                    <span
                      className="w-3 h-3 rounded-sm inline-block border"
                      style={{ background: ZONE_COLORS[key], borderColor: ZONE_STROKE_COLORS[key] }}
                    />
                    {ZONE_LABELS[key]}
                    {ZONES[key].approximate && <span className="text-amber-500 font-bold" title={ZONES[key].approxNote}>~</span>}
                  </div>
                ))}
                <span className="text-xs text-navy-400">~ = approximate zone boundary</span>
              </div>
            </div>
          )}

          {/* Any fails → suggest Cornerstone review */}
          {anyFail && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-5">
              <p className="font-heading font-bold text-red-800 mb-2">Dimension issue detected</p>
              <p className="text-sm text-red-700 mb-4">
                One or more dimensions fall outside USPS spec for {pieceType} mail. A piece presented at the BMEU with out-of-spec dimensions will be rejected.
                Contact Cornerstone before going to press — we can confirm what's correctable and what will affect postage class.
              </p>
              <div className="flex gap-3">
                <a href="/contact" className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">Talk to Cornerstone →</a>
                <a href="tel:+18452555722" className="inline-block border border-red-300 text-red-700 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-100 transition-colors">(845) 255-5722</a>
              </div>
            </div>
          )}

          {/* Passes → BMEU next steps */}
          {allPass && (
            <div className="bg-navy-50 border border-navy-100 rounded-xl px-5 py-4 text-sm text-navy-600">
              <p className="font-heading font-semibold text-navy-800 mb-1">Dimensions check out — next steps</p>
              <p>Correct dimensions are necessary but not sufficient for automation compatibility. Your artwork still needs:
                correct indicia placement, valid FIM pattern, delivery address within the OCR read area, and barcode clear zone reserved.
                Cornerstone reviews all of this before production.</p>
              <a href="/contact" className="mt-3 inline-block text-crst-primary underline hover:text-crst-gold font-semibold">Get a pre-press compliance review →</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
