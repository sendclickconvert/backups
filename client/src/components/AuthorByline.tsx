import { User } from "lucide-react";

interface AuthorBylineProps {
  className?: string;
}

export default function AuthorByline({ className = "" }: AuthorBylineProps) {
  return (
    <div className={`flex items-center gap-3 text-sm text-muted-foreground ${className}`} data-testid="text-author-byline">
      <User className="w-4 h-4 shrink-0" />
      <span>Reviewed by <strong>The Property Father</strong>, Cash Home Buyers &middot; Long Island, NY</span>
    </div>
  );
}
