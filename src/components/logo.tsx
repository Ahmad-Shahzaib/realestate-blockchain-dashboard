'use client'; // Required for client-side hooks in Next.js App Router

import Image from "next/image";
import logo from "../assets/logos/fractprop.png";
import whitelogo from "../assets/logos/fractpropblack.png";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Logo() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Log theme for debugging
  useEffect(() => {
    console.log("Current theme:", theme, "Resolved theme:", resolvedTheme);
    setMounted(true);
  }, [theme, resolvedTheme]);

  if (!mounted) {
    console.log("Rendering fallback logo (server-side)");
    return (
      <div className="relative h-9 pt-2 max-w-[8.847rem]">
        <Image src={logo} alt="logo" className="object-contain" />
      </div>
    );
  }

  const currentTheme = resolvedTheme || theme || "light";
  const logoSrc = currentTheme === "dark" ? whitelogo : logo;

  console.log("Rendering logo with src:", logoSrc);

  return (
    <div className="relative h-9 pt-2 max-w-[8.847rem]">
      <Image src={logoSrc} alt="logo" className="object-contain" />
    </div>
  );
}