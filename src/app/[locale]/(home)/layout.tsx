import Footer from "@/components/Footer";
import PrimaryNavbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5] dark:bg-[#1a2744] dark:text-indigo-200 overflow-x-clip">
      <PrimaryNavbar />
      <div className="flex flex-col justify-center items-center ">
        <div className="mx-auto max-w-[1300px] px-4">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
