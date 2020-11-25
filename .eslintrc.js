module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['@react-native-community', 'plugin:flowtype/recommended'],
  plugins: ['flowtype'],
  env: {
    jest: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      'babel-module': {
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
      flowtype: {
        onlyFilesWithFlowAnnotation: true,
      },
    },
    node: true,
  },
  rules: {
    // common
    'max-len': ["error", { "code": 100, "comments": 120 }],
    'flowtype/no-weak-types': [
      2,
      {
        any: false,
        Object: false,
        Function: false,
      },
    ],
  },
};
