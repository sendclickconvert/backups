import React, { useState, useEffect } from 'react';

interface CalculationResult {
  printing: number;
  postage: number;
  design: number;
  total: number;
  perPiece: number;
}

const DirectMailCostCalculator: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(5000);
  const [mailPiece, setMailPiece] = useState<string>('postcard-4x6');
  const [postageClass, setPostageClass] = useState<string>('marketing');
  const [needsDesign, setNeedsDesign] = useState<boolean>(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const printingRates: { [key: string]: number } = {
    'postcard-4x6': 0.15,
    'postcard-6x9': 0.22,
    'postcard-6x11': 0.28,
    'letter-single': 0.18,
    'letter-double': 0.24,
    'self-mailer': 0.28,
    'bifold': 0.32,
    'catalog': 0.45,
  };

  const postageRates: { [key: string]: number } = {
    'first-class': 0.73,
    'marketing': 0.40,
    'eddm': 0.216,
    'nonprofit': 0.338,
  };

  const DESIGN_FEE = 350;

  useEffect(() => {
    calculateCost();
  }, [quantity, mailPiece, postageClass, needsDesign]);

  const calculateCost = () => {
    const printingCost = quantity * printingRates[mailPiece];
    const postageCost = quantity * postageRates[postageClass];
    const designCost = needsDesign ? DESIGN_FEE : 0;
    const totalCost = printingCost + postageCost + designCost;
    const costPerPiece = totalCost / quantity;

    setResult({
      printing: printingCost,
      postage: postageCost,
      design: designCost,
      total: totalCost,
      perPiece: costPerPiece,
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Direct Mail Cost Calculator",
    "applicationCategory": "FinanceApplication",
    "description": "Calculate your direct mail campaign costs including printing, postage, and design",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "provider": {
      "@type": "Organization",
      "name": "Cornerstone Services Inc"
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
            Direct Mail Cost Calculator
          </h3>
          <p className="text-gray-600">
            Get an instant estimate for your direct mail campaign
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-5">
            <div>
              <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                min="500"
                max="100000"
                step="500"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(500, parseInt(e.target.value) || 500))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formatNumber(quantity)} pieces
              </p>
            </div>

            <div>
              <label htmlFor="mailPiece" className="block text-sm font-semibold text-gray-700 mb-2">
                Mail Piece Type
              </label>
              <select
                id="mailPiece"
                value={mailPiece}
                onChange={(e) => setMailPiece(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="postcard-4x6">Postcard 4" × 6"</option>
                <option value="postcard-6x9">Postcard 6" × 9"</option>
                <option value="postcard-6x11">Postcard 6" × 11"</option>
                <option value="letter-single">Letter (Single Sheet)</option>
                <option value="letter-double">Letter (Double Sheet)</option>
                <option value="self-mailer">Self-Mailer</option>
                <option value="bifold">Bifold Brochure</option>
                <option value="catalog">Catalog/Booklet</option>
              </select>
            </div>

            <div>
              <label htmlFor="postageClass" className="block text-sm font-semibold text-gray-700 mb-2">
                Postage Class
              </label>
              <select
                id="postageClass"
                value={postageClass}
                onChange={(e) => setPostageClass(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="first-class">First Class ($0.73/piece)</option>
                <option value="marketing">Marketing Mail ($0.40/piece)</option>
                <option value="eddm">EDDM ($0.216/piece)</option>
                <option value="nonprofit">Nonprofit ($0.338/piece)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Need Design Services?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="design"
                    checked={!needsDesign}
                    onChange={() => setNeedsDesign(false)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">No, I have artwork</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="design"
                    checked={needsDesign}
                    onChange={() => setNeedsDesign(true)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Yes ($350)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <h4 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
              Estimated Cost Breakdown
            </h4>
            
            {result && (
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Printing ({formatNumber(quantity)} pcs)</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(result.printing)}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Postage ({formatNumber(quantity)} pcs)</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(result.postage)}</span>
                </div>
                
                {needsDesign && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Design Services</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(result.design)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Campaign Cost</span>
                    <span className="text-2xl font-bold text-blue-600">{formatCurrency(result.total)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <span className="text-gray-500">Cost per piece</span>
                    <span className="font-medium text-gray-700">{formatCurrency(result.perPiece)}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <a
                    href={`/contact?subject=Direct Mail Quote Request - ${formatNumber(quantity)} pieces&message=I'm interested in a quote for ${formatNumber(quantity)} ${mailPiece.replace('-', ' ')} pieces using ${postageClass.replace('-', ' ')} mail.`}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors shadow-md hover:shadow-lg"
                  >
                    Get Custom Quote
                  </a>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Final pricing may vary based on specific requirements
                  </p>
                </div>
              </div>
            )}
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
                Marketing Mail requires a minimum of 500 pieces but offers significant postage savings compared to First Class. 
                For campaigns over 5,000 pieces, ask about our presort discounts for additional savings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DirectMailCostCalculator;
