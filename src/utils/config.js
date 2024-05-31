let baseUrl;

if (import.meta.env.MODE === 'development') {
  baseUrl = import.meta.env.VITE_LOCAL;
} else {
  baseUrl = import.meta.env.VITE_RENDER
}

export default { baseUrl };
