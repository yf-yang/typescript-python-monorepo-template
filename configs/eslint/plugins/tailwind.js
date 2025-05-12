import tailwind from 'eslint-plugin-tailwindcss';
import { config as tseslintConfig } from 'typescript-eslint';

export default tseslintConfig(
  ...tailwind.configs['flat/recommended'],
  {
    name: 'whatever/tailwindcss/common',
    rules: {
      // follow prettier-plugin-tailwindcss
      'tailwindcss/classnames-order': 'off',
    },
  },
  {
    name: 'whatever/tailwindcss/settings',
    settings: {
      tailwindcss: {
        callees: ['classnames', 'clsx', 'ctl', 'cn'],
        whitelist: [
          'page-root', // Used to query page width
          '^debug-.*',
        ],
      },
    },
  }
);
