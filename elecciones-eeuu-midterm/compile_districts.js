const fs = require('fs');

const data = JSON.parse(fs.readFileSync('distritos_data.json', 'utf8'));

// Grid configuration
const R = 10.2;
const W = Math.sqrt(3) * R;
const H = 1.5 * R;

const offsetX = 50;
const offsetY = 32;

function getHexCenter(c, r) {
  const x = offsetX + (r % 2 === 1 ? (c * W + W / 2) : (c * W));
  const y = offsetY + r * H;
  return { x: +x.toFixed(1), y: +y.toFixed(1) };
}

function getHexPoints(cx, cy, r) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i + 30);
    pts.push(`${+(cx + r * Math.cos(angle)).toFixed(1)},${+(cy + r * Math.sin(angle)).toFixed(1)}`);
  }
  return pts.join(' ');
}

// Generate the district objects with precomputed SVG geometry
const districtsList = [];
const labelsList = [];
const linesList = [];

for (const [stCode, s] of Object.entries(data)) {
  s.cells.forEach(([c, r], idx) => {
    const res = s.results[idx];
    const center = getHexCenter(c, r);
    const points = getHexPoints(center.x, center.y, R);
    districtsList.push({
      id: res.id,
      state: s.name,
      stateCode: stCode,
      col: c,
      row: r,
      cx: center.x,
      cy: center.y,
      points: points,
      party: res.party,
      key: res.key
    });
  });

  if (s.label) {
    const lPos = getHexCenter(s.label.col, s.label.row);
    labelsList.push({
      text: s.label.text,
      x: lPos.x,
      y: +(lPos.y + 3.5).toFixed(1),
      anchor: s.label.anchor || 'middle'
    });
  }

  if (s.line) {
    const p1 = getHexCenter(s.line.x1, s.line.y1);
    const p2 = getHexCenter(s.line.x2, s.line.y2);
    linesList.push({
      x1: p1.x,
      y1: p1.y,
      x2: p2.x,
      y2: p2.y
    });
  }
}

console.log('Districts processed:', districtsList.length);
console.log('Labels processed:', labelsList.length);
console.log('Lines processed:', linesList.length);

fs.writeFileSync('distritos_compiled.json', JSON.stringify({
  districts: districtsList,
  labels: labelsList,
  lines: linesList
}, null, 2));

console.log('distritos_compiled.json created!');
