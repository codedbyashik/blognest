import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-black transition-colors duration-500">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 w-full pt-16">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
