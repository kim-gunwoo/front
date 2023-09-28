import type { Meta, StoryObj } from '@storybook/react';

import View from './view';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
// const meta: Meta<typeof View> = {
const meta = {
  title: 'Example/View',
  component: View,
  parameters: {
    docs: {
      description: {
        component: 'sdfasfasdf description, overriding the comments',
        story: 'Another description on the story, overriding the comments',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
    text: { control: 'select', options: ['', 'Normal', 'Bold', 'Italic'], defaultValue: 'Normal' },
    color: { control: 'text', defaultValue: 'aaaaaaa' },
  },
} satisfies Meta<typeof View>;
// }

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
