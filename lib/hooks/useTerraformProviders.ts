import { TerraformProvider } from "types/TerraformProvider";
import { useSwr } from "lib/api";

export function useTerraformProviders() {
  return useSwr<TerraformProvider[]>("/terraform/providers");
}

export function useTerraformProvider(id: string) {
  return useSwr<TerraformProvider>(id ? `/terraform/providers/${id}` : "");
}
