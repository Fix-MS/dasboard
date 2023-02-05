module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'ignorePatterns': ['node_modules/', 'dist/'],
  'extends': [
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    '@typescript-eslint/no-empty-interface': 'error',

  },
};
