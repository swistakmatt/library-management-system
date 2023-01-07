/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [ './tsconfig.eslint.json' ],
  },
  plugins: [ '@typescript-eslint' ],
  extends: [
    'google',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    'require-jsdoc': 'off',
    'linebreak-style': 'off',
    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': [
      'error',
      'always',
    ],
    'max-len': [ 'error', { code: 160, comments: 320 } ],
    // 'max-len': 'off',
    'object-property-newline': [ 'error', { allowAllPropertiesOnSameLine: true } ],
    'no-console': 'off',
    'space-infix-ops': [ 'error', { int32Hint: false } ],
    camelcase: [ 'off', { properties: 'never' } ],
    indent: [ 'error', 2, { SwitchCase: 1 } ],
    '@typescript-eslint/indent': [ 'error', 2, { SwitchCase: 1 } ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: [ 'none', 'all', 'multiple', 'single' ],
        allowSeparatedGroups: false,
      },
    ],
    'no-useless-return': 'error',
    'arrow-spacing': 'error',
    'no-warning-comments': [ 'error', { terms: [ 'TODO', '!' ], location: 'start' } ],
    '@typescript-eslint/ban-types': [ 'error', { types: { object: false } } ],
    '@typescript-eslint/type-annotation-spacing': [ 'error', { after: true } ],
    semi: 'off',
    '@typescript-eslint/semi': 'error',
    '@typescript-eslint/explicit-module-boundary-types': [ 'warn', { allowArgumentsExplicitlyTypedAsAny: true } ],
    'quote-props': [ 'error', 'as-needed' ],
    'space-in-parens': [ 'error', 'never' ],
  }
}


module.exports = config;