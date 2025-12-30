"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login";
  const isAdminPage = pathname?.startsWith("/admin");

  if (isAuthPage || isAdminPage) {
    return <>{children}</>;
  }

  return (
    <div className="relative flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
