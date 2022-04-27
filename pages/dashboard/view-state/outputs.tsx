import { Button } from "components/core/Buttons";
import { CopyToClipboardButton } from "components/core/CopyToClipboardButton";
import { SwrWrapper } from "components/core/Swr";
import { DashboardAppLayout } from "components/dashboard/layout";
import { SensitiveValuesNotice } from "components/dashboard/sensitive-values-notice";
import {
  useCurrentTerraformState,
  useTerraformStates,
} from "lib/hooks/useTerraformStates";
import { singleParam } from "lib/utils/query-params";
import { range } from "lodash";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { RiFileCopyLine } from "react-icons/ri";

const AppOutputsPage: NextPage = () => {
  const router = useRouter();
  const stateId = singleParam(router.query.id) || "";

  const tfStateSwr = useCurrentTerraformState();
  const { data: state } = tfStateSwr;

  const outputs = useMemo(() => {
    return state?.state?.outputs
      ? Object.keys(state.state.outputs).map((x) => ({
          name: x,
          value: state.state.outputs[x],
        }))
      : undefined;
  }, [state?.state?.outputs]);

  return (
    <DashboardAppLayout renderSidebar={() => <SensitiveValuesNotice />}>
      <SwrWrapper
        swr={tfStateSwr}
        renderLoading={() => (
          <div className="space-y-2">
            {range(0, 12).map((x) => (
              <div key={x} className="w-full h-14 placeholder"></div>
            ))}
          </div>
        )}
        renderError={() => <p>Something went wrong</p>}
        render={() =>
          outputs?.length ? (
            <ul>
              {outputs.map((x) => (
                <li
                  key={x.name}
                  className="border bg-white mb-2 p-4 flex rounded-lg text-sm items-center space-x-2"
                >
                  <span className="flex-1">{x.name}</span>
                  <span className="font-bold">{x.value.value}</span>
                  <CopyToClipboardButton text={x.value.value} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="bg-gray-100 p-4 border rounded-lg text-center">
              <h3>No outputs.</h3>
            </div>
          )
        }
      />
    </DashboardAppLayout>
  );
};

export default AppOutputsPage;
