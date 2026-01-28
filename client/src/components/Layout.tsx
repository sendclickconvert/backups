import Header from "./Header";
import Footer from "./Footer";
import { LocalBusinessSchema } from "./SchemaMarkup";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <LocalBusinessSchema />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
