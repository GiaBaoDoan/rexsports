import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AppProvider from "@/components/providers/AppProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Rex Sports",
  description: "Shop Bán đồ thể thao hàng đầu miền bắc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AppProvider>
          <main className="min-h-screen flex flex-col justify-between">
            {children}
          </main>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
