import PricingPageContent from "@/components/pricingComponents/pageContent/PricingPageContent";
import { pricingPageMetadata } from "@/lib/metadata/pricingpage";

export const metadata = pricingPageMetadata

export default function Pricing() {
  return <PricingPageContent />;
}
