import crypto from 'crypto';

// Generate a license key: KNN-XXXX-XXXX-XXXX-XXXX-CHKSUM
function generateLicenseKey(email, productId) {
  // Create a hash from email + product + timestamp
  const data = `${email}-${productId}-${Date.now()}-${crypto.randomBytes(8).toString('hex')}`;
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  
  // Extract 16 characters for the key
  const part1 = hash.substring(0, 4).toUpperCase();
  const part2 = hash.substring(4, 8).toUpperCase();
  const part3 = hash.substring(8, 12).toUpperCase();
  const part4 = hash.substring(12, 16).toUpperCase();
  
  // Calculate checksum (simple sum of all parts)
  const checksum = (part1 + part2 + part3 + part4)
    .split('')
    .reduce((acc, c) => acc + c.charCodeAt(0), 0) % 100;
  
  return `KNN-${part1}-${part2}-${part3}-${part4}-${checksum.toString().padStart(2, '0')}`;
}

// Verify license key checksum
export function verifyLicenseKey(key) {
  if (!key || typeof key !== 'string') return false;
  
  const parts = key.split('-');
  if (parts.length !== 6) return false;
  
  const [prefix, p1, p2, p3, p4, checksum] = parts;
  if (prefix !== 'KNN') return false;
  
  const expectedChecksum = (p1 + p2 + p3 + p4)
    .split('')
    .reduce((acc, c) => acc + c.charCodeAt(0), 0) % 100;
  
  return parseInt(checksum, 10) === expectedChecksum;
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Gumroad sends this data:
  const { 
    email, 
    product_permalink, 
    sale_id, 
    license_key: gumroadLicense,
    seller_id
  } = req.body;

  console.log('=== Gumroad Purchase ===');
  console.log('Email:', email);
  console.log('Product:', product_permalink);
  console.log('Sale ID:', sale_id);

  // Validate required fields
  if (!email || !product_permalink) {
    console.log('Missing required fields');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Generate our own license key
  const licenseKey = generateLicenseKey(email, product_permalink);
  console.log('Generated License:', licenseKey);

  // Send email via Resend
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  
  if (!RESEND_API_KEY) {
    console.log('RESEND_API_KEY not configured');
    // For testing, just return the license
    return res.status(200).json({ 
      success: true, 
      message: 'Email not sent (API key not configured)',
      license_key: licenseKey 
    });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Knner <onboarding@resend.dev>',
        to: email,
        subject: '🎉 Your Knner Pro License Key',
        html: `
          <h1>Thank you for purchasing Knner Pro!</h1>
          <p>Your license key:</p>
          <pre style="background: #f5f5f5; padding: 20px; font-size: 18px; border-radius: 8px;">
${licenseKey}
          </pre>
          <p>To activate:</p>
          <ol>
            <li>Open Knner app</li>
            <li>Go to Settings → License</li>
            <li>Enter your license key</li>
          </ol>
          <p>If you have any questions, reply to this email.</p>
          <br/>
          <p>Best regards,<br/>Knner Team</p>
        `,
        text: `
Thank you for purchasing Knner Pro!

Your license key: ${licenseKey}

To activate:
1. Open Knner app
2. Go to Settings → License
3. Enter your license key

If you have any questions, reply to this email.

Best regards,
Knner Team
        `
      })
    });

    if (response.ok) {
      console.log('Email sent successfully');
      return res.status(200).json({ success: true, license_key: licenseKey });
    } else {
      const error = await response.text();
      console.log('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}