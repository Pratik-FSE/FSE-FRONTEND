import { appConfig } from "@/config/env";

export const API_URL = appConfig.api.baseUrl;
const FALLBACK_API_URL = appConfig.api.fallbackUrl;

function buildURLWithBase(base: string, path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (!base) return normalizedPath;

  const baseHasApiSuffix = /\/api$/i.test(base);
  const pathHasApiPrefix = /^\/api(\/|$)/i.test(normalizedPath);

  if (baseHasApiSuffix && pathHasApiPrefix) {
    return `${base}${normalizedPath.replace(/^\/api/i, '')}`;
  }

  return `${base}${normalizedPath}`;
}

function buildURL(path: string) {
  return buildURLWithBase(API_URL, path);
}

export async function fetchJSON(path: string, opts: RequestInit = {}) {
  const tryFetch = async (base: string) => {
    const url = buildURLWithBase(base, path);
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      ...opts,
    });
    const text = await res.text();
    return { res, text, url };
  };

  let res: Response;
  let text: string;
  let url: string;

  try {
    ({ res, text, url } = await tryFetch(API_URL));
  } catch (e) {
    // Retry only when a secondary API base URL is explicitly configured.
    if (FALLBACK_API_URL && FALLBACK_API_URL !== API_URL) {
      ({ res, text, url } = await tryFetch(FALLBACK_API_URL));
    } else {
      throw e;
    }
  }

  let json: unknown = {};

  try {
    json = JSON.parse(text || '{}');
  } catch {
    // include body snippet for debugging
    const snippet = text ? text.slice(0, 800) : '';
    throw new Error(`Invalid JSON response (${res.status}) from ${url}: ${snippet}`);
  }

  if (!res.ok) {
    const errorMessage =
      typeof json === 'object' &&
      json !== null &&
      'error' in json &&
      typeof (json as { error?: unknown }).error === 'string'
        ? (json as { error: string }).error
        : res.statusText || 'Request failed';
    throw new Error(errorMessage);
  }

  return json;
}
