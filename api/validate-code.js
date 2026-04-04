const CODES = {
  'EARLYBIRD': 20,
  'FRIEND10': 10,
  'LAUNCH50': 50,
};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Support both query param (?code=EARLYBIRD) and body
  const code = req.query.code || req.body?.code;
  const discount = CODES[code?.toUpperCase()];

  if (!discount) {
    return res.status(404).json({ valid: false });
  }

  return res.status(200).json({ valid: true, discount });
}