"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const src = JSON.parse(fs.readFileSync(path.join(__dirname, '../../raw/cldr-47.0.0-json-full/cldr-core/supplemental/currencyData.json'), 'utf8'));
const map = {};
for (const [region, currencies] of Object.entries(src.supplemental.currencyData.region)) {
    // The first entry is the current legal tender
    const firstCurrency = Object.keys(currencies[0])[0];
    if (firstCurrency)
        map[region] = firstCurrency;
}
/* --- emit a .ts file that exports Record<string,string> --- */
const outDir = 'src/generated';
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'currency.ts'), `export const currency: Record<string, string> = ${JSON.stringify(map, null, 2)};\n`, 'utf8');
console.log(`✓ wrote ${Object.keys(map).length} ISO→currency pairs`);
