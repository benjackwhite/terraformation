import { ArrowSmLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import cs from "classnames";

export interface DashboardSubNavItemProps {
  title: string;
  href: string;
  exactHref?: boolean;
}

export const DashboardSubNavItem = ({
  title,
  href,
  exactHref = false,
}: DashboardSubNavItemProps) => {
  const router = useRouter();
  const active = exactHref
    ? href === router.asPath
    : router.asPath.startsWith(href);

  return (
    <Link href={href}>
      <a
        className={cs(`transition py-2 px-3 text-sm rounded-md font-medium`, {
          "bg-gray-200 hover:bg-gray-200": active,
          "hover:bg-gray-100": !active,
        })}
      >
        {title}
      </a>
    </Link>
  );
};

export interface DashboardSubNavProps {
  backHref?: string;
  items: { title: string; href: string; exactHref?: boolean }[];
  renderRight?: () => ReactNode;
}

export const DashboardSubNav = ({
  items,
  backHref,
  renderRight = () => null,
}: DashboardSubNavProps) => {
  return (
    <main className="p-2 mx-auto max-w-7xl sm:px-6 lg:px-8 sticky top-0 bg-gray-50 z-10 flex justify-between overflow-x-auto">
      <div className="flex items-center">
        {backHref ? (
          <Link href={backHref} passHref>
            <a className="p-2 -ml-2">
              <ArrowSmLeftIcon className="w-6 h-6" />
            </a>
            {/* <Button LeftIcon={}></Button> */}
          </Link>
        ) : null}
        <div className="flex space-x-2 items-center">
          {items.map((item) => (
            <DashboardSubNavItem
              key={item.href}
              title={item.title}
              href={item.href}
              exactHref={item.exactHref}
            />
          ))}
        </div>
      </div>

      {renderRight()}
    </main>
  );
};
