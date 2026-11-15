// Base URL of the Rails API. Set VITE_API_URL in .env.local (dev) or in the
// hosting environment (production); falls back to the local Rails server.
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/+$/, '');

export const apiUrl = (path) => `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;
