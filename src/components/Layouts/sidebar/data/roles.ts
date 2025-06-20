"use client";

import { title } from "process";
import * as Icons from "../icons";
import { isAdmin, isUser, isSuperAdmin } from "@/redux/auth/handler";
import { url } from "inspector";
import { icons } from "lucide-react";

// User specific navigation items (limited to 6 items)
export const USER_NAV_DATA = [
  {
    label: "USER MENU",
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
        title: "Settings",
        url: "/settings",
        icon: Icons.Authentication,
        items: [],
      },
    ],
  },
];

// Super Admin specific navigation items (all items)
export const SUPER_ADMIN_NAV_DATA = [
  {
    label: "SUPER ADMIN MENU",
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
        icon: Icons.PieChart,
        items: [],
      },
      {
        title: "Add Projects ",
        url: "/Add-project",
        icon: Icons.Authentication,
        items: [],
      },
      {
        title: "Manage Admin",
        url: "/manage-admin",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "User Detail",
        icon: Icons.User,
        items: [
          {
            title: "Manage Users",
            url: "/manage-users",
          },
          {
            title: "Users List ",
            url: "/users-list",
          },

        ],
      },







      // {
      //   title: "My DAO",
      //   icon: Icons.HomeIcon,
      //   items: [
      //     {
      //       title: "Portfolio",
      //       url: "/profile",
      //     },
      //     {
      //       title: "Active Investments",
      //       url: "/my-assets",
      //     },
      //     {
      //       title: "Income Stream",
      //       url: "/my-nfts",
      //     }
      //   ],
      // },
      // {
      //   title: "My Referrals",
      //   url: "/referals",
      //   icon: Icons.User,
      //   items: [],
      // },
      // {
      //   title: "Transactions",
      //   url: "/transactions",
      //   icon: Icons.User,
      //   items: [],
      // },
      // {
      //   title: "DAO Listing",
      //   url: "/dao-listing",
      //   icon: Icons.Alphabet,
      //   items: [],
      // },
      // {
      //   title: "E Report",
      //   url: "/tables",
      //   icon: Icons.Table,
      //   items: [],
      // },
      // {
      //   title: "Tools",
      //   icon: Icons.Alphabet,
      //   items: [
      //     {
      //       title: "DAO Bot",
      //       url: "/tools/dao-bot",
      //     },
      //     {
      //       title: "Calculators",
      //       url: "/tools/calculators",
      //     },
      //   ],
      // },
      // {
      //   title: "User Management",
      //   url: "/super-admin/user-management",
      //   icon: Icons.User,
      //   items: [],
      // },
      // {
      //   title: "System Settings",
      //   url: "/super-admin/system-settings",
      //   icon: Icons.Authentication,
      //   items: [],
      // },
    ],
  },
  // {
  //   items: [
  //     {
  //       title: "Explore & Learn",
  //       url: "/explore",
  //       icon: Icons.FourCircle,
  //       items: [],
  //     },
  //   ],
  // },
  // {
  //   items: [
  //     {
  //       title: "Rewards Shop",
  //       url: "/rewards-shop",
  //       icon: Icons.FourCircle,
  //       items: [],
  //     }, 
  //     {
  //       title: "Settings",
  //       url: "/settings",
  //       icon: Icons.Authentication,
  //       items: [],
  //     },
  //   ],
  // },
];

// Common navigation items (kept for backward compatibility)
export const COMMON_NAV_DATA = USER_NAV_DATA;

// Admin specific items
export const ADMIN_NAV_DATA = [
  {
    label: "ADMIN MENU",
    items: [
      ...USER_NAV_DATA[0].items,
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
        title: "User Detail",
        icon: Icons.User,
        items: [
          {
            title: "Manage Users",
            url: "/manage-users",
          },
          {
            title: "Users List ",
            url: "/users-lisr",
          },

        ],
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
  ...USER_NAV_DATA.slice(1),
];

// Get the appropriate navigation data based on user role
export const getNavDataByRole = () => {
  if (isSuperAdmin()) {
    return SUPER_ADMIN_NAV_DATA;
  } else if (isAdmin()) {
    return ADMIN_NAV_DATA;
  } else if (isUser()) {
    return USER_NAV_DATA;
  }

  return USER_NAV_DATA;
};
