// Build script for universal-age-gate-bypass
// Creates versioned releases in versions/ and dist/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8'));
const version = packageJson.version;
const scriptPath = path.join(__dirname, 'src', 'universal-age-gate-bypass.user.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

const versionsDir = path.join(__dirname, 'versions');
const distDir = path.join(__dirname, 'dist');

if (!fs.existsSync(versionsDir)) fs.mkdirSync(versionsDir, { recursive: true });
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

// Versioned copy in versions/
const versionedPath = path.join(versionsDir, `v${version}.user.js`);
fs.writeFileSync(versionedPath, scriptContent);

// Copy to dist/ (latest)
const distPath = path.join(distDir, 'universal-age-gate-bypass.user.js');
fs.writeFileSync(distPath, scriptContent);

console.log(`Built v${version}:`);
console.log(`  - ${versionedPath}`);
console.log(`  - ${distPath}`);

// Also create a minified version for dist (optional)
try {
    const terser = await import('terser');
    const minified = await terser.minify(scriptContent, {
        compress: { passes: 2 },
        mangle: true,
        format: { comments: /^!|@license|@preserve/ }
    });
    if (minified.code) {
        const minPath = path.join(distDir, 'universal-age-gate-bypass.min.user.js');
        fs.writeFileSync(minPath, minified.code);
        console.log(`  - ${minPath} (minified)`);
    }
} catch (e) {
    console.log('  (terser not installed, skipping minification)');
}