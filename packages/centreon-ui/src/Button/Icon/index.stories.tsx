import { ComponentStory, ComponentMeta } from '@storybook/react';

import AccessibilityIcon from '@mui/icons-material/Accessibility';

import IconButton from '.';

export default {
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['medium', 'large', 'small'],
    },
    title: { control: 'text' },
  },

  component: IconButton,
  title: 'Button/Icon',
} as ComponentMeta<typeof IconButton>;

const TemplateIconButton: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args}>
    <AccessibilityIcon />
  </IconButton>
);

export const normal = TemplateIconButton.bind({});
normal.args = { size: 'medium', title: 'ICON' };
