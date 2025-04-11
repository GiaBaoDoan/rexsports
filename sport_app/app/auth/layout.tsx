import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Button variant="link" className="mt-5 ml-5">
        <Link href={"/"}>Trang chủ</Link>
      </Button>
      <div className="flex flex-col justify-center items-center">
        {children}
      </div>
    </main>
  );
}
