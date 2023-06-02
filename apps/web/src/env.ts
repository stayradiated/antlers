import * as z from "zod";

const $env = z.object({
  imaginaryHost: z.string(),
  imaginarySignatureKey: z.string(),
});

const result = $env.safeParse({
  imaginaryHost: import.meta.env["IMAGINARY_HOST"],
  imaginarySignatureKey: import.meta.env["IMAGINARY_SIGNATURE_KEY"],
});

if (!result.success) {
  const { fieldErrors } = result.error.flatten();
  const list = Object.entries(fieldErrors)
    .map(([key, value]) => {
      return `- ${key}: ${value}`;
    })
    .join("\n");
  throw new Error(`Invalid environment variables:\n${list}`);
}

const env = result.data;

export { env };
