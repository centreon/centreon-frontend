import * as React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Typography } from '@mui/material';

import Dialog from '.';

export default {
  component: Dialog,
  title: 'Dialog',
} as ComponentMeta<typeof Dialog>;

const TemplateDialog: ComponentStory<typeof Dialog> = (args) => (
  <Dialog {...args} />
);

interface Props {
  children: React.ReactNode;
  confirmDisabled?: boolean;
  submitting?: boolean;
}
const Story = ({ children, ...props }: Props): JSX.Element => (
  <Dialog
    open
    onCancel={(): void => undefined}
    onConfirm={(): void => undefined}
    {...props}
  >
    {children}
  </Dialog>
);

export const normal = TemplateDialog.bind({});
normal.args = { open: true };

export const confirmDisabled = (): JSX.Element => (
  <Story confirmDisabled>
    <Typography>Dialog</Typography>
  </Story>
);

export const confirmDisabledSubmitting = (): JSX.Element => (
  <Story confirmDisabled submitting>
    <Typography>Dialog</Typography>
  </Story>
);
