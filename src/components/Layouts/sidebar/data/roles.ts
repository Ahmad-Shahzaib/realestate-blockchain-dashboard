"use client";

import * as Icons from "../icons";
import { isAdmin, isUser, isSuperAdmin } from "@/redux/auth/handler";

// Common navigation items for all users
export const COMMON_NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Icons.HomeIcon,
        items: [],
      },
        {
        title: "Projects",
        url: "/project-pages",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "My DAO",
        icon: Icons.HomeIcon,
        items: [
          {
            title: "Portfolio",
            url: "/profile",
          },
          {
            title: "Active Investments",
            url: "/my-assets",
          },
          {
            title: "Income Stream",
            url: "/my-nfts",
          }
        ],
      },
      {
        title: "My Referrals",
        url: "/referals",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Transactions",
        url: "/transactions",
        icon: Icons.User,
        items: [],
      },
    ],
  },
  {
    items: [
      {
        title: "Explore & Learn",
        url: "/explore",
        icon: Icons.FourCircle,
        items: [],
      },
    ],
  },
  {
    items: [
      {
        title: "Rewards Shop",
        url: "/rewards-shop",
        icon: Icons.FourCircle,
        items: [],
      }, 
      {
        title: "Settings",
        url: "/settings",
        icon: Icons.Authentication,
        items: [],
      },
    ],
  },
];

// Admin specific items
export const ADMIN_NAV_DATA = [
  {
    label: "ADMIN MENU",
    items: [
      ...COMMON_NAV_DATA[0].items,
      {
        title: "Projects",
        url: "/project-pages",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "DAO Listing",
        url: "/dao-listing",
        icon: Icons.Alphabet,
        items: [],
      },
      {
        title: "E Report",
        url: "/tables",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Tools",
        icon: Icons.Alphabet,
        items: [
          {
            title: "DAO Bot",
            url: "/tools/dao-bot",
          },
          {
            title: "Calculators",
            url: "/tools/calculators",
          },
        ],
      },
      
    ],
  },
  ...COMMON_NAV_DATA.slice(1),
];

// Get the appropriate navigation data based on user role
export const getNavDataByRole = () => {
  if (isAdmin() || isSuperAdmin()) {
    return ADMIN_NAV_DATA;
  }
  
  return COMMON_NAV_DATA;
};
