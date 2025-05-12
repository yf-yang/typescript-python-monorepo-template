import { defineConfig } from '@rsbuild/core';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSourceBuild } from '@rsbuild/plugin-source-build';
import tailwindcss from '@tailwindcss/postcss';
import { define } from '@whatever/macros';
import { pluginReactRouter } from 'rsbuild-plugin-react-router';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginSourceBuild(),
    pluginNodePolyfill(),
    pluginReactRouter(),
  ],
  tools: {
    postcss: (_, { addPlugins }) => {
      addPlugins([tailwindcss()]);
    },
  },
  source: { define },
});
