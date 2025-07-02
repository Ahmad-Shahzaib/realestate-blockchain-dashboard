"use client";

import * as Icons from "../icons";
import { isAdmin, isUser, isSuperAdmin, isCustomer } from "@/redux/auth/handler";

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
        title:'My Investments',
        url: "/my-investments",
        icon: Icons.PieChart,
        items: [],
      },
      {
        title:"Profit-History",
        url: "/profit-history",
        icon: Icons.PieChart,
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
        url: "/admin/Add-project",
        icon: Icons.Authentication,
        items: [],
      },
       {
        title: "Customers",
        icon: Icons.User,
        items: [
          {
            title: "Manage Customers",
            url: "/admin/manage-customers",
          },
          {
            title: "Customers List ",
            url: "/admin/customers-list",
          },

        ],
      },
      {
        title: "Manage Admin",
        url: "/admin/manage-admin",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "User Detail",
        icon: Icons.User,
        items: [
          {
            title: "Manage Users",
            url: "/admin/manage-users",
          },
          {
            title: "Users List ",
            url: "/admin/users-list",
          },

        ],
      },
    ],
  },
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

export const ADMIN_NAV_DATA_WITH_CUSTOMERS = [
  {
    label: "Customer MENU",
    items: [
      {
        title: "Dashboard",
        url: "/customer/customer-dashboard",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "Properties",
        url: "/customer/project-pages",
        icon: Icons.PieChart,
        items: [],
      },
      {
        title: "Investments",
        url: "/customer/investments",
        icon: Icons.PieChart,
        items: [],
      },
      {
        title: "Users",
        url: "/customer/users",
        icon: Icons.User,
        items: [],
      },
      // {
      //   title: "Projects",
      //   url: "/project-pages",
      //   icon: Icons.HomeIcon,
      //   items: [],
      // },
      // {
      //   title: "User Detail",
      //   icon: Icons.User,
      //   items: [
      //     {
      //       title: "Manage Users",
      //       url: "/manage-users",
      //     },
      //     {
      //       title: "Users List ",
      //       url: "/users-lisr",
      //     },

      //   ],
      // },
    ],
  },
]

// Get the appropriate navigation data based on user role
export const getNavDataByRole = () => {
  if (isSuperAdmin()) {
    return SUPER_ADMIN_NAV_DATA;
  } else if (isAdmin()) {
    return ADMIN_NAV_DATA;
  } else if (isUser()) {
    return USER_NAV_DATA;
  }
  else if (isCustomer()) {
    return ADMIN_NAV_DATA_WITH_CUSTOMERS;
  }

  return USER_NAV_DATA;
};
