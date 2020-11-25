module.exports = (api) => {
  const isProd = api.env('production');
  
  const plugins = [
    [
      'module-resolver',
      {
        alias: {
          '~/components': './app/components',
          '~/config': './app/config',
          '~/constants': './app/constants',
          '~/hooks': './app/hooks',
          '~/localization': './app/localization',
          '~/modals': './app/modals',
          '~/store': './app/store',
          '~/navigation': './app/navigation',
          '~/screens': './app/screens',
          '~/services': './app/services',
          '~/styles': './app/styles',
          '~/types': './app/types',
          '~/utils': './app/utils',
        },
      },
    ],
    ['@babel/plugin-proposal-optional-chaining'],
 ];

  if (!isProd) {
    plugins.push(['transform-remove-console']);
  }

  return {
    presets: ['module:metro-react-native-babel-preset', '@babel/preset-flow'],
    plugins,
  };
};
