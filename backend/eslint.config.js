import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2025,
      globals: globals.node,
    },
    plugins: {
    },
    rules: {
      'semi': ['error', 'never'],
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'eol-last': ['error', 'always'],
    },
  },
)
