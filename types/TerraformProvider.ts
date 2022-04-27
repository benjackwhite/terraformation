export type TerraformProvider = {
  type: string;
  id: string;
  attributes: {
    alias: string;
    description: string;
    downloads: number;
    featured: boolean;
    "full-name": string;
    "logo-url": string;
    name: string;
    namespace: string;
    "owner-name": string;
    "robots-noindex": boolean;
    source: string;
    tier: string;
    unlisted: boolean;
    warning: string;
  };
  links: {
    self: string;
  };
};
