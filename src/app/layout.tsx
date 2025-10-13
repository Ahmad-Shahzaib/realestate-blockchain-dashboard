import "@/css/satoshi.css";
import "@/css/style.css";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";
import { AuthWrapper } from "@/components/Layouts/auth-wrapper";
import { metadata } from "./metadata";
import ClientLayout from "./ClientLayout";
import GlobalLoader from "./loader/GlobalLoader";

export { metadata };

export default function RootLayout({ children }: PropsWithChildren) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
       <GlobalLoader />
        <ClientLayout children={children} />

      </body>
    </html>
  );
}
