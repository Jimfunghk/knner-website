export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Gumroad 會 POST 呢啲資料：
  // {
  //   "email": "user@example.com",
  //   "product_id": "xxxxx",
  //   "product_permalink": "knner-pro",
  //   "license_key": "XXXX-XXXX-XXXX",
  //   "sale_id": "xxxxx",
  //   "sale_timestamp": "2026-04-05T05:19:40Z"
  // }

  const { email, license_key, product_permalink, sale_timestamp } = req.body;

  console.log('=== New Gumroad Purchase ===');
  console.log('Email:', email);
  console.log('License:', license_key);
  console.log('Product:', product_permalink);
  console.log('Sale Time:', sale_timestamp);
  console.log('Received at:', new Date().toISOString());

  // 回應 Gumroad 表示已收到
  return res.status(200).json({ success: true });
}