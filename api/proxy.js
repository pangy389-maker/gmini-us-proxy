export const config = {
  runtime: 'edge',
  regions: ['sfo1'], // 依然死死锁住旧金山
};

export default async function handler(req) {
  const url = new URL(req.url);
  
  // 直接把域名替换成 Google 的，完全不需要再做路径切割（因为我们等下会把 /api 从 Python 里拿掉）
  url.host = 'generativelanguage.googleapis.com';
  
  // 复制请求并转发
  const newReq = new Request(url, req);
  // 抹除原本的 IP 头，防止 Google 顺藤摸瓜看到你的香港 IP
  newReq.headers.delete('x-forwarded-for');
  newReq.headers.delete('x-real-ip');
  
  return fetch(newReq);
}
