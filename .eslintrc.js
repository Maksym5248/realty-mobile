module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react-native/all",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    project: "./tsconfig.json"
  },
  env: {
    jest: true,
    node: true,
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-native"
  ],
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
    node: true,
  },
  rules: {
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'import/no-default-export': 'error',
    "react/jsx-filename-extension": [1, { "extensions": [".tsx", ".jsx"] }]
    // 'jsx-a11y/href-no-hash': 'off',
    // 'import/no-cycle': 0,
    // 'import/order': 0,
    // 'import/prefer-default-export': 0,
    // 'no-console': 0,
    // 'max-classes-per-file': 0,
    // 'comma-dangle': [
    //   'error',
    //   {
    //     arrays: 'always-multiline',
    //     objects: 'always-multiline',
    //     imports: 'always-multiline',
    //     exports: 'always-multiline',
    //     functions: 'ignore',
    //   },
    // ],
    // 'no-mixed-operators': [
    //   'warn',
    //   {
    //     groups: [
    //       ['&', '|', '^', '~', '<<', '>>', '>>>'],
    //       ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
    //       ['&&', '||'],
    //       ['in', 'instanceof'],
    //     ],
    //     allowSamePrecedence: false,
    //   },
    // ],
    // 'no-trailing-spaces': [
    //   'error',
    //   {
    //     skipBlankLines: true,
    //   },
    // ],
    // 'no-underscore-dangle': 0,
    // 'no-unused-expressions': 0,
    // 'no-nested-ternary': 2,
    // 'function-paren-newline': 0,
    // 'global-require': 0,
    // 'react/jsx-filename-extension': [
    //   1,
    //   {
    //     extensions: ['.js', '.jsx', '.ts', '.tsx'],
    //   },
    // ],
    // 'react/forbid-prop-types': 0,
    // 'react/no-typos': 0,
    // 'react/require-default-props': 0,
    // 'react/default-props-match-prop-types': ['error', { allowRequiredDefaults: true }],
    // 'react/jsx-props-no-spreading': 0,
    // 'react/no-unescaped-entities': 0,
    // 'react-native/split-platform-components': 2,
    // 'react-native/no-inline-styles': 2,
    // 'react-native/no-color-literals': 0,
    // 'react/static-property-placement': 0,
    // 'arrow-parens': 0,
    // 'react-hooks/rules-of-hooks': 'error',
    // 'react-hooks/exhaustive-deps': 'warn',
    // 'import/no-named-as-default': 0,
    // 'max-len': ['error', { code: 100, comments: 120 }],
  },
};
