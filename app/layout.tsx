import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demoer | Klippegrund Digital",
  description: "Demosider lavet af Klippegrund Digital. Firmaerne er fiktive.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
