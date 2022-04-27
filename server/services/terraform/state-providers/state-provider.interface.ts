import { TerraformState, TerraformStateListItem } from "types/TerraformState";

export type StateProviderGetStateOptions = {
  name: string;
  workspace: string;
};

export type IStateProvider = {
  listStates: () => Promise<TerraformStateListItem[]>;
  getState: (options: StateProviderGetStateOptions) => Promise<object | null>;
};
