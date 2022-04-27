import { useTerraformStates } from "lib/hooks/useTerraformStates";
import { ReactNode } from "react";
import { DashboardNavBar } from "./dashboard-nav";
import { DashboardSubNav } from "./dashboard-subnav";
import { StateOverview } from "./overview";

export type DashboardLayoutProps = {
  children: any;
  renderRight?: () => ReactNode;
  renderSidebar?: () => ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className={"bg-gray-50 min-h-screen"}>
      <DashboardNavBar />

      <div className="p-2 mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
    </div>
  );
};

export const DashboardAppLayout = ({
  children,
  renderRight,
  renderSidebar,
}: DashboardLayoutProps) => {
  const { currentState, workspace } = useTerraformStates();

  const params = `name=${currentState?.name}&workspace=${workspace}`;

  return (
    <div className={"bg-gray-50 min-h-screen"}>
      <DashboardNavBar />
      <DashboardSubNav
        backHref={"/dashboard"}
        renderRight={renderRight}
        items={[
          {
            title: "Resources",
            href: `/dashboard/view-state/resources?${params}`,
          },
          {
            title: "Outputs",
            href: `/dashboard/view-state/outputs?${params}`,
          },
          {
            title: "History",
            href: `/dashboard/view-state/history?${params}`,
          },
          {
            title: "JSON",
            href: `/dashboard/view-state/json?${params}`,
          },
        ]}
      />

      <div className="p-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-20 md:flex max-w-full">
          <div className="md:w-80 relative shrink-0">
            <div className="md:mr-6 md:sticky md:top-16 text-sm">
              <StateOverview />

              {renderSidebar && renderSidebar()}
            </div>
          </div>
          <main className="grow space-y-2 overflow-hidden">{children}</main>
        </div>
      </div>
    </div>
  );
};
