import Image from "next/image";

import icon from "public/assets/img/icon.png";

export interface LogoProps {
  size?: number;
}

const ICON_SIZE = 30;

export const Logo = ({ size = ICON_SIZE }: LogoProps) => (
  <div className="flex items-center">
    <span style={{ width: size, height: size }} className="mr-2">
      <Image
        src={icon}
        height={size}
        width={size}
        alt="logo"
        className="block"
      />
    </span>
    <span className="hidden md:block font-bold">TerraFormation</span>
  </div>
);
