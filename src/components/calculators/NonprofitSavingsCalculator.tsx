import React, { useState, useEffect } from 'react';

interface SavingsResult {
  currentAnnualCost: number;
  nonprofitAnnualCost: number;
  annualSavings: number;
  permitCost: number;
  breakEvenMailings: number;
  firstYearSavings: number;
  fiveYearSavings: number;
  savingsPercent: number;
}

const NonprofitSavingsCalculator: React.FC = () => {
  const [annualVolume, setAnnualVolume] = useState<number>(10000);
  const [currentPostageClass, setCurrentPostageClass] = useState<string>('first-class');
  const [mailPieceType, setMailPieceType] = useState<string>('letter');
  const [result, setResult] = useState<SavingsResult | null>(null);

  const NONPROFIT_PERMIT_FEE = 300;
  const NONPROFIT_APPLICATION_FEE = 0;

  const postageRates: { [key: string]: { standard: number; nonprofit: number } } = {
    'first-class': { standard: 0.73, nonprofit: 0.338 },
    'marketing': { standard: 0.40, nonprofit: 0.338 },
  };

  useEffect(() => {
    calculateSavings();
  }, [annualVolume, currentPostageClass, mailPieceType]);

  const calculateSavings = () => {
    const rates = postageRates[currentPostageClass];
    const currentAnnualCost = annualVolume * rates.standard;
    const nonprofitAnnualCost = annualVolume * rates.nonprofit;
    const annualSavings = currentAnnualCost - nonprofitAnnualCost;
    const permitCost = NONPROFIT_PERMIT_FEE;
    
    const breakEvenMailings = permitCost / (rates.standard - rates.nonprofit);
    const firstYearSavings = annualSavings - permitCost;
    const fiveYearSavings = (annualSavings * 5) - (permitCost * 5);
    const savingsPercent = (annualSavings / currentAnnualCost) * 100;

    setResult({
      currentAnnualCost,
      nonprofitAnnualCost,
      annualSavings,
      permitCost,
      breakEvenMailings,
      firstYearSavings,
      fiveYearSavings,
      savingsPercent,
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
      maximumFractionDigits: 0,
    }).format(num);
  };

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Nonprofit Postage Savings Calculator",
    "applicationCategory": "FinanceApplication",
    "description": "Calculate annual savings with USPS nonprofit postage rates",
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
            Nonprofit Postage Savings Calculator
          </h3>
          <p className="text-gray-600">
            See how much your organization can save with nonprofit postage rates
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-5">
            <div>
              <label htmlFor="annualVolume" className="block text-sm font-semibold text-gray-700 mb-2">
                Annual Mail Volume
              </label>
              <input
                type="number"
                id="annualVolume"
                min="500"
                max="1000000"
                step="500"
                value={annualVolume}
                onChange={(e) => setAnnualVolume(Math.max(500, parseInt(e.target.value) || 10000))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formatNumber(annualVolume)} pieces per year
              </p>
            </div>

            <div>
              <label htmlFor="currentPostageClass" className="block text-sm font-semibold text-gray-700 mb-2">
                Current Postage Class
              </label>
              <select
                id="currentPostageClass"
                value={currentPostageClass}
                onChange={(e) => setCurrentPostageClass(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="first-class">First Class ($0.73/piece)</option>
                <option value="marketing">Marketing Mail ($0.40/piece)</option>
              </select>
            </div>

            <div>
              <label htmlFor="mailPieceType" className="block text-sm font-semibold text-gray-700 mb-2">
                Mail Piece Type
              </label>
              <select
                id="mailPieceType"
                value={mailPieceType}
                onChange={(e) => setMailPieceType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="letter">Letter</option>
                <option value="postcard">Postcard</option>
                <option value="flat">Flat/Newsletter</option>
                <option value="catalog">Catalog</option>
              </select>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-semibold text-blue-900 text-sm mb-2">
                Nonprofit Rate: $0.338/piece
              </h5>
              <p className="text-xs text-blue-800">
                Available to organizations with valid 501(c)(3) status. Requires USPS authorization and annual permit.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <h4 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
              Your Savings Breakdown
            </h4>
            
            {result && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Current Annual Cost</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(result.currentAnnualCost)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Nonprofit Rate Cost</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(result.nonprofitAnnualCost)}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 bg-green-50 px-3 rounded">
                    <span className="text-green-700 font-semibold">Annual Savings</span>
                    <span className="font-bold text-green-700">{formatCurrency(result.annualSavings)}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Annual Permit Fee</span>
                    <span className="text-gray-900">{formatCurrency(result.permitCost)}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Break-even Point</span>
                    <span className="text-gray-900">{formatNumber(result.breakEvenMailings)} pieces</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-blue-900">First Year Savings</span>
                      <span className="text-lg font-bold text-blue-600">{formatCurrency(result.firstYearSavings)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-blue-900">5-Year Savings</span>
                      <span className="text-lg font-bold text-blue-600">{formatCurrency(result.fiveYearSavings)}</span>
                    </div>
                    <div className="text-center pt-2 border-t border-blue-200">
                      <p className="text-xs text-blue-700">
                        Save {result.savingsPercent.toFixed(1)}% on every mailing
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <a
                    href="/services/non-profit-mailing"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors shadow-md hover:shadow-lg"
                  >
                    Apply for Nonprofit Rates
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
                We handle the entire USPS nonprofit authorization process for you, including Form 3624 submission and permit setup. Most organizations are approved within 2-3 weeks and start saving immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NonprofitSavingsCalculator;
