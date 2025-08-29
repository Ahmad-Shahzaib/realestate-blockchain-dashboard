import { IoLogoUsd } from "react-icons/io5";
import { MdAccountBalanceWallet, MdCalendarMonth, MdOutlineDataSaverOff } from "react-icons/md";

const statsData = [
    {
        id: 1,
        icon: <IoLogoUsd />,
        title: "Total Portfolio Value",
        value: "$1.75M",
        percentage: "+8.3%",
        percentageText: "vs last period",
    },
    {
        id: 2,
        icon: <MdAccountBalanceWallet />,
        title: "FCI Balance",
        value: "$0",
        badge: "Coming Soon",
        progress: 0,
    },
    {
        id: 3,
        icon: <MdCalendarMonth />,
        title: "Monthly Income",
        value: "$25,600",
        percentage: "+12.5%",
        percentageText: "vs last period",
    },
    {
        id: 4,
        icon: <MdOutlineDataSaverOff />,
        title: "Average Yield",
        value: "8.2%",
        percentage: "+1.2%",
        percentageText: "vs last period",
    },
];

export default statsData;
