import { ComponentMeta, ComponentStory } from '@storybook/react';

import ButtonSave from '.';

export default {
  argTypes: {
    labelLoading: { control: 'text' },
    labelSave: { control: 'text' },
    labelSucceeded: { control: 'text' },
    loading: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    succeeded: { control: 'boolean' },
    tooltipLabel: { control: 'text' },
  },

  component: ButtonSave,

  title: 'Button/Save',
} as ComponentMeta<typeof ButtonSave>;

const TemplateButtonSave: ComponentStory<typeof ButtonSave> = (args) => (
  <ButtonSave {...args} />
);

export const normal = TemplateButtonSave.bind({});

export const loading = TemplateButtonSave.bind({});
loading.args = { loading: true };

export const succeeded = TemplateButtonSave.bind({});
succeeded.args = { succeeded: true };

export const normalWithText = TemplateButtonSave.bind({});
normalWithText.args = { labelSave: 'Save' };

export const loadingWithText = TemplateButtonSave.bind({});
loadingWithText.args = { labelLoading: 'Loading', loading: true };

export const succeededWithText = TemplateButtonSave.bind({});
succeededWithText.args = { labelSucceeded: 'Succeeded', succeeded: true };

export const normalWithTextAndSmallSize = TemplateButtonSave.bind({});
normalWithTextAndSmallSize.args = { labelSave: 'Save', size: 'small' };

export const loadingWithTextAndSmallSize = TemplateButtonSave.bind({});
loadingWithTextAndSmallSize.args = {
  labelLoading: 'Loading',
  loading: true,
  size: 'small',
};

export const succeededWithTextAndSmallSize = TemplateButtonSave.bind({});
succeededWithTextAndSmallSize.args = {
  labelSucceeded: 'Succeeded',
  size: 'small',
  succeeded: true,
};
