import React, { useState, useEffect } from 'react';

interface EDDMResult {
  printingCost: number;
  postageCost: number;
  designCost: number;
  totalCost: number;
  costPerDoor: number;
  estimatedResponses: number;
  estimatedRevenue: number;
  roi: number;
}

const EDDMCalculator: React.FC = () => {
  const [routeCount, setRouteCount] = useState<number>(5);
  const [mailPieceSize, setMailPieceSize] = useState<string>('postcard-6x9');
  const [hasDesign, setHasDesign] = useState<boolean>(false);
  const [responseRate, setResponseRate] = useState<number>(1.0);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(100);
  const [result, setResult] = useState<EDDMResult | null>(null);

  const AVG_HOMES_PER_ROUTE = 425;
  const EDDM_POSTAGE_RATE = 0.260;
  const DESIGN_FEE = 350;

  const printingRates: { [key: string]: number } = {
    'postcard-6x9': 0.22,
    'postcard-6x11': 0.28,
    'postcard-8.5x11': 0.32,
    'flyer-8.5x11': 0.18,
  };

  useEffect(() => {
    calculateEDDM();
  }, [routeCount, mailPieceSize, hasDesign, responseRate, avgOrderValue]);

  const calculateEDDM = () => {
    const totalPieces = routeCount * AVG_HOMES_PER_ROUTE;
    const printingCost = totalPieces * printingRates[mailPieceSize];
    const postageCost = totalPieces * EDDM_POSTAGE_RATE;
    const designCost = hasDesign ? DESIGN_FEE : 0;
    const totalCost = printingCost + postageCost + designCost;
    const costPerDoor = totalCost / totalPieces;

    const estimatedResponses = totalPieces * (responseRate / 100);
    const estimatedRevenue = estimatedResponses * avgOrderValue;
    const roi = ((estimatedRevenue - totalCost) / totalCost) * 100;

    setResult({
      printingCost,
      postageCost,
      designCost,
      totalCost,
      costPerDoor,
      estimatedResponses,
      estimatedRevenue,
      roi,
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
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(num);
  };

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "EDDM ROI Calculator",
    "applicationCategory": "FinanceApplication",
    "description": "Calculate ROI for Every Door Direct Mail campaigns",
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
            EDDM ROI Calculator
          </h3>
          <p className="text-gray-600">
            Calculate costs and projected return on investment for your EDDM campaign
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-5">
            <h4 className="font-semibold text-gray-900">Campaign Settings</h4>
            
            <div>
              <label htmlFor="routeCount" className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Routes
              </label>
              <input
                type="number"
                id="routeCount"
                min="1"
                max="100"
                value={routeCount}
                onChange={(e) => setRouteCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <p className="text-xs text-gray-500 mt-1">
                ≈ {formatNumber(routeCount * AVG_HOMES_PER_ROUTE)} households
              </p>
            </div>

            <div>
              <label htmlFor="mailPieceSize" className="block text-sm font-semibold text-gray-700 mb-2">
                Mail Piece Size
              </label>
              <select
                id="mailPieceSize"
                value={mailPieceSize}
                onChange={(e) => setMailPieceSize(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="postcard-6x9">6" × 9" Postcard</option>
                <option value="postcard-6x11">6" × 11" Postcard</option>
                <option value="postcard-8.5x11">8.5" × 11" Postcard</option>
                <option value="flyer-8.5x11">8.5" × 11" Flyer</option>
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
                    checked={!hasDesign}
                    onChange={() => setHasDesign(false)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="design"
                    checked={hasDesign}
                    onChange={() => setHasDesign(true)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Yes ($350)</span>
                </label>
              </div>
            </div>

            <h4 className="font-semibold text-gray-900 pt-4 border-t border-gray-200">ROI Projections</h4>

            <div>
              <label htmlFor="responseRate" className="block text-sm font-semibold text-gray-700 mb-2">
                Expected Response Rate (%)
              </label>
              <input
                type="number"
                id="responseRate"
                min="0.1"
                max="10"
                step="0.1"
                value={responseRate}
                onChange={(e) => setResponseRate(Math.max(0.1, parseFloat(e.target.value) || 1.0))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <p className="text-xs text-gray-500 mt-1">
                Industry average: 0.5% - 2%
              </p>
            </div>

            <div>
              <label htmlFor="avgOrderValue" className="block text-sm font-semibold text-gray-700 mb-2">
                Average Order Value ($)
              </label>
              <input
                type="number"
                id="avgOrderValue"
                min="10"
                max="10000"
                step="10"
                value={avgOrderValue}
                onChange={(e) => setAvgOrderValue(Math.max(10, parseInt(e.target.value) || 100))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                Campaign Cost
              </h4>
              
              {result && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Printing</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(result.printingCost)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">EDDM Postage</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(result.postageCost)}</span>
                  </div>
                  
                  {hasDesign && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Design</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(result.designCost)}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total Cost</span>
                      <span className="text-2xl font-bold text-blue-600">{formatCurrency(result.totalCost)}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 text-sm">
                      <span className="text-gray-500">Cost per door</span>
                      <span className="font-medium text-gray-700">{formatCurrency(result.costPerDoor)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                Projected Returns
              </h4>
              
              {result && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Expected Responses</span>
                    <span className="font-semibold text-gray-900">{formatNumber(result.estimatedResponses)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Estimated Revenue</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(result.estimatedRevenue)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">ROI</span>
                      <span className={`text-2xl font-bold ${result.roi > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {result.roi > 0 ? '+' : ''}{formatNumber(result.roi)}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {result.roi > 0 
                        ? `Profit: ${formatCurrency(result.estimatedRevenue - result.totalCost)}`
                        : 'Adjust response rate or order value to improve ROI'
                      }
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <a
                      href="/services/eddm"
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors shadow-md hover:shadow-lg"
                    >
                      Start Your EDDM Campaign
                    </a>
                  </div>
                </div>
              )}
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
                EDDM campaigns typically see better response rates when targeting residential routes in spring and fall. Include a clear call-to-action and time-limited offer to boost response rates above 1%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EDDMCalculator;
