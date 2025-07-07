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
    return mergeRsbuildConfig(config, {
      dev: { client: { overlay: false } },
    })
  },
};

export default config;
