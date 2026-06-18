export const config = {
  runtime: 'edge',
  regions: ['sfo1'],
};

export default async function handler(req) {
  const url = new URL(req.url);
  url.host = 'generativelanguage.googleapis.com';

  // 1. 获取原始请求的 Body
  let body = null;
  if (req.method === 'POST' || req.method === 'PUT') {
    body = await req.arrayBuffer(); // 读取原始二进制流，防止字符集碎裂
  }

  // 2. 显式组装全新的请求配置
  const fetchOptions = {
    method: req.method,
    headers: new Headers(req.headers),
    body: body,
  };

  // 3. 彻底抹除 Vercel 的代理特征头，防止被谷歌风控
  fetchOptions.headers.delete('x-forwarded-for');
  fetchOptions.headers.delete('x-real-ip');
  fetchOptions.headers.delete('host');

  return fetch(new Request(url, fetchOptions));
}
