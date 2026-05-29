import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { FaqFloat } from "@/components/domain/faq/FaqFloat";
import { PopupModal } from "@/components/domain/popup/PopupModal";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
      <FaqFloat />
      <PopupModal />
    </div>
  );
}