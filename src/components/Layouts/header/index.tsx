"use client";

import { SearchIcon } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon } from "./icons";
import { Notification } from "./notification";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";

export function Header() {
  const { toggleSidebar, isMobile } = useSidebarContext();

  return (
    <header className="h-18 sticky top-0 z-9999 flex items-center justify-between border-b border-stroke/20 bg-white/80 backdrop-blur-md px-4 py-5 shadow-sm dark:border-stroke-dark/20 dark:bg-gray-dark/80 md:px-5 2xl:px-10 transition-all duration-300">
      <button
        onClick={toggleSidebar}
        className="group relative overflow-hidden rounded-xl border border-stroke/40 bg-gradient-to-br from-white to-gray-50 px-2.5 py-2.5 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 dark:border-stroke-dark/40 dark:from-[#020D1A] dark:to-[#0A1628] hover:dark:from-[#0A1628] hover:dark:to-[#1A2B3D] lg:hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <MenuIcon className="relative z-10 transition-transform duration-300 group-hover:rotate-180" />
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

      <div className="max-xl:hidden">
        <div className="relative">
          <h1 className="mb-0.5 text-heading-5 font-bold bg-gradient-to-r from-dark to-dark/80 bg-clip-text text-transparent dark:from-white dark:to-white/80 transition-all duration-300">
            Dashboard
          </h1>
          <div className="absolute -bottom-1 left-0 h-0.5 w-8 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 min-[375px]:gap-4">
        <div className="relative w-full max-w-[300px] group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          <input
            type="search"
            placeholder="Search anything..."
            className="relative z-10 flex w-full items-center gap-3.5 rounded-full border border-stroke/30 bg-gradient-to-r from-gray-2/50 to-white/50 py-3.5 pl-[53px] pr-6 text-sm outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-gray-500 focus-visible:border-primary/60 focus-visible:shadow-lg focus-visible:shadow-primary/10 focus-visible:scale-[1.02] dark:border-dark-3/30 dark:from-dark-2/50 dark:to-dark-3/50 dark:placeholder:text-dark-6 dark:focus-visible:border-primary/60 dark:focus-visible:shadow-primary/20"
          />

          <SearchIcon className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 max-[1015px]:size-5 text-gray-400 transition-colors duration-300 group-hover:text-primary dark:text-dark-6 dark:group-hover:text-primary" />
          
          {/* Search field glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2 min-[375px]:gap-3">
          <div className="p-1 rounded-xl bg-gradient-to-br from-white to-gray-50/50 shadow-sm dark:from-dark-2 dark:to-dark-3/50 transition-all duration-300 hover:shadow-md">
            <ThemeToggleSwitch />
          </div>

          <div className="p-1 rounded-xl bg-gradient-to-br from-white to-gray-50/50 shadow-sm dark:from-dark-2 dark:to-dark-3/50 transition-all duration-300 hover:shadow-md">
            <Notification />
          </div>

          <div className="shrink-0 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 blur-md" />
            <div className="relative z-10 p-1 rounded-xl bg-gradient-to-br from-white to-gray-50/50 shadow-sm dark:from-dark-2 dark:to-dark-3/50 transition-all duration-300 hover:shadow-md hover:scale-105">
              <UserInfo />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}