module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['@react-native-community', 'plugin:import/recommended'],
  env: {
    jest: true,
    node: true,
  },
  plugins: ['import'],
  settings: {
    'import/resolver': {
      'babel-module': {
        '~/components': './app/components',
        '~/containers': './app/containers',
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
    'import/ignore': ['react-native'],
    node: true,
  },
  rules: {
    'import/no-unresolved': 0,
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '~/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        groups: [['builtin'], ['external'], ['internal'], ['parent', 'sibling'], ['object']],
        'newlines-between': 'always',
      },
    ],
    'import/newline-after-import': 'error',
    'import/no-default-export': 'error',
    'import/no-self-import': 'error',
    'import/no-cycle': ['error', { maxDepth: Infinity }],
    'import/no-useless-path-segments': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'no-mixed-operators': [
      'warn',
      {
        groups: [
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: false,
      },
    ],
    'no-unused-expressions': 0,
    'no-nested-ternary': 2,
    'react/no-unescaped-entities': 0,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
  },
};
