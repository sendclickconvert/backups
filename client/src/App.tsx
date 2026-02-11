import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import HowItWorks from "@/pages/HowItWorks";
import SuffolkCounty from "@/pages/locations/SuffolkCounty";
import NassauCounty from "@/pages/locations/NassauCounty";
import NassauTownPage from "@/pages/locations/NassauTownPage";
import Divorce from "@/pages/situations/Divorce";
import PreForeclosure from "@/pages/situations/PreForeclosure";
import Probate from "@/pages/situations/Probate";
import InheritedProperty from "@/pages/situations/InheritedProperty";
import SellAsIs from "@/pages/situations/SellAsIs";
import Lenders from "@/pages/partners/Lenders";
import Realtors from "@/pages/partners/Realtors";
import Contractors from "@/pages/partners/Contractors";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/locations/suffolk-county" component={SuffolkCounty} />
      <Route path="/locations/nassau-county" component={NassauCounty} />
      <Route path="/locations/nassau-county/:town" component={NassauTownPage} />
      <Route path="/situations/divorce" component={Divorce} />
      <Route path="/situations/pre-foreclosure" component={PreForeclosure} />
      <Route path="/situations/probate" component={Probate} />
      <Route path="/situations/inherited-property" component={InheritedProperty} />
      <Route path="/situations/sell-as-is" component={SellAsIs} />
      <Route path="/partners/lenders" component={Lenders} />
      <Route path="/partners/realtors" component={Realtors} />
      <Route path="/partners/contractors" component={Contractors} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/faq" component={FAQ} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
