export const singleParam = (val: string | string[] | undefined) => {
  return Array.isArray(val) ? val[0] : val;
};

export const qs = (params: { [key: string]: any }) => {
  return Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
};
