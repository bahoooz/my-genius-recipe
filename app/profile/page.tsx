import ProfilePageContent from "@/components/profileComponents/pageContent/ProfilePageContent";
import { profilePageMetadata } from "@/lib/metadata/profilepage";

export const metadata = profilePageMetadata;

export default function ProfilePage() {
  return <ProfilePageContent />;
}
