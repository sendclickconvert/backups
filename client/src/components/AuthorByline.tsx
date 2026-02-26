import { User } from "lucide-react";

interface AuthorBylineProps {
  className?: string;
}

export default function AuthorByline({ className = "" }: AuthorBylineProps) {
  return (
    <div className={`flex items-center gap-3 text-sm text-muted-foreground ${className}`} data-testid="text-author-byline">
      <User className="w-4 h-4 shrink-0" />
      <span>Written by <strong>Steven Santiago</strong>, CEO &middot; The Property Father &middot; Licensed Real Estate Investor, Long Island NY</span>
    </div>
  );
}
