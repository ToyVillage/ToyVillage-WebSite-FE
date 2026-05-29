import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col bg-[#F7F8FC] items-center min-h-screen">
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}