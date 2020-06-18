module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'prettier',
    'react-hooks',
    'simple-import-sort',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
  ],
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'es5' }],
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-nested-ternary': 'error',
    'simple-import-sort/sort': [
      'error',
      {
        groups: [
          // Default Groups
          // Side effect imports.
          ['^\\u0000'],
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^@?\\w'],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything that does not start with a dot.
          ['^[^.]'],
          // Relative imports.
          // Anything that starts with a dot.
          ['^\\.'],
          // Custom Groups
          ['^src/'],
        ],
      },
    ],
  },
  settings: {
    react: {
      pragma: 'React', // Pragma to use, default to "React"
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
  },
};
