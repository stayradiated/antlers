import crypto from "node:crypto";
import { env } from "./env.js";

const sign = (
  path: string,
  source: string,
  inputParameters: Record<string, string>
) => {
  const isUrl = source.startsWith("http://") || source.startsWith("https://");
  const parameters = isUrl
    ? { url: source, ...inputParameters }
    : { file: source, ...inputParameters };

  const queryString = new URLSearchParams(
    [...Object.entries(parameters)].sort((a, b) => {
      return a[0].localeCompare(b[0]);
    })
  ).toString();

  const signature = crypto
    .createHmac("sha256", env.imaginarySignatureKey)
    .update(path)
    .update(queryString)
    .digest()
    .toString("base64url");

  const url = `${env.imaginaryHost}${path}?${queryString}&sign=${signature}`;
  return url;
};

export { sign };
