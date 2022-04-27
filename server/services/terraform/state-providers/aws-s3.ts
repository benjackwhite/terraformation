import {
  IStateProvider,
  StateProviderGetStateOptions,
} from "./state-provider.interface";
import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { TerraformState } from "types/TerraformState";

const WORKSPACE_REGEX = /^env:\/(.+)\/(.+)$/;

export class TerraformStateProviderAwsS3 implements IStateProvider {
  private client: S3Client;

  constructor() {
    // NOTE: This is a special override to allow for Vercel not allowing default AWS vars
    const credentials =
      process.env.TF_BUCKET_AWS_ACCESS_KEY_ID &&
      process.env.TF_BUCKET_AWS_SECRET_ACCESS_KEY
        ? {
            accessKeyId: process.env.TF_BUCKET_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.TF_BUCKET_AWS_SECRET_ACCESS_KEY,
          }
        : undefined;

    this.client = new S3Client({
      region: process.env.TF_BUCKET_AWS_REGION,
      credentials: credentials || defaultProvider({}),
    });
  }

  async listStates() {
    const res = await this.client
      .send(
        new ListObjectsV2Command({
          Bucket: process.env.TF_BUCKET_NAME,
        })
      )
      .catch((e: any) => {
        console.error(e);
        throw e;
      });

    const items = res.Contents || [];

    return items
      .map((x) => {
        const matches = x.Key?.match(WORKSPACE_REGEX);

        if (!matches)
          return {
            name: x.Key,
            workspace: "default",
          };

        return {
          name: matches[2],
          workspace: matches[1],
        };
      })
      .filter(Boolean) as TerraformState[];
  }

  async getState({
    name,
    workspace,
  }: StateProviderGetStateOptions): Promise<object | null> {
    try {
      const key = workspace === "default" ? name : `env:/${workspace}/${name}`;

      const res = await this.client.send(
        new GetObjectCommand({
          Bucket: process.env.TF_BUCKET_NAME,
          Key: key,
        })
      );

      const obj = await convertBodyToString(res.Body);

      return {
        last_modified: res.LastModified,
        ...obj,
      };
    } catch (e: any) {
      if (e.Code === "NoSuchKey") {
        return null;
      }
      console.error(e);
      return null;
    }
  }
}

const convertBodyToString = async (body: any): Promise<object> => {
  return new Promise(async (resolve, reject) => {
    try {
      let responseDataChunks: string[] = [];
      body.once("error", (err: any) => reject(err));
      body.on("data", (chunk: string) => responseDataChunks.push(chunk));
      body.once("end", () => resolve(JSON.parse(responseDataChunks.join(""))));
    } catch (err) {
      return reject(err);
    }
  });
};
