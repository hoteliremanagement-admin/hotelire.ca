import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Profile from "@/components/Profile";

export default function CustomerProfilePage() {
  return (
    <div className="bg-[#fafafa] w-full flex flex-col min-h-screen">
      <Header />
      <Navigation />

      <Profile />

      <Footer />
    </div>
  );
}
