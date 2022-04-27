import { TerraformState } from "types/TerraformState";
import { useSwr } from "lib/api";
import { singleParam } from "lib/utils/query-params";
import { useRouter } from "next/router";

export function useTerraformStates() {
  const router = useRouter();
  const name = singleParam(router.query.name) || "";
  const workspace = singleParam(router.query.workspace) || "";

  const states = useSwr<{ items: TerraformState[] }>("/terraform/states");

  const current = states.data?.items?.find(
    (x) => x.name === name && x.workspace == workspace
  );

  return {
    ...states,
    workspace,
    selected: name,
    currentState: current,
  };
}

export function useCurrentTerraformState() {
  const router = useRouter();
  const name = singleParam(router.query.name) || "";
  const workspace = singleParam(router.query.workspace) || "";

  const state = useSwr<TerraformState>(
    `/terraform/states/${name}?workspace=${workspace}`
  );
  return {
    ...state,
  };
}
