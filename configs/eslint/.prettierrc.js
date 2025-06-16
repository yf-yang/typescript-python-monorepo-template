import * as pluginJsdoc from 'prettier-plugin-jsdoc';

export default {
  plugins: [pluginJsdoc, pluginTailwindcss],
  singleQuote: true,
  trailingComma: 'es5',
  arrowParens: 'avoid',
  printWidth: 80,
  jsdocCommentLineStrategy: 'multiline',
  quoteProps: 'consistent',
};
