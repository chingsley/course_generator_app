// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

// allow .cjs files (Firebase ships some modules as CJS)
config.resolver.sourceExts.push('cjs');

// disable the new package.json:exports resolver
config.resolver.unstable_enablePackageExports = false;

// (optional but recommended) avoid symlink resolution quirks
config.resolver.unstable_enableSymlinks = false;

module.exports = config;
