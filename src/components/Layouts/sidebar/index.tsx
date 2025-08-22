"use client";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getNavDataByRole } from "./data/roles";
import { ArrowLeftIcon, ChevronUp } from "./icons";
import { MenuItem } from "./menu-item";
import { useSidebarContext } from "./sidebar-context";

export function Sidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const NAV_DATA = getNavDataByRole();

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? [] : [title]));
  };

  useEffect(() => {
    // Keep collapsible open, when it's subpage is active
    NAV_DATA.some((section) => {
      return section.items.some((item) => {
        return item.items?.some((subItem) => {
          if (subItem.url === pathname) {
            if (!expandedItems.includes(item.title)) {
              toggleExpanded(item.title);
            }

            // Break the loop
            return true;
          }
        });
      });
    });
  }, [pathname, NAV_DATA]);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "max-w-[250px] overflow-hidden border-r border-gray-200 bg-white transition-[width] duration-200 ease-linear dark:border-gray-800 dark:bg-dark",
          isMobile ? "fixed bottom-0 top-0 z-50" : "sticky top-0 h-screen",
          isOpen ? "w-full" : "w-0",
        )}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="flex h-full flex-col pl-[25px] pr-[7px]">
          <div className="relative pr-4.5 text-white py-4 px-2 rounded-lg dark:text-gray-200">
            <Link
              href={"/"}
              onClick={() => isMobile && toggleSidebar()}
              className="px-0 min-[850px]:py-0"
            >
              <Logo />
            </Link>

            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="absolute left-3/4 right-4.5 top-1/2 -translate-y-1/2 text-right"
              >
                <span className="sr-only">Close Menu</span>
                <ArrowLeftIcon className="ml-auto size-7 text-white dark:text-gray-200" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="custom-scrollbar mt-2 flex-1 overflow-y-auto pr-3 min-[850px]:mt-10">
            {NAV_DATA.map((section) => (
              <div key={section.label} className="mb-2">
                <h2 className="mb-3 text-sm font-bold text-[#003049] dark:text-gray-3">
                  {section.label}
                </h2>

                <nav role="navigation" aria-label={section.label}>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={`${section.label || "section"}-${item.title}`}>
                        {item.items && item.items.length ? (
                          <div>
                            <MenuItem
                              isActive={item.items.some(
                                ({ url }) => url === pathname,
                              )}
                              onClick={() => toggleExpanded(item.title)}
                              className={cn(
                                "flex items-center gap-1 py-1 px-3 rounded-xl transition-all",
                                item.items.some(({ url }) => url === pathname)
                                  ? "bg-gradient-to-r from-[#00B894]/10 to-[#00D2B6]/10 border-l-2 border-[#00B894] text-[#003049] font-semibold dark:text-gray-2"
                                  : "text-gray-700 hover:text-[#00B894] dark:text-gray-3 dark:hover:text-green-light"
                              )}
                            >
                              {item.icon && (
                                <div className="size-8 flex items-center justify-center rounded-md ">
                                  <item.icon
                                    className="size-5"
                                    aria-hidden="true"
                                  />
                                </div>
                              )}

                              <span>{item.title}</span>

                              <ChevronUp
                                className={cn(
                                  "ml-auto rotate-180 transition-transform duration-200",
                                  expandedItems.includes(item.title) &&
                                  "rotate-0 text-[#00B894]",
                                )}
                                aria-hidden="true"
                              />
                            </MenuItem>

                            {expandedItems.includes(item.title) && (
                              <ul
                                className="ml-9 mr-0 space-y-1.5 pb-[15px] pr-0 pt-2"
                                role="menu"
                              >
                                {item.items.map((subItem) => (
                                  <li
                                    key={`${item.title}-${subItem.title}`}
                                    role="none"
                                  >
                                    <MenuItem
                                      as="link"
                                      href={subItem.url}
                                      isActive={pathname === subItem.url}
                                      className={cn(
                                        "flex items-center py-2 px-3 rounded-lg text-sm transition-all",
                                        pathname === subItem.url
                                          ? "bg-gradient-to-r from-[#00B894]/10 to-[#00D2B6]/10 border-l-2 border-[#00B894] text-[#003049] font-semibold dark:text-gray-2"
                                          : "text-gray-600 hover:text-[#00B894] dark:text-gray-4 dark:hover:text-green-light"
                                      )}
                                    >
                                      <span>{subItem.title}</span>
                                    </MenuItem>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ) : (
                          (() => {
                            const href =
                              "url" in item
                                ? item.url + ""
                                : "/" +
                                item.title.toLowerCase().split(" ").join("-");

                            return (
                              <MenuItem
                                className={cn(
                                  "flex items-center gap-1 py-1 px-3 rounded-xl transition-all",
                                  pathname === href
                                    ? "bg-gradient-to-r from-[#00B894]/10 to-[#00D2B6]/10 border-l-2 border-[#00B894] text-[#003049] font-semibold dark:text-gray-2"
                                    : "text-gray-700 hover:text-[#00B894] dark:text-gray-3 dark:hover:text-green-light"
                                )}
                                as="link"
                                href={href}
                                isActive={pathname === href}
                              >
                                {item.icon && (
                                  <div className="size-8 flex items-center justify-center rounded-md ">
                                    <item.icon
                                      className="size-5"
                                      aria-hidden="true"
                                    />
                                  </div>
                                )}

                                <span>{item.title}</span>
                              </MenuItem>
                            );
                          })()
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
