// src/api.js
const BASE_URL = 'http://localhost:9090/api';

export const api = {
  get: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error('API Error');
    return res.json();
  },
  post: async (endpoint, data) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || 'API Error');
    }
    return res.json();
  },
  put: async (endpoint, data) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('API Error');
    return res.json();
  }
};
