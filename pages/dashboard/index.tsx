import { StateListView } from "components/dashboard/state-list-view";
import { DashboardLayout } from "components/dashboard/layout";
import type { NextPage } from "next";
import { DemoNotice } from "components/demo/DemoNotice";

const DashboardPage: NextPage = () => {
  return (
    <DashboardLayout>
      <DemoNotice />
      <StateListView />
    </DashboardLayout>
  );
};

export default DashboardPage;
