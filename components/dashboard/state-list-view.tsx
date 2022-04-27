import { SwrWrapper } from "components/core/Swr";
import Fuse from "fuse.js";
import { useApi } from "lib/api";
import { useTerraformStates } from "lib/hooks/useTerraformStates";
import { groupBy, range } from "lodash";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { TextInput } from "../core/Inputs";
import { StatePreview } from "./state-preview";

export const StateListView = () => {
  const [searchValue, setSearchValue] = useState("");
  const api = useApi();

  const statesSwr = useTerraformStates();
  const { data: states, error: loadError } = statesSwr;

  const fuse = useMemo(
    () => new Fuse(states?.items || [], { keys: ["name", "workspace"] }),
    [states]
  );

  const statesGroupedById = useMemo(() => {
    const _res = searchValue
      ? fuse.search(searchValue).map((x) => x.item)
      : states?.items;

    return groupBy(_res || [], "name");
  }, [states?.items, searchValue]);

  return (
    <div>
      <div id="searchbar" className="items-center space-x-4 sm:flex mb-4">
        <div className="sm:w-1/2">
          <TextInput
            className="w-full"
            type="text"
            placeholder="Search terraform states..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <SwrWrapper
        swr={statesSwr}
        renderLoading={() => (
          <div className="space-y-2">
            {range(0, 12).map((x) => (
              <div key={x} className="w-full h-14 placeholder"></div>
            ))}
          </div>
        )}
        renderError={() => <p>Something went wrong</p>}
        render={() => (
          <div className="space-y-2">
            {Object.keys(statesGroupedById).map((stateId) => (
              <StatePreview
                key={stateId}
                name={stateId}
                workspaces={statesGroupedById[stateId].map((x) => x.workspace)}
              />
            ))}
          </div>
        )}
      />
    </div>
  );
};
