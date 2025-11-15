import withNuxt from './.nuxt/eslint.config.mjs';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default withNuxt(
  // Дополнительные правила
  {
    files: ['**/*.{js,jsx,ts,tsx,vue}'],
    plugins: {
      prettier,
    },
    rules: {
      // Vue правила
      'vue/multi-word-component-names': 'off',

      // TypeScript правила
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Prettier интеграция
      'prettier/prettier': 'warn',

      // Отключаем конфликтующие с Prettier правила
      ...prettierConfig.rules,
    },
  },
);
