import crypto from 'crypto';

function generateLicenseKey(email, productId) {
  const data = `${email}-${productId}-${Date.now()}-${crypto.randomBytes(8).toString('hex')}`;
  const hash = crypto.createHash('sha256').update(data).digest('hex');

  const part1 = hash.substring(0, 4).toUpperCase();
  const part2 = hash.substring(4, 8).toUpperCase();
  const part3 = hash.substring(8, 12).toUpperCase();
  const part4 = hash.substring(12, 16).toUpperCase();

  const checksum = (part1 + part2 + part3 + part4)
    .split('')
    .reduce((acc, c) => acc + c.charCodeAt(0), 0) % 100;

  return `KNN-${part1}-${part2}-${part3}-${part4}-${checksum.toString().padStart(2, '0')}`;
}

// Store license key in Vercel KV for paid customer verification
async function storeLicenseKey(licenseKey, purchaseData) {
  try {
    const { kv } = await import('@vercel/kv');
    
    const licenseData = {
      email: purchaseData.email,
      product: purchaseData.product || 'knner-pro',
      session_id: purchaseData.session_id,
      created_at: new Date().toISOString(),
      activated: false
    };
    
    await kv.set(`license:${licenseKey}`, JSON.stringify(licenseData), { 
      ex: 60 * 60 * 24 * 365 * 2  // 2 year expiry
    });
    
    console.log('[KV] License stored:', licenseKey.substring(0, 8) + '...');
    return true;
  } catch (error) {
    console.log('[KV] KV not configured, skipping storage:', error.message);
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, stripe-signature');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  let event;
  try {
    event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (err) {
    console.error('Webhook parse error:', err.message);
    return res.status(400).json({ error: 'Invalid payload' });
  }

  console.log('=== Stripe Webhook ===');
  console.log('Event type:', event.type);
  console.log('Event ID:', event.id);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Payment successful!');
    console.log('Customer email:', session.customer_details?.email);
    console.log('Customer name:', session.customer_details?.name);

    const email = session.customer_details?.email;
    const name = session.customer_details?.name;

    if (!email) {
      console.log('No email provided');
      return res.status(200).json({ received: true });
    }

    const licenseKey = generateLicenseKey(email, 'knner-pro');
    console.log('Generated license:', licenseKey);

    // Store license in KV for verification
    await storeLicenseKey(licenseKey, {
      email,
      product: 'knner-pro',
      session_id: session.id
    });

    if (RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
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
              ${name ? `<p>Hi ${name},</p>` : ''}
              <p>Your license key:</p>
              <pre style="background: #f5f5f5; padding: 20px; font-size: 18px; border-radius: 8px; font-family: monospace;">
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
            text: `Thank you for purchasing Knner Pro!

Your license key: ${licenseKey}

To activate:
1. Open Knner app
2. Go to Settings → License
3. Enter your license key

If you have any questions, reply to this email.

Best regards,
Knner Team`
          })
        });
        console.log('License email sent');
      } catch (emailErr) {
        console.error('Email error:', emailErr);
      }
    } else {
      console.log('RESEND_API_KEY not configured - license key not sent by email');
      console.log('License would be:', licenseKey);
    }
  }

  return res.status(200).json({ received: true });
}