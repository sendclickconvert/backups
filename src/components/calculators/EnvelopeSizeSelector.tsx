import React, { useState, useEffect } from 'react';

interface EnvelopeRecommendation {
  name: string;
  dimensions: string;
  postageClass: string;
  fitMargin: string;
  specifications: string;
}

const EnvelopeSizeSelector: React.FC = () => {
  const [insertLength, setInsertLength] = useState<number>(8.5);
  const [insertWidth, setInsertWidth] = useState<number>(11);
  const [insertType, setInsertType] = useState<string>('flat');
  const [recommendations, setRecommendations] = useState<EnvelopeRecommendation[]>([]);

  const envelopeSizes = [
    { name: '#10 Business', length: 9.5, width: 4.125, postage: 'First Class Letter', maxInsert: { length: 9.25, width: 4 } },
    { name: '#9 Reply', length: 8.875, width: 3.875, postage: 'First Class Letter', maxInsert: { length: 8.625, width: 3.75 } },
    { name: '6x9 Booklet', length: 9, width: 6, postage: 'First Class Flat', maxInsert: { length: 8.75, width: 5.875 } },
    { name: '9x12 Catalog', length: 12, width: 9, postage: 'First Class Flat', maxInsert: { length: 11.75, width: 8.875 } },
    { name: '10x13 Catalog', length: 13, width: 10, postage: 'First Class Flat', maxInsert: { length: 12.75, width: 9.875 } },
    { name: 'A2 (4.375" × 5.75")', length: 5.75, width: 4.375, postage: 'First Class Letter', maxInsert: { length: 5.5, width: 4.25 } },
    { name: 'A6 (4.75" × 6.5")', length: 6.5, width: 4.75, postage: 'First Class Letter', maxInsert: { length: 6.25, width: 4.625 } },
    { name: 'A7 (5.25" × 7.25")', length: 7.25, width: 5.25, postage: 'First Class Letter', maxInsert: { length: 7, width: 5.125 } },
  ];

  useEffect(() => {
    findRecommendations();
  }, [insertLength, insertWidth, insertType]);

  const findRecommendations = () => {
    const margin = insertType === 'folded' ? 0.125 : 0.25;
    
    const suitable = envelopeSizes
      .filter(env => {
        const fitsNormally = insertLength + margin <= env.maxInsert.length && insertWidth + margin <= env.maxInsert.width;
        const fitsRotated = insertWidth + margin <= env.maxInsert.length && insertLength + margin <= env.maxInsert.width;
        return fitsNormally || fitsRotated;
      })
      .map(env => {
        const lengthMargin = env.maxInsert.length - insertLength;
        const widthMargin = env.maxInsert.width - insertWidth;
        const fitQuality = Math.min(lengthMargin, widthMargin) < 0.5 ? 'Snug fit' : 'Comfortable fit';
        
        return {
          name: env.name,
          dimensions: `${env.length}" × ${env.width}"`,
          postageClass: env.postage,
          fitMargin: fitQuality,
          specifications: `Max insert: ${env.maxInsert.length}" × ${env.maxInsert.width}"`,
        };
      })
      .slice(0, 3);

    setRecommendations(suitable);
  };

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Envelope Size Selector Tool",
    "applicationCategory": "UtilityApplication",
    "description": "Find the right envelope size for your mail piece",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
      
      <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl shadow-lg p-6 md:p-8 my-8 border border-blue-100">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Envelope Size Selector
          </h3>
          <p className="text-gray-600">
            Find the perfect envelope for your mail piece
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-5">
            <h4 className="font-semibold text-gray-900">Your Mail Piece</h4>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Insert Dimensions (inches)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="number"
                    placeholder="Length"
                    min="3"
                    max="15"
                    step="0.125"
                    value={insertLength}
                    onChange={(e) => setInsertLength(parseFloat(e.target.value) || 8.5)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                  <p className="text-xs text-gray-500 mt-1">Length</p>
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Width"
                    min="3"
                    max="12"
                    step="0.125"
                    value={insertWidth}
                    onChange={(e) => setInsertWidth(parseFloat(e.target.value) || 11)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                  <p className="text-xs text-gray-500 mt-1">Width</p>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="insertType" className="block text-sm font-semibold text-gray-700 mb-2">
                Insert Type
              </label>
              <select
                id="insertType"
                value={insertType}
                onChange={(e) => setInsertType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="flat">Flat (Single Sheet)</option>
                <option value="folded">Folded (Letter/Brochure)</option>
                <option value="booklet">Booklet/Catalog</option>
                <option value="card">Greeting Card</option>
              </select>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-3">Common Sizes:</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setInsertLength(8.5); setInsertWidth(11); }}
                  className="px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded border border-blue-200 transition"
                >
                  8.5" × 11" Letter
                </button>
                <button
                  onClick={() => { setInsertLength(5.5); setInsertWidth(8.5); }}
                  className="px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded border border-blue-200 transition"
                >
                  5.5" × 8.5" Half
                </button>
                <button
                  onClick={() => { setInsertLength(5); setInsertWidth(7); }}
                  className="px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded border border-blue-200 transition"
                >
                  5" × 7" Card
                </button>
                <button
                  onClick={() => { setInsertLength(6); setInsertWidth(9); }}
                  className="px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded border border-blue-200 transition"
                >
                  6" × 9" Booklet
                </button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Recommended Envelopes</h4>
            
            {recommendations.length > 0 ? (
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-lg p-4 border-2 transition ${
                      index === 0 ? 'border-blue-500 shadow-md' : 'border-gray-200'
                    }`}
                  >
                    {index === 0 && (
                      <div className="inline-block bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded mb-2">
                        BEST FIT
                      </div>
                    )}
                    <h5 className="font-bold text-gray-900 text-lg">{rec.name}</h5>
                    <p className="text-sm text-gray-600 mt-1">Size: {rec.dimensions}</p>
                    <p className="text-sm text-gray-600">Postage: {rec.postageClass}</p>
                    <p className="text-sm text-blue-600 font-medium mt-1">{rec.fitMargin}</p>
                    <p className="text-xs text-gray-500 mt-2">{rec.specifications}</p>
                    
                    <a
                      href={`/guides/envelope-sizes#${rec.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      className="inline-block mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View Full Specs →
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  No standard envelopes fit those dimensions. Consider a custom envelope or adjusting your insert size.
                </p>
                <a
                  href="/contact"
                  className="inline-block mt-3 text-sm text-yellow-700 hover:text-yellow-800 font-medium"
                >
                  Contact us about custom envelopes →
                </a>
              </div>
            )}

            <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200">
              <h5 className="font-semibold text-gray-900 text-sm mb-2">Need Help Choosing?</h5>
              <p className="text-xs text-gray-600 mb-3">
                Our direct mail experts can recommend the best envelope and postage class for your campaign.
              </p>
              <a
                href="/contact?subject=Envelope Size Consultation"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center text-sm transition-colors"
              >
                Get Expert Advice
              </a>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-blue-900">CRST Insider Tip</p>
              <p className="text-sm text-blue-800 mt-1">
                Choose an envelope slightly larger than your insert for easier automated insertion. A #10 envelope is ideal for standard 8.5" × 11" letters folded in thirds. For postcards, go borderless - no envelope needed, and you'll save on printing and postage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnvelopeSizeSelector;
