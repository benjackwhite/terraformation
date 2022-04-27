import { NextApiRequest, NextApiResponse } from "next/types";

export class ApiError extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
  }
}

export const $handler = (
  fn: (req: NextApiRequest, res: NextApiResponse) => Promise<any>
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await fn(req, res);
    } catch (e: any) {
      res
        .status(e.statusCode || 500)
        .json({ error: e.message || "Internal Error" });
    }
  };
};

export const param = (val: string[] | string): string => {
  return Array.isArray(val) ? val[0] : val;
};
