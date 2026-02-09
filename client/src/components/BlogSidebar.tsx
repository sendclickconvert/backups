import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "No Repairs Needed",
  "No Fees or Commissions",
  "Close in as Little as 7 Days",
  "Cash Offer in 24 Hours",
];

const badges = ["No Obligations", "Local Buyers", "Fair Cash Offers"];

export default function BlogSidebar() {
  return (
    <div className="bg-[#1a2b4a] rounded-2xl p-6 shadow-xl border border-[#C8A951]/30">
      <div className="flex justify-center mb-6">
        <div className="bg-white rounded-lg p-3">
          <img
            src="/images/logo-stacked.webp"
            alt="The Property Father"
            className="w-[140px] h-auto"
            width={384}
            height={216}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <h3 className="text-xl font-bold text-white text-center mb-5">
        Need to Sell Your House Fast?
      </h3>

      <ul className="space-y-3 mb-6">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-center gap-3 text-white">
            <CheckCircle className="h-5 w-5 text-[#C8A951] flex-shrink-0" />
            <span className="text-sm">{benefit}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {badges.map((badge, index) => (
          <span
            key={index}
            className="bg-[#C8A951]/20 border border-[#C8A951]/40 text-[#C8A951] text-xs font-semibold px-3 py-1.5 rounded-full"
          >
            {badge}
          </span>
        ))}
      </div>

      <a
        href="https://thepropertyfather.com/#get-cash-offer"
        className="block"
      >
        <Button
          size="lg"
          className="w-full bg-[#C8A951] hover:bg-[#C8A951]/90 text-[#1a2b4a] font-bold text-base py-6"
        >
          GET YOUR CASH OFFER
        </Button>
      </a>

      <p className="text-center text-white/70 text-sm mt-3">
        thepropertyfather.com
      </p>
    </div>
  );
}
