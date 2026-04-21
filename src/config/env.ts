const normalizeEnvValue = (value?: string) => value?.trim().replace(/\/+$/, "") ?? "";

const getFirstEnvValue = (...values: Array<string | undefined>) => {
  for (const value of values) {
    const normalized = normalizeEnvValue(value);
    if (normalized) {
      return normalized;
    }
  }

  return "";
};

const apiBaseUrl = getFirstEnvValue(
  import.meta.env.VITE_API_URL,
  import.meta.env.VITE_API_BASE,
);

const apiFallbackUrl = getFirstEnvValue(import.meta.env.VITE_API_URL_FALLBACK);
console.log("apiBaseUrl",apiBaseUrl)
export const appConfig = {
  env: import.meta.env.VITE_ENV || import.meta.env.MODE,
  api: {
    baseUrl: apiBaseUrl || "/api",
    fallbackUrl: apiFallbackUrl && apiFallbackUrl !== apiBaseUrl ? apiFallbackUrl : "/api",
  },
} as const;
