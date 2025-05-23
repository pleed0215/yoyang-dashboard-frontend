export default function backend(endPoint: string, reqInit?: RequestInit) {
  const url = new URL(endPoint, process.env.BACKEND_URL);
  return fetch(url, reqInit);
}
