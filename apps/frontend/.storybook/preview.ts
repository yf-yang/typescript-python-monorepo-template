import type { Preview } from '@storybook/react';

import '../app/app.css';

const preview: Preview = {
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default preview;
