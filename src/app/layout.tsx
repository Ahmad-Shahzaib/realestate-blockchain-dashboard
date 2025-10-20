import "@/css/satoshi.css";
import "@/css/style.css";
import type { PropsWithChildren } from "react";
import { metadata } from "./metadata";
import ClientLayout from "./ClientLayout";
export { metadata };

export default function RootLayout({ children }: PropsWithChildren) {
  

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientLayout children={children} />
      </body>
    </html>
  );
}
