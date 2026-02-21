export const API_BASE = (import.meta as any).env?.VITE_API_BASE || '';

export async function fetchJSON(path: string, opts: RequestInit = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' }, ...opts });
  const text = await res.text();
  try {
    const json = JSON.parse(text || '{}');
    if (!res.ok) throw new Error(json?.error || res.statusText || 'Request failed');
    return json;
  } catch (err) {
    // include body snippet for debugging
    const snippet = text ? text.slice(0, 800) : '';
    throw new Error(`Invalid JSON response (${res.status}): ${snippet}`);
  }
}
