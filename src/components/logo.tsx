import Image from "next/image";
import logo from "../assets/logos/fractprop.png";

export function Logo() {
  return (
    <div className="relative h-9 pt-2 max-w-[8.847rem]">
      <Image src={logo} alt="logo" className="object-contain" />
    </div>
  );
}
