import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F8FC]">
      <Header /> 
      <main className="flex-1">
        {children}
      </main>
      <Footer /> 
    </div>
  );
}