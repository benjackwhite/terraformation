import { Button } from "components/core/Buttons";
import { SwrWrapper } from "components/core/Swr";
import { useCurrentTerraformState } from "lib/hooks/useTerraformStates";

export const StateOverview = () => {
  const terrafromStateSwr = useCurrentTerraformState();
  const { data: currentState, error: loadError } = terrafromStateSwr;

  const shortName = currentState?.name?.replace(".tfstate", "");

  return (
    <div className="mb-4  border-b">
      <SwrWrapper
        swr={terrafromStateSwr}
        renderLoading={() => <div className="w-full h-14 placeholder"></div>}
        renderError={() => <p>Something went wrong</p>}
        render={() => (
          <div className="space-y-2 pb-2">
            <p className="font-bold" title={currentState?.name}>
              {shortName}
            </p>
            <p className="flex items-center space-x-2">
              <span>Workspace:</span>
              <Button>{currentState?.workspace}</Button>
            </p>
          </div>
        )}
      />
    </div>
  );
};
