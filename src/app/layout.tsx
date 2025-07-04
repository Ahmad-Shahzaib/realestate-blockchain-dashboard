import "@/css/satoshi.css";
import "@/css/style.css";
import type { PropsWithChildren } from "react";
import { metadata } from "./metadata";
import ClientLayout from "./ClientLayout";

export { metadata };

export default function RootLayout({ children }: PropsWithChildren) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-br from-[theme('colors.background.gradientFrom')] via-[theme('colors.background.gradientVia')] to-[theme('colors.background.gradientTo')] text-white border-gray-500">
        <ClientLayout children={children} />
      </body>
    </html>
  );
}
