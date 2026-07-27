import React, { useState, useEffect } from 'react';

interface PostageResult {
  basePostage: number;
  presortSavings: number;
  finalCost: number;
  savingsPercent: number;
}

const PostageCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number>(1);
  const [length, setLength] = useState<number>(6);
  const [width, setWidth] = useState<number>(4);
  const [height, setHeight] = useState<number>(0.25);
  const [mailClass, setMailClass] = useState<string>('first-class');
  const [zone, setZone] = useState<string>('local');
  const [result, setResult] = useState<PostageResult | null>(null);

  const postageRates: { [key: string]: { [key: string]: number } } = {
    'first-class': {
      'local': 0.78,
      'zone1-3': 0.78,
      'zone4-6': 0.93,
      'zone7-8': 1.08,
    },
    'marketing': {
      'local': 0.40,
      'zone1-3': 0.40,
      'zone4-6': 0.45,
      'zone7-8': 0.52,
    },
    'eddm': {
      'local': 0.216,
      'zone1-3': 0.216,
      'zone4-6': 0.216,
      'zone7-8': 0.216,
    },
  };

  const presortDiscounts: { [key: string]: number } = {
    'first-class': 0.058,
    'marketing': 0.034,
    'eddm': 0,
  };

  useEffect(() => {
    calculatePostage();
  }, [weight, length, width, height, mailClass, zone]);

  const calculatePostage = () => {
    const baseRate = postageRates[mailClass]?.[zone] || 0.78;
    const weightSurcharge = weight > 1 ? (weight - 1) * 0.28 : 0;
    const basePostage = baseRate + weightSurcharge;
    
    const presortSavings = presortDiscounts[mailClass] || 0;
    const finalCost = basePostage - presortSavings;
    const savingsPercent = presortSavings > 0 ? (presortSavings / basePostage) * 100 : 0;

    setResult({
      basePostage,
      presortSavings,
      finalCost,
      savingsPercent,
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 3,
    }).format(amount);
  };

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "USPS Postage Rate Calculator",
    "applicationCategory": "UtilityApplication",
    "description": "Calculate exact USPS postage rates for direct mail pieces",
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
            2026 USPS Postage Rate Calculator
          </h3>
          <p className="text-gray-600">
            Calculate exact postage costs for your mail piece
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-5">
            <div>
              <label htmlFor="weight" className="block text-sm font-semibold text-gray-700 mb-2">
                Weight (oz)
              </label>
              <input
                type="number"
                id="weight"
                min="0.1"
                max="13"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dimensions (inches)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <input
                    type="number"
                    placeholder="Length"
                    min="3.5"
                    max="15"
                    step="0.1"
                    value={length}
                    onChange={(e) => setLength(parseFloat(e.target.value) || 6)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">L</p>
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Width"
                    min="3.5"
                    max="12"
                    step="0.1"
                    value={width}
                    onChange={(e) => setWidth(parseFloat(e.target.value) || 4)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">W</p>
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Height"
                    min="0.007"
                    max="0.75"
                    step="0.01"
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value) || 0.25)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">H</p>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="mailClass" className="block text-sm font-semibold text-gray-700 mb-2">
                Mail Class
              </label>
              <select
                id="mailClass"
                value={mailClass}
                onChange={(e) => setMailClass(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="first-class">First Class Mail</option>
                <option value="marketing">Marketing Mail</option>
                <option value="eddm">EDDM (Every Door Direct Mail)</option>
              </select>
            </div>

            <div>
              <label htmlFor="zone" className="block text-sm font-semibold text-gray-700 mb-2">
                Destination Zone
              </label>
              <select
                id="zone"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="local">Local (Same State)</option>
                <option value="zone1-3">Zone 1-3 (Regional)</option>
                <option value="zone4-6">Zone 4-6 (Cross-Country)</option>
                <option value="zone7-8">Zone 7-8 (Coast to Coast)</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <h4 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
              Postage Breakdown
            </h4>
            
            {result && (
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Base Postage Rate</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(result.basePostage)}</span>
                </div>
                
                {result.presortSavings > 0 && (
                  <div className="flex justify-between items-center py-2 bg-green-50 px-3 rounded">
                    <span className="text-green-700">Presort Discount</span>
                    <span className="font-semibold text-green-700">-{formatCurrency(result.presortSavings)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Final Postage Cost</span>
                    <span className="text-2xl font-bold text-blue-600">{formatCurrency(result.finalCost)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Per piece</p>
                </div>

                {result.savingsPercent > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <p className="text-sm font-semibold text-blue-900">
                      Save {result.savingsPercent.toFixed(1)}% with Our Presort Services
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      We handle USPS presort requirements so you pay the lowest rates
                    </p>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <a
                    href="/services/mailing-services/presort-mail-discount-guide"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors shadow-md hover:shadow-lg"
                  >
                    Learn About Presort Discounts
                  </a>
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
                Postage rates shown include 2026 USPS increases. For mailings over 500 pieces, our presort services can save you 5-15% on postage costs. The larger your mailing, the more you save.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostageCalculator;
