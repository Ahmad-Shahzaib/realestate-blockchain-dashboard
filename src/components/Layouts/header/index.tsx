"use client";

import { SearchIcon } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon } from "./icons";
import { Notification } from "./notification";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";

export function   Header() {
  const { toggleSidebar, isMobile } = useSidebarContext();

  return (
    <header className="h-18 sticky top-0 z-9999 flex items-center justify-between border-b border-border/20 backdrop-blur-md px-4 py-5 shadow-sm bg-background/60 md:px-5 2xl:px-10 transition-all duration-300">
      <button
        onClick={toggleSidebar}
        className="group relative overflow-hidden rounded-xl border border-border/40 bg-background px-2.5 py-2.5 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 hover:bg-background/80"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <MenuIcon className="relative z-10 transition-transform duration-300 group-hover:rotate-180 text-white" />
        <span className="sr-only">Toggle Sidebar</span>
      </button>

      {isMobile && (
        <Link
          href={"/"}
          className="ml-2 max-[430px]:hidden min-[375px]:ml-4 group"
        >
          <div className="p-1 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 transition-all duration-300 group-hover:from-primary/20 group-hover:to-primary/10 group-hover:scale-110">
            <Image
              src={"/images/logo/logo-icon.svg"}
              width={32}
              height={32}
              alt=""
              role="presentation"
              className="transition-transform duration-300 group-hover:rotate-12"
            />
          </div>
        </Link>
      )}

      <div className="max-xl:hidden ml-4">
        <div className="relative">
          <h1 className="mb-0.5 text-heading-5 font-bold text-white transition-all duration-300">
            Dashboard
          </h1>
          <div className="absolute -bottom-1 left-0 h-0.5 w-8 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 min-[375px]:gap-4">
        <div className="shrink-0 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 blur-md" />
          <div className="relative z-10 p-1 rounded-xl bg-gradient-to-br from-white to-gray-50/50 shadow-sm dark:from-dark-2 dark:to-dark-3/50 transition-all duration-300 hover:shadow-md hover:scale-105">
            <UserInfo />
          </div>
        </div>
      </div>
    </header>
  );
}