/**
 * Code modified from
 * https://github.com/streetsidesoftware/cspell/issues/3215#issuecomment-1181992508
 */

const fs = require('fs');
const path = require('path');

/**
 * Load all the package.json
 *
 * @param {string} cwd
 * @returns
 */
function loadPackageJsonFiles(cwd) {
  const packageJsonFiles = [];
  function searchDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);

      if (file === 'package.json') {
        // console.log('found: %o', filePath);
        packageJsonFiles.push(filePath);
      } else if (file !== 'node_modules' && stats.isDirectory()) {
        searchDirectory(filePath);
      }
    }
  }
  searchDirectory(cwd);
  return packageJsonFiles.map(f => JSON.parse(fs.readFileSync(f, 'utf-8')));
}

function determinePackageNamesAndMethods(cwd = process.cwd()) {
  const pkgs = loadPackageJsonFiles(cwd);
  const packageNames = pkgs
    .map(pkg =>
      Object.keys(pkg.dependencies || {}).concat(
        Object.keys(pkg.devDependencies || {})
      )
    )
    .flat();
  const setOfWords = new Set(
    packageNames.flatMap(name => name.replace(/[@]/g, '').split('/'))
  );
  const words = [...setOfWords];
  return { words };
}

module.exports = {
  words: determinePackageNamesAndMethods().words,
};
