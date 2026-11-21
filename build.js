// Build script for universal-age-gate-bypass
// Creates versioned releases in versions/ and dist/
// Updates @downloadURL/@updateURL in dist/ to point to stable dist file

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
const REPO = 'universal-age-gate-bypass';
const OWNER = 'parhamghahremani';
const BRANCH = 'main';

if (!fs.existsSync(versionsDir)) fs.mkdirSync(versionsDir, { recursive: true });
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

// Versioned copy in versions/ (archive only - no URL updates)
const versionedPath = path.join(versionsDir, `v${version}.user.js`);
fs.writeFileSync(versionedPath, scriptContent);
console.log(`Created versioned archive: ${versionedPath}`);

// Copy to dist/ (latest) with updated URLs pointing to stable dist file
const distPath = path.join(distDir, 'universal-age-gate-bypass.user.js');
const stableUrl = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/dist/universal-age-gate-bypass.user.js`;

let distContent = scriptContent
    .replace(
        /@downloadURL\s+.*/,
        `@downloadURL  ${stableUrl}`
    )
    .replace(
        /@updateURL\s+.*/,
        `@updateURL    ${stableUrl}`
    );

fs.writeFileSync(distPath, distContent);
console.log(`Created dist file with stable URLs: ${distPath}`);
console.log(`  URLs: ${stableUrl}`);

console.log(`\nBuild complete! Version: ${version}`);
console.log(`Files:`);
console.log(`  - ${versionedPath} (archive)`);
console.log(`  - ${distPath} (stable update target)`);

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