import React, { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import NextLink from "../core/NextLink";
import { useRouter } from "next/router";
import { Button, PlaceholderButton } from "../core/Buttons";
import { Logo } from "../brand/logo";
import { useTerraformStates } from "lib/hooks/useTerraformStates";
import Link from "next/link";
import { sortedUniqBy } from "lodash";
import { TextInput } from "components/core/Inputs";

interface DropdownItemProps {
  title: string;
  description?: string;
  href?: any;
}

const DropdownItem = ({ title, description, href }: DropdownItemProps) => {
  return (
    <Popover.Button as={Link} href={href || "#"}>
      <a className="block p-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100">
        <span className="text-sm font-medium text-gray-900">{title}</span>
        <br />
        <span className="text-sm text-gray-500">{description}</span>
      </a>
    </Popover.Button>
  );
};

const PlaceholderDropdownItem = () => {
  return (
    <div className="block p-4 rounded-lg placeholder">
      <p className="opacity-0">Loading...</p>
    </div>
  );
};

const WorkspaceDropdown = () => {
  const router = useRouter();
  const { data: tfStates, workspace } = useTerraformStates();
  const [search, setSearch] = useState("");

  const uniqueWorkspaces = sortedUniqBy(
    tfStates?.items || [],
    (x) => x.workspace
  )
    .map((x) => x.workspace)
    .filter((x) => (search ? x.includes(search) : true));

  return (
    <>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button as={tfStates?.items ? Button : PlaceholderButton}>
              {tfStates
                ? workspace
                  ? workspace
                  : "(No workspace selected)"
                : ""}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-4 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100 "
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-4 scale-95"
            >
              <Popover.Panel className="absolute left-0 w-screen max-w-xs px-4 mt-3 sm:px-0 z-50">
                <div className="z-50 p-2 space-y-1 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-y-auto max-h-64">
                  <TextInput
                    className="w-full text-sm sticky top-0"
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  {tfStates?.items ? (
                    uniqueWorkspaces.map((x) => (
                      <DropdownItem
                        key={x}
                        title={x}
                        href={{
                          pathname: router.pathname,
                          query: { ...router.query, workspace: x },
                        }}
                      />
                    ))
                  ) : (
                    <>
                      <PlaceholderDropdownItem />
                    </>
                  )}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};

const StatesDropDown = () => {
  const router = useRouter();
  const { data: tfStates, workspace, selected } = useTerraformStates();
  const [search, setSearch] = useState("");

  const uniqueStates = sortedUniqBy(
    tfStates?.items || [],
    (x) => x.name
  ).filter((x) => (search ? x.name.includes(search) : true));

  return (
    <>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button as={tfStates?.items ? Button : PlaceholderButton}>
              {tfStates?.items
                ? selected
                  ? selected
                  : "(No state selected)"
                : ""}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-4 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100 "
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-4 scale-95"
            >
              <Popover.Panel className="absolute left-0 z-50 w-screen max-w-xs px-4 mt-3 sm:px-0">
                <div className="z-50 p-2 space-y-1 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-y-auto max-h-64">
                  <TextInput
                    className="w-full text-sm sticky top-0"
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  {tfStates?.items ? (
                    uniqueStates.map((x) => (
                      <DropdownItem
                        key={x.name}
                        title={x.name}
                        href={{
                          pathname: router.pathname,
                          query: { ...router.query, name: x.name },
                        }}
                      />
                    ))
                  ) : (
                    <>
                      <PlaceholderDropdownItem />
                    </>
                  )}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};

export function DashboardNavBar() {
  return (
    <nav>
      <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div id="project-nav" className="flex items-center space-x-2">
          <NextLink href={"/dashboard"}>
            <a className="flex items-center">
              <Logo />
            </a>
          </NextLink>
          <StatesDropDown />
          <span className="">/</span>
          <WorkspaceDropdown />
        </div>
      </div>
    </nav>
  );
}
