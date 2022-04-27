import axios from "axios";
import { useMemo, useState } from "react";
import useSWR, { SWRConfiguration, SWRResponse } from "swr";

export const useApi = () => {
  return useMemo(
    () =>
      axios.create({
        baseURL: "/api/v1/",
        // timeout: 1000,
        // headers: { Authorization: `bearer ${session?.token || ""}` },
      }),
    []
  );
};

export const useSwr: <T>(
  url: string,
  options?: SWRConfiguration
) => SWRResponse<T, any> = (url, options) => {
  const api = useApi();

  options = options || {
    revalidateIfStale: false,
  };

  return useSWR(
    url,
    (key) => {
      return api.get(key).then((x) => x.data);
    },
    options
  );
};

export const useWorkUnit = () => {
  const [working, setWorking] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<any>(null);

  return {
    do: async <T>(fn: () => Promise<T>): Promise<T | undefined> => {
      setWorking(true);
      setError(null);
      try {
        const res = await fn();
        setData(res);
        return res;
      } catch (e) {
        return undefined;
      } finally {
        setWorking(false);
      }
    },
    working,
    error,
    data,
  };
};
