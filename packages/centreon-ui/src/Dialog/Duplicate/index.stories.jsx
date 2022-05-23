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
    component: ConfirmDialog,
    title: 'Dialog/Duplicate',
  } as ComponentMeta<typeof DuplicateDialog>;

  const TemplateDuplicateDialog: ComponentStory<typeof DuplicateDialog> = (args) => (
    <ConfirmDialog {...args} />
  );

export const normal = () =>TemplateDuplicateDialog.bind({});
