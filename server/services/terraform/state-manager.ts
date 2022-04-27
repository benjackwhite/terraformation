// TODO: Abstract loader to deal with different backends

import { TerraformState, TerraformStateContent } from "types/TerraformState";
import { TerraformStateProviderAwsS3 } from "./state-providers/aws-s3";
import { IStateProvider } from "./state-providers/state-provider.interface";

const REDACTED_STRING = "<< REDACTED >>";

const ADDITIONAL_SENSITIVE_ATTRIBUTES: { [key: string]: any[] } = {
  all: [
    [
      {
        type: "get_attr",
        value: "secret_string",
      },
    ],
    [
      {
        type: "get_attr",
        value: "secret",
      },
    ],
    [
      {
        type: "get_attr",
        value: "ses_smtp_password_v4",
      },
    ],
  ],

  random_password: [
    [
      {
        type: "get_attr",
        value: "result",
      },
    ],
  ],
};

const getStateProvider = (): IStateProvider => {
  return new TerraformStateProviderAwsS3();
};

export const listTerraformStates = async () => {
  const provider = getStateProvider();

  return provider.listStates();
};

export const getTerraformState = async (options: {
  name: string;
  workspace: string;
}): Promise<TerraformState | null> => {
  const provider = getStateProvider();
  const tfState = await provider.getState(options);
  if (!tfState) return null;
  const state = parseTerraformState(tfState);

  return {
    ...options,
    state,
  };
};

const stripSensitiveAttributes = (attributes: any, sensitive_config: any[]) => {
  let obj = attributes;
  for (let [i, config] of sensitive_config.entries()) {
    let value = null;
    if (config.type == "get_attr") {
      value = config.value;
    } else if (config.type == "index") {
      value = config.value.value;
    }

    if (!obj[value]) {
      return;
    }
    if (i === sensitive_config.length - 1) {
      obj[value] = REDACTED_STRING;
    } else {
      obj = obj[value];
    }
  }
};

const stripSensitiveOutputs = (outputs: any) => {
  const res: {
    [key: string]: any;
  } = {};

  Object.keys(outputs).forEach((x: string) => {
    res[x] = {
      ...outputs[x],
      value: outputs[x].sensitive ? REDACTED_STRING : outputs[x].value,
    };
  });

  return res;
};

const parseTerraformState = (state: any): TerraformStateContent => {
  return {
    version: state.version,
    last_modified: state.last_modified,
    terraform_version: state.terraform_version,
    serial: state.serial,
    lineage: state.lineage,
    outputs: stripSensitiveOutputs(state.outputs),
    resources: state.resources?.map((x: any) => {
      const id = [x.module, x.mode === "data" ? "data" : null, x.type, x.name]
        .filter(Boolean)
        .join(".");

      return {
        id: id,
        module: x.module,
        mode: x.mode,
        type: x.type,
        name: x.name,
        provider: x.provider,
        dependencies: x.dependencies,
        index_key: x.index_key,
        instances: x.instances?.map((y: any) => {
          const sensAttributes = [
            ...ADDITIONAL_SENSITIVE_ATTRIBUTES["all"],
            ...y.sensitive_attributes,
            ...(ADDITIONAL_SENSITIVE_ATTRIBUTES[x.type] || []),
          ];

          sensAttributes.forEach((sens: any) => {
            stripSensitiveAttributes(y.attributes, sens);
          });

          return {
            schema_version: y.schema_version,
            attributes: y.attributes,
            sensitive_attributes: y.sensitive_attributes,
          };
        }),
      };
    }),
  };
};
