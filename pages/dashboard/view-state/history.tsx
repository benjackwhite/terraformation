import { DashboardAppLayout } from "components/dashboard/layout";
import { useTerraformStates } from "lib/hooks/useTerraformStates";
import { singleParam } from "lib/utils/query-params";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const AppHistoryPage: NextPage = () => {
  const router = useRouter();
  const stateId = singleParam(router.query.id) || "";

  const {
    data: states,
    error: loadError,
    workspace,
    currentState,
  } = useTerraformStates();

  return (
    <DashboardAppLayout>
      <h2 className="opacity-50 text-center p-32 bg-gray-200 rounded-lg">
        Coming soon...
      </h2>
    </DashboardAppLayout>
  );
};

export default AppHistoryPage;
