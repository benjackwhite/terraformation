import { DashboardAppLayout } from "components/dashboard/layout";
import type { NextPage } from "next";
import { useCurrentTerraformState } from "lib/hooks/useTerraformStates";
import { StateResource } from "components/dashboard/resources/state-resource";
import { Checkbox, TextInput } from "components/core/Inputs";
import { useMemo, useState } from "react";
import { range } from "lodash";
import Fuse from "fuse.js";
import { SwrWrapper } from "components/core/Swr";
import { StateOverview } from "components/dashboard/overview";

const META_RESOURCES = ["null_resource"];

const AppResourcesPage: NextPage = () => {
  const terrafromStateSwr = useCurrentTerraformState();
  const { data: currentState, error: loadError } = terrafromStateSwr;

  const [showData, setShowData] = useState(true);
  const [showMeta, setShowMeta] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const allResources = currentState?.state?.resources;

  const fuse = useMemo(() => {
    return new Fuse(allResources || [], { keys: ["name", "type"] });
  }, [allResources]);

  const resources = useMemo(() => {
    const _res = searchValue
      ? fuse.search(searchValue).map((x) => x.item)
      : allResources;

    return _res?.filter((x) => {
      if (x.mode === "data" && !showData) return false;

      if (!showMeta && META_RESOURCES.includes(x.type)) return false;

      return true;
    });
  }, [allResources, showData, showMeta, searchValue]);

  return (
    <DashboardAppLayout
      renderSidebar={() => (
        <>
          <TextInput
            className="w-full mb-4 text-xs"
            type="text"
            placeholder="Search resources..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <ul className="space-y-2">
            <li className="flex">
              <Checkbox
                id="show_data"
                checked={showData}
                onChange={() => setShowData(!showData)}
              />
              <label htmlFor="show_data">Show data sources</label>
            </li>
            <li className="flex">
              <Checkbox
                id="show_meta"
                checked={showMeta}
                onChange={() => setShowMeta(!showMeta)}
              />
              <label htmlFor="show_meta">Show meta resources</label>
            </li>
          </ul>
        </>
      )}
    >
      <SwrWrapper
        swr={terrafromStateSwr}
        renderLoading={() => (
          <div className="space-y-2">
            {range(0, 12).map((x) => (
              <div key={x} className="w-full h-14 placeholder"></div>
            ))}
          </div>
        )}
        renderError={() => <p>Something went wrong</p>}
        render={() =>
          resources?.length ? (
            <>
              {resources.map((x) => (
                <StateResource key={x.id} resource={x} />
              ))}
            </>
          ) : (
            <div className="bg-gray-100 p-4 border rounded-lg text-center">
              <h3>No results.</h3>
              <p></p>
            </div>
          )
        }
      />
    </DashboardAppLayout>
  );
};

export default AppResourcesPage;
