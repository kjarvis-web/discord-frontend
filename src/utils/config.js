let baseUrl;

if (import.meta.env.MODE === 'development') {
  baseUrl = import.meta.env.VITE_LOCAL;
}

export default { baseUrl };
