"use client";

import * as Icons from "../icons";
import { isAdmin, isUser, isSuperAdmin, isCustomer } from "@/redux/auth/handler";
import { LuLayoutDashboard } from "@/components/Layouts/sidebar/icons";
import { FaFileInvoiceDollar, FaDashcube, FaFirefoxBrowser } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { SiPolymerproject } from "react-icons/si";
import { GrTransaction } from "react-icons/gr";
import { MdOutlineTravelExplore } from "react-icons/md";

// User navigation data
export const USER_NAV_DATA = [
  {
    label: "USER MENU",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: LuLayoutDashboard,
        items: [],
      },
      {
        title: "My Investments",
        url: "/user/investments",
        icon: FaFileInvoiceDollar,
        items: [],
      },
      {
        title: "Projects",
        url: "/projects",
        icon: SiPolymerproject,
        items: [],
      },
      {
        title: "My DAO",
        icon: FaDashcube,
        items: [
          { title: "Portfolio", url: "/portfolio" },
        ],
      },
      {
        title: "My Referrals",
        url: "/referals",
        icon: FaFirefoxBrowser,
        items: [],
      },
      {
        title: "Transactions",
        url: "/transactions",
        icon: GrTransaction,
        items: [],
      },
    ],
  },
  {
    items: [
      {
        title: "Explore & Learn",
        url: "/explore",
        icon: MdOutlineTravelExplore,
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
  {
    items: [
      {
        title: "Support",
        url: "/support",
        icon: BiSupport,
        items: [],
      },
    ],
  },
];

// Super Admin navigation data
export const SUPER_ADMIN_NAV_DATA = [
  {
    label: "SUPER ADMIN MENU",
    items: [
      { title: "Dashboard", url: "/", icon: Icons.HomeIcon, items: [] },
      { title: "Projects", url: "/projects", icon: Icons.PieChart, items: [] },
      { title: "Add Projects", url: "/admin/add-project", icon: Icons.Authentication, items: [] },
      {
        title: "Customers",
        icon: Icons.User,
        items: [
          { title: "Manage Customers", url: "/admin/manage-customers" },
          { title: "Customers List", url: "/admin/customers-list" },
        ],
      },
      { title: "Manage Admin", url: "/admin/manage-admin", icon: Icons.Table, items: [] },
      {
        title: "User Detail",
        icon: Icons.User,
        items: [
          { title: "Manage Users", url: "/admin/manage-users" },
          { title: "Users List", url: "/admin/users-list" },
        ],
      },
    ],
  },
];

// Common navigation items
export const COMMON_NAV_DATA = USER_NAV_DATA;

// Admin specific items
export const ADMIN_NAV_DATA = [
  {
    label: "ADMIN MENU",
    items: [


      // ✅ Extra items added for Admin (from screenshot)
      {
        title: "Dashboard",
        url: "/",
        icon: LuLayoutDashboard,
        items: [],
      },

      // {
      //   title: "Manage Properties",
      //   url: "/admin/Add-project",
      //   icon: SiPolymerproject,
      //   items: [],
      // },
      // add sub item
      {
        title: "Properties",
        Icon: SiPolymerproject,
        items: [
          {
            title: "Add Property",
            url: "/admin/Add-project",
            icon: SiPolymerproject,
            items: [],
          },
          {
            title: "Manage Properties",
            url: "/admin/manage-properties",
            icon: SiPolymerproject,
            items: [],
          }
        ]

      },
      {
        title: "Customers",
        Icon: Icons.User,
        items: [
          {
            title: "Add Customers",
            url: "/admin/manage-customers",
            icon: Icons.User,
            items: [],
          },
          {
            title: "All Customers",
            url: "/admin/customers-list",
            icon: SiPolymerproject,
            items: [],
          }
        ]

      },
      {
        title: "Manage Users",
        url: "/admin/manage-users",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Transaction",
        url: "/admin/transactions",
        icon: GrTransaction,
        items: [],
      },
      // {
      //   title: "Role Management",
      //   url: "/admin/role-management",
      //   icon: Icons.Table,
      //   items: [],
      // },
      {
        title: "Refrerals",
        url: "/admin/referals",
        icon: FaFirefoxBrowser,
        items: [],
      },


      {
        title: "Support Center",
        url: "/admin/support",
        icon: BiSupport,
        items: [],
      },
    ],
  },

];

// Customer navigation data
export const CUSTOMER_NAV_DATA = [
  {
    label: "CUSTOMER MENU",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: LuLayoutDashboard,
        items: [],
      },
      // {
      //   title: "My Investments",
      //   url: "/customer/investments",
      //   icon: FaFileInvoiceDollar,
      //   items: [],
      // },
      {
        title: "Projects",
        url: "/customer/projects",
        icon: SiPolymerproject,
        items: [],
      },
      {
        title: "Transactions",
        url: "/customer/transactions",
        icon: GrTransaction,
        items: [],
      },
      {
        title: "Referrals",
        url: "/customer/referrals",
        icon: FaFirefoxBrowser,
        items: [],
      },

      {
        title: "Settings",
        url: "/customer/settings",
        icon: Icons.Authentication,
        items: [],
      },

    ],
  },
];

// Get the appropriate navigation data based on user role
export const getNavDataByRole = () => {
  if (isSuperAdmin()) {
    return SUPER_ADMIN_NAV_DATA;
  } else if (isAdmin()) {
    return ADMIN_NAV_DATA;
  } else if (isCustomer()) {
    return CUSTOMER_NAV_DATA;
  } else if (isUser()) {
    return USER_NAV_DATA;
  }
  return USER_NAV_DATA;
};