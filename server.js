const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/sofacoaches.html');
});

const LEAGUE_ID = 12499;
const SEASON_ID = 2025;

const BASE_URL =
  `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${SEASON_ID}/segments/0/leagues/${LEAGUE_ID}`;

const SWID = process.env.SWID;
const ESPN_S2 = process.env.ESPN_S2;
console.log('SWID:', SWID);
console.log('ESPN_S2 length:', ESPN_S2 ? ESPN_S2.length : 0);
app.get('/espn', async (req, res) => {
const view = req.query.view;
 
try {
const response = await fetch(`${BASE_URL}?view=${view}`, {
headers: {
Cookie: `SWID=${SWID}; espn_s2=${ESPN_S2}`,
'User-Agent': 'Mozilla/5.0',
Accept: 'application/json'
},
redirect: 'manual'
});
 

 
const data = await response.json();
res.json(data);
} catch (err) {
console.error('Proxy error:', err);
res.status(500).json({ error: 'Proxy failed' });
}
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`ESPN proxy running on port ${PORT}`);
});
