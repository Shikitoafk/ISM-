import { TRANSLATIONS } from '../src/data/translations.ts';

function getKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getKeys(obj[key], `${prefix}${key}.`));
    } else {
      keys.push(`${prefix}${key}`);
    }
  }
  return keys.sort();
}

const enKeys = getKeys(TRANSLATIONS.EN);
const ruKeys = getKeys(TRANSLATIONS.RU);
const kzKeys = getKeys(TRANSLATIONS.KZ);

let hasError = false;

const ruMissing = enKeys.filter(k => !ruKeys.includes(k));
const kzMissing = enKeys.filter(k => !kzKeys.includes(k));

if (ruMissing.length > 0) {
  console.error("Missing in RU:", ruMissing);
  hasError = true;
}
if (kzMissing.length > 0) {
  console.error("Missing in KZ:", kzMissing);
  hasError = true;
}

if (!hasError) {
  console.log("✅ Translation keys verified! All languages (EN, RU, KZ) have 100% key parity.");
} else {
  process.exit(1);
}
