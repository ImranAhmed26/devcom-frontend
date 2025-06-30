import Footer from '@/components/Footer';
import PrimaryNavbar from '@/components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col min-h-screen'>
      <PrimaryNavbar />
      <div className='mx-auto'>{children}</div>
      <Footer />
    </div>
  );
}
