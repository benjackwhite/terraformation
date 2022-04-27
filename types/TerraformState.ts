export type TerraformStateContentResource = {
  id: string;
  module?: string;
  mode: "data" | "managed";
  type: string;
  name: string;
  provider: string;
  instances: {
    index_key?: string;
    private?: string;
    schema_version: number;
    attributes: {
      [key: string]: any;
    };
    sensitive_attributes: any[];
    dependencies?: string[];
  }[];
};

export type TerraformStateContent = {
  version: number;
  terraform_version: string;
  serial: string;
  lineage: string;
  last_modified: string;
  outputs: {
    [key: string]: {
      value: any;
      type: string;
      sensitive: boolean;
    };
  };
  resources: TerraformStateContentResource[];
};

export type TerraformStateListItem = {
  name: string;
  workspace: string;
};

export type TerraformState = TerraformStateListItem & {
  state: TerraformStateContent;
};
