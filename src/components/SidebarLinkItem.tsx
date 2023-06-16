import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  path: string;
  activeCondition: boolean;
  icon: ReactNode;
  label: string;
}

const activeLink = "bg-paper-400 text-white";
const inactiveLink = "bg-transparent text-gray";

export default function SidebarLinkItem({
  path,
  activeCondition,
  icon,
  label,
}: Props) {
  return (
    <Link href={path}>
      <li
        className={`flex items-center gap-4 p-2 rounded cursor-pointer  hover:text-white ${
          activeCondition ? activeLink : inactiveLink
        }`}
      >
        {icon}

        <span className="font-semibold">{label}</span>
      </li>
    </Link>
  );
}
