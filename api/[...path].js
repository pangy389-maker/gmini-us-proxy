export const config = {
  runtime: 'edge',
  regions: ['sfo1'],
};

export default async function handler(req) {
  const url = new URL(req.url);
  
  // 1. 强制重定向 host
  url.host = 'generativelanguage.googleapis.com';
  
  // 2. 关键点：直接删掉 /api 前缀，保证传给 Google 的路径是 /v1beta/openai/models...
  const path = url.pathname.replace(/^\/api/, '');
  const newUrl = new URL(path + url.search, 'https://generativelanguage.googleapis.com');
  
  // 3. 直接转发请求
  return fetch(new Request(newUrl, req));
}
