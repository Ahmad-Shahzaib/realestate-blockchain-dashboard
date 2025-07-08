import "@/css/satoshi.css";
import "@/css/style.css";
import type { PropsWithChildren } from "react";
import { metadata } from "./metadata";
import ClientLayout from "./ClientLayout";

export { metadata };

export default function RootLayout({ children }: PropsWithChildren) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#1a1a2e] text-white border-gray-500">
        <ClientLayout children={children} />
      </body>
    </html>
  );
}
