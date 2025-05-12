import * as pluginJsdoc from 'prettier-plugin-jsdoc';
import * as pluginTailwindcss from 'prettier-plugin-tailwindcss';

export default {
  plugins: [pluginJsdoc, pluginTailwindcss],
  singleQuote: true,
  trailingComma: 'es5',
  arrowParens: 'avoid',
  printWidth: 80,
  jsdocCommentLineStrategy: 'multiline',
  quoteProps: 'consistent',
  tailwindFunctions: ['cn', 'clsx'],
};
