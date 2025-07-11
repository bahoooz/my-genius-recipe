import HomePageContent from "@/components/homeComponents/pageContent/HomePageContent";
import { homePageMetadata } from "@/lib/metadata/homepage";

export const metadata = homePageMetadata

export default function Home() {
  return <HomePageContent />;
}
