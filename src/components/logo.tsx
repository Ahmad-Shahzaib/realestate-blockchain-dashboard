import darkLogo from "@/assets/logos/dark.svg";
import logo from "../assets/logos/fci.jpg";
import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-9 max-w-[8.847rem]">
      <Image
        src={logo}
        fill
        className="dark:hidden rounded-md "
        alt="Dao logo"
        role="presentation"
        quality={100}

      />

      <Image
        src={logo}
        fill
        className="hidden dark:block"
        alt="Dao logo"
        role="presentation"
        quality={100}
      />
    </div>
  );
}
