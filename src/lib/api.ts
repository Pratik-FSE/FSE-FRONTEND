type ViteMeta = ImportMeta & {
  env?: {
    VITE_API_BASE?: string;
  };
};

export const API_BASE = ((import.meta as ViteMeta).env?.VITE_API_BASE || '').replace(/\/$/, '');

function buildURL(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (!API_BASE) return normalizedPath;

  const baseHasApiSuffix = /\/api$/i.test(API_BASE);
  const pathHasApiPrefix = /^\/api(\/|$)/i.test(normalizedPath);

  if (baseHasApiSuffix && pathHasApiPrefix) {
    return `${API_BASE}${normalizedPath.replace(/^\/api/i, '')}`;
  }

  return `${API_BASE}${normalizedPath}`;
}

export async function fetchJSON(path: string, opts: RequestInit = {}) {
  const url = buildURL(path);
  const res = await fetch(url, { headers: { Accept: 'application/json' }, ...opts });
  const text = await res.text();
  let json: unknown = {};

  try {
    json = JSON.parse(text || '{}');
  } catch {
    // include body snippet for debugging
    const snippet = text ? text.slice(0, 800) : '';
    throw new Error(`Invalid JSON response (${res.status}): ${snippet}`);
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
