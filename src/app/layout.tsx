import type { Metadata } from "next";
import "./globals.css";
import { WagmiProviders } from "@/providers/WagmiProvider";
import EducationalNavigation from "@/components/EducationalNavigation";

export const metadata: Metadata = {
  title: "TerraBlock - Nordic Real Estate Innovation",
  description: "Transforming Nordic commercial real estate through tokenization. Unlock liquidity in days, not years.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-background text-foreground">
        <WagmiProviders>
          <EducationalNavigation />
          <main className="min-h-screen">
            {children}
          </main>
        </WagmiProviders>
      </body>
    </html>
  );
}
