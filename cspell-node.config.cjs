/**
 * Code modified from
 * https://github.com/streetsidesoftware/cspell/issues/3215#issuecomment-1181992508
 */

const fs = require('fs');
const path = require('path');
const toml = require('toml');

/**
 * Load all the package.json
 *
 * @param {string} cwd
 * @returns {object[]}
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

/**
 * Load all the pyproject.toml
 *
 * @param {string} cwd
 * @returns {object[]}
 */
function loadPyprojectTomlFiles(cwd) {
  const pyprojectTomlFiles = [];
  function searchDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);

      if (file === 'pyproject.toml') {
        // console.log('found: %o', filePath);
        pyprojectTomlFiles.push(filePath);
      } else if (file !== 'node_modules' && stats.isDirectory()) {
        searchDirectory(filePath);
      }
    }
  }
  searchDirectory(cwd);
  return pyprojectTomlFiles.map(f => toml.parse(fs.readFileSync(f, 'utf-8')));
}

function determinePackageNamesAndMethods(cwd = process.cwd()) {
  const jsPackages = loadPackageJsonFiles(cwd);
  const jsPackageNames = jsPackages
    .map(pkg =>
      Object.keys(pkg.dependencies || {}).concat(
        Object.keys(pkg.devDependencies || {})
      )
    )
    .flat();
  const pyPackages = loadPyprojectTomlFiles(cwd);
  const pyPackageNames = pyPackages
    .map(pkg =>
      ((pkg.project || {}).dependencies || []).concat(
        ((pkg.project || {})['optional-dependencies'] || [])
      )
    )
    .flat()
    .map(specification => specification.split(/[ >=<~!\[\]]/)[0]);

  const packageNames = [...jsPackageNames, ...pyPackageNames];

  const setOfWords = new Set(
    packageNames.flatMap(name => name.replace(/[@]/g, '').split('/'))
  );
  const words = [...setOfWords];
  return { words };
}

module.exports = {
  words: determinePackageNamesAndMethods().words,
};