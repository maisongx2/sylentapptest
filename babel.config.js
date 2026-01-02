module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@components': './src/components',
            '@assets': './src/assets',
            '@routes': './src/routes',
            '@store': './src/store',
            '@services': './src/services',
            '@navigation': './src/navigation',
            '@native-modules': './src/native-modules',
          },
        },
      ],
    ],
  };
};
