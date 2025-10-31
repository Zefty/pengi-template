import { env } from "~/env";
import { type Result } from "../entities/common";

export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
  forceError?: boolean
): Promise<Result<T, E>> {
  try {
    if (forceError) {
      throw new Error("Debug error state");
    }
    const value = await promise;
    return { value, error: null };
  } catch (error) {
    return { value: null, error: error as E };
  }
}

export function getBaseUrl() {
  // Handle client-side rendering base URL first
  if (typeof window !== "undefined") return window.location.origin;
  // Then handle server-side rendering base URL
  if (env.BETTER_AUTH_URL) return env.BETTER_AUTH_URL;
  if (env.DEPLOYMENT_ENV === "production") {
    if (env.VERCEL_PROJECT_PRODUCTION_URL)
      return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (env.DEPLOYMENT_ENV === "test") {
    if (env.VERCEL_BRANCH_URL) return `https://${env.VERCEL_BRANCH_URL}`;
  }
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return `http://localhost:${env.PORT}`;
}
