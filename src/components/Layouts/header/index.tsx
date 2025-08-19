"use client";

import Image from "next/image";
import Link from "next/link";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { UserInfo } from "./user-info";
import { handleLogout } from "@/redux/auth/handler";
import { LogOutIcon } from "lucide-react";

export function Header() {
  const { toggleSidebar, isMobile } = useSidebarContext();

  return (
    <header className="h-18 sticky top-0 z-50 flex items-center justify-between bg-sidebarbg px-6 py-4 md:px-8 2xl:px-12 transition-all duration-300">
      {/* Logo for Mobile */}
      {isMobile && (
        <Link href="/" className="ml-3 group">
          <div className="p-1 rounded-xl bg-background transition-all duration-200 group-hover:scale-110">
            <Image
              src="/images/logo/logo-icon.svg"
              width={32}
              height={32}
              alt="Logo"
              role="presentation"
              className="transition-transform duration-200 group-hover:rotate-12"
            />
          </div>
        </Link>
      )}

      <div className="hidden xl:block">
        <h1 className="text-text text-lg font-bold">Dashboard</h1>
      </div>
      <div className="flex flex-1 items-center justify-end w-auto gap-4">
        <div className="shrink-0">
          <div className="p-1 rounded-[10px] transition-all duration-200">
                <div className=" w-full cursor-pointer text-base text-gray-700 dark:text-dark-6">
                        <button
                          className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
                          onClick={() => { handleLogout() }}
                        >
                          <LogOutIcon />
                        </button>
                      </div>
            <UserInfo />
          </div>
        </div>
      </div>
    </header>
  );
}