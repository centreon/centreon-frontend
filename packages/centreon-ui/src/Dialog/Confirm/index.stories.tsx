import { ComponentMeta, ComponentStory } from '@storybook/react';

import ConfirmDialog from '.';

export default {
  argTypes: {
    labelCancel: { control: 'text' },
    labelConfirm: { control: 'text' },
    labelMessage: { control: 'text' },
    labelTitle: { control: 'text' },
    open: { control: 'boolean' },
  },
  component: ConfirmDialog,
  title: 'Dialog/Confirm',
} as ComponentMeta<typeof ConfirmDialog>;

const TemplateConfirmDialog: ComponentStory<typeof ConfirmDialog> = (args) => (
  <ConfirmDialog {...args} />
);
export const standard = TemplateConfirmDialog.bind({});
standard.args = {
  labelMessage: 'Your progress will not be saved.',
  labelTitle: 'Do you want to confirm action ?',
  open: 'true',
};
