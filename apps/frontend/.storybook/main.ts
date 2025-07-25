import type { StorybookConfig } from 'storybook-react-rsbuild';
import { mergeRsbuildConfig } from '@rsbuild/core'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@chromatic-com/storybook'],
  framework: 'storybook-react-rsbuild',
  typescript: {
    reactDocgen: 'react-docgen',
    check: true,
  },
  rsbuildFinal: (config) => {
    config = {
      ...config,
      // https://github.com/rspack-contrib/storybook-rsbuild/issues/304#issuecomment-3116733520
      plugins: config.plugins?.filter(p => (p as {name?: string}).name !== 'rsbuild:react-router'),
    }
    return mergeRsbuildConfig(config, {
      dev: { client: { overlay: false } },
    })
  },
};

export default config;
