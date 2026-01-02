const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const projectRoot = __dirname;
const srcPath = path.resolve(projectRoot, './src');

const config = {
  resolver: {
    extraNodeModules: {
      '@components': path.resolve(srcPath, 'components'),
      '@store': path.resolve(srcPath, 'store'),
      '@routes': path.resolve(srcPath, 'routes'),
      '@assets': path.resolve(srcPath, 'assets'),
      '@services': path.resolve(srcPath, 'services'),
      '@navigation': path.resolve(srcPath, 'navigation'),
      '@native-modules': path.resolve(srcPath, 'native-modules'),
    },
  },
  watchFolders: [srcPath],
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
