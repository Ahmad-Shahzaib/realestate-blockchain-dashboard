"use client";

import { ChevronUpIcon } from "@/assets/icons";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { LogOutIcon, SettingsIcon, UserIcon } from "./icons";
import { handleLogout } from "@/redux/auth/handler";
import { getUserProfile, UserProfile } from "@/services/user.services";

export function UserInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await getUserProfile();
        if (response?.data?.user) {
          setUserProfile(response.data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Default user info if profile not loaded
  const defaultUser = {
    name: "User",
    email: "user@example.com",
    img: "/images/user/user-03.png",
  };

  // Display name based on available profile data
  const displayName =
    userProfile &&
    `${userProfile.firstName || ""} ${userProfile.lastName || ""}`.trim();
  const userEmail = userProfile?.email || defaultUser.email;
  const userImage = defaultUser.img;

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger className="rounded align-middle outline-none ring-primary ring-offset-2 focus-visible:ring-1 dark:ring-offset-gray-dark">
        <span className="sr-only">My Account</span>

        <figure className="flex items-center gap-3">
          {isLoading ? (
            <div className="size-12 rounded-full bg-gray-200 animate-pulse"></div>
          ) : (
            <Image
              src={userImage}
              className="size-12"
              alt={`Avatar of ${displayName}`}
              role="presentation"
              width={200}
              height={200}
            />
          )}
          <figcaption className="flex items-center gap-1 font-medium text-dark dark:text-dark-6 max-[1024px]:sr-only">
            <span>{isLoading ? "Loading..." : displayName}</span>

            <ChevronUpIcon
              aria-hidden
              className={`transition-transform ${isOpen ? "rotate-0" : "rotate-180"
                }`}
              strokeWidth={1.5}
            />
          </figcaption>
        </figure>
      </DropdownTrigger>

      <DropdownContent
        className="flex flex-col min-w-[18rem] h-auto rounded-2xl border border-border bg-background text-dark shadow-2xl dark:bg-gray-dark dark:text-white dark:border-dark-3 transition-all duration-200 py-5 px-0"
        align="end"
      >
        <h2 className="sr-only text-black">User information</h2>
        <figure className="flex w-full flex gap-2 items-center gap-2.5 px-5 py-3.5">
          {isLoading ? (
            <div className="w-12 h-12 rounded-full bg-border animate-pulse" />
          ) : (
            <Image
              src={userImage}
              className="w-12 h-12 rounded-full object-cover border border-border"
              alt={`Avatar for ${displayName}`}
              role="presentation"
              width={48}
              height={48}
            />
          )}
          <figcaption className="space-y-1 text-base font-medium">
            <div className="mb-1 leading-none text-dark dark:text-white text-lg font-semibold">
              {isLoading ? "Loading..." : displayName}
            </div>
            <div className="leading-none text-gray-500 dark:text-gray-400 text-sm">
              {isLoading ? "..." : userEmail}
            </div>
          </figcaption>
        </figure>
        <hr className="border-border dark:border-dark-3" />
        <div className="px-4 py-2 w-full text-base text-gray-700 dark:text-dark-6 space-y-1 [&>*]:cursor-pointer">
          <Link
            href={"/profile"}
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
          >
            <UserIcon />
            <span className="mr-auto text-base font-medium">Active Investments</span>
          </Link>
          <Link
            href={"/pages/settings"}
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
          >
            <SettingsIcon />
            <span className="mr-auto text-base font-medium">Account Settings</span>
          </Link>
          <div className=" w-full  text-base text-gray-700 dark:text-dark-6">
            <button
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
              onClick={() => { handleLogout() }}
            >
              <LogOutIcon />
              <span className="text-base font-medium">Log out</span>
            </button>
          </div>
        </div>

      </DropdownContent>
    </Dropdown>
  );
}