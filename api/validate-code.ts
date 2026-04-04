import type { VercelRequest, VercelResponse } }

const CODES: Record<string, number> = {
  'EARLYBIRD': 20,
  'FRIEND10': 10,
  'LAUNCH50': 50,
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { code } = req.body || {};
  const discount = CODES[code?.toUpperCase()];

  if (!discount) {
    return res.status(404).json({ valid: false });
  }

  return res.status(200).json({ valid: true, discount });
}