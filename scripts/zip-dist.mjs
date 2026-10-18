// Builds the site and zips the CONTENTS of dist/ into deploy/site.zip.
// Local only: nothing is uploaded. Usage: npm run package
import { execSync } from 'node:child_process';
import { mkdirSync, rmSync, existsSync } from 'node:fs';

const run = (cmd) => execSync(cmd, { stdio: 'inherit' });

run('npm run build');
if (!existsSync('dist/index.html')) throw new Error('dist/index.html missing after build');
mkdirSync('deploy', { recursive: true });
rmSync('deploy/site.zip', { force: true });
// bsdtar (built into Windows 10+ and macOS) writes zip with -a. -C dist . includes dotfiles like .htaccess.
run('tar -a -c -f deploy/site.zip -C dist .');
console.log('\nCreated deploy/site.zip (contents of dist/, including .htaccess).');
