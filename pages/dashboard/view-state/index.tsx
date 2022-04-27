import { DashboardAppLayout } from "components/dashboard/layout";
import { useCurrentTerraformState } from "lib/hooks/useTerraformStates";
import { singleParam } from "lib/utils/query-params";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AppPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace({
      pathname: "/dashboard/view-state/resources",
      query: router.query,
    });
  });

  return (
    <DashboardAppLayout>
      <h2 className="opacity-50 text-center p-32 bg-gray-200 rounded-lg">
        ...
      </h2>
    </DashboardAppLayout>
  );
};

export default AppPage;
