import AppNavbar from "@/components/Navbar/AppNavbar";
import { AppSidebar } from "@/components/Sidebar";

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100 dark:bg-quadraGray">
      <div className="flex h-screen">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AppNavbar />
          <main className="flex-1 overflow-auto p-4">{children}</main>
        </div>
      </div>
    </div>
  );
}
