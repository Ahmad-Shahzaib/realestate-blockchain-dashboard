import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        // dashboard
        title: "Dashboard",
        url: "/",
        icon: Icons.HomeIcon,
        items: [],
      },

      {
        title: "My DAO",
        icon: Icons.HomeIcon,
        items: [
          {
            title: "Portfolio",
            url: "/",
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
      },      {
        title: "Projects",
        url: "/project",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Transactions",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },      {
        title: "DAO Listing",
        url: "/dao-listing",
        icon: Icons.Alphabet,
        items: [],
      },      {
        title: "E Report",
        url: "/tables",
        icon: Icons.Table,
        items: [],
      },      {
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
  {
    // label: "Tools",
    items: [      {
        title: "Rewards Shop",
        url: "/rewards-shop",
        icon: Icons.FourCircle,
        items: [],
      },      {
        title: "Settings",
        url: "/settings",
        icon: Icons.Authentication,
        items: [],
      },
    ],
  },
];
