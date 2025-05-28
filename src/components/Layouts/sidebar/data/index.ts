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
      },

      {
        title: "Projects",
        url: "/calendar",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Transactions",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "DAO Listing",
        icon: Icons.Alphabet,
        items: [

        ],
      },
      {
        title: "E Reposrt",
        url: "/tables",
        icon: Icons.Table,
        items: [

        ],
      },
      {
        title: "Tools",
        icon: Icons.Alphabet,
        items: [
          {
            title: "DAO Bot",
            url: "/pages/settings",
          },
          {
            title: "Calculators",
            url: "/pages/settings",
          },

        ],
      },

    ],
  },
  {
    // label: "Tools",
    items: [

      {
        title: "Rewards Shop",
        icon: Icons.FourCircle,
        items: [

        ],
      },
      {
        title: "Settings",
        icon: Icons.Authentication,
        items: [

        ],
      },
    ],
  },
];
