import * as fs from 'node:fs';
import * as path from 'node:path';

const src = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../raw/cldr-47.0.0-json-full/cldr-core/supplemental/currencyData.json'),
    'utf8'
  )
) as any;

const map: Record<string, string> = {};
for (const [region, currencies] of Object.entries(
  src.supplemental.currencyData.region
) as [string, any][]) {
  // The first entry is the current legal tender
  const firstCurrency = Object.keys(currencies[0])[0];
  if (firstCurrency) map[region] = firstCurrency;
}

/* --- emit a .ts file that exports Record<string,string> --- */
const outDir = 'src/generated';
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(
  path.join(outDir, 'currency.ts'),
  `export const currency: Record<string, string> = ${JSON.stringify(map, null, 2)};\n`,
  'utf8'
);

console.log(`✓ wrote ${Object.keys(map).length} ISO→currency pairs`);
