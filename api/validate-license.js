import crypto from 'crypto';

function verifyLicenseKey(key) {
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

// Check license against Vercel KV database
async function checkLicenseInKV(key) {
  try {
    const { kv } = await import('@vercel/kv');
    
    const licenseData = await kv.get(`license:${key}`);
    
    if (!licenseData) {
      return { found: false, activated: false };
    }
    
    const data = typeof licenseData === 'string' ? JSON.parse(licenseData) : licenseData;
    return { 
      found: true, 
      activated: data.activated || false,
      email: data.email
    };
  } catch (error) {
    console.error('[KV] Failed to check license:', error);
    return { found: false, activated: false, error: error.message };
  }
}

// Mark license as activated in KV
async function markLicenseActivated(key) {
  try {
    const { kv } = await import('@vercel/kv');
    
    const licenseData = await kv.get(`license:${key}`);
    if (licenseData) {
      const data = typeof licenseData === 'string' ? JSON.parse(licenseData) : licenseData;
      data.activated = true;
      data.activated_at = new Date().toISOString();
      await kv.set(`license:${key}`, JSON.stringify(data));
      console.log('[KV] License marked as activated:', key.substring(0, 8) + '...');
    }
    return true;
  } catch (error) {
    console.error('[KV] Failed to mark license activated:', error);
    return false;
  }
}

// Demo license keys for testing (only if KV is not configured)
const DEMO_LICENSES = new Set([
  'KNN-TEST-ABCD-EFGH-IJKL-MN12'
]);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { key, activated } = req.body;

  if (!key) {
    return res.status(400).json({ valid: false, error: 'License key is required' });
  }

  console.log('[validate-license] Checking license:', key.substring(0, 8) + '...');

  // First verify format and checksum
  if (!verifyLicenseKey(key)) {
    console.log('[validate-license] Invalid format/checksum');
    return res.status(200).json({ valid: false, error: 'Invalid license key format' });
  }

  // Check against Vercel KV database
  const kvResult = await checkLicenseInKV(key);
  
  if (kvResult.found) {
    console.log('[validate-license] License found in KV database');
    
    // If the request is to mark as activated, update KV
    if (activated && !kvResult.activated) {
      await markLicenseActivated(key);
    }
    
    return res.status(200).json({ 
      valid: true, 
      activated: kvResult.activated,
      email: kvResult.email
    });
  }

  // Fallback to demo licenses if KV is not available
  if (DEMO_LICENSES.has(key)) {
    console.log('[validate-license] License found in demo set');
    return res.status(200).json({ valid: true, activated: false });
  }

  console.log('[validate-license] License not found in database');
  return res.status(200).json({ 
    valid: false, 
    error: 'License key not found. Please purchase a license first.' 
  });
}