import { ComponentMeta, ComponentStory } from '@storybook/react';

import DuplicateDialog from '.';

export default {
  argTypes: {
    labelCancel: { control: 'text' },
    labelConfirm: { control: 'text' },
    labelMessage: { control: 'text' },
    labelTitle: { control: 'text' },
    open: { control: 'boolean' },
  },
  component: DuplicateDialog,
  title: 'Dialog/Duplicate',
} as ComponentMeta<typeof DuplicateDialog>;

const TemplateDuplicateDialog: ComponentStory<typeof DuplicateDialog> = (
  args,
) => <DuplicateDialog {...args} />;

export const normal = (): JSX.Element => TemplateDuplicateDialog.bind({});
