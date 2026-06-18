export const config = {
  runtime: 'edge',
  regions: ['sfo1'], // 美西旧金山节点，延迟更低
};
export default async function handler(req) {
  const url = new URL(req.url);
  url.host = 'generativelanguage.googleapis.com';
  url.pathname = url.pathname.replace(/^\/api/, '');
  return fetch(new Request(url, req));
}
