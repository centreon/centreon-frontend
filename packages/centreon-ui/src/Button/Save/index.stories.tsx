import { ComponentMeta, ComponentStory } from '@storybook/react';

import ButtonSave from '.';

export default {
  argTypes: {
    iconSize: {
      control: { type: 'select' },
      options: ['medium', 'large', 'small'],
    },
    isSmall: { control: 'boolean' },
    labelLoading: { control: 'text' },
    labelSave: { control: 'text' },
    labelSucceeded: { control: 'text' },
    loading: { control: 'boolean' },
    smallIconSize: {
      control: { max: 30, min: 1, step: 2, type: 'number' },
      succeeded: { control: 'boolean' },
    },
  },
  component: ButtonSave,

  title: 'Button/Save',
} as ComponentMeta<typeof ButtonSave>;

const TemplateButtonSave: ComponentStory<typeof ButtonSave> = (args) => (
  <ButtonSave {...args} />
);

export const normal = TemplateButtonSave.bind({});
normal.args = { iconSize: 'medium' };

export const loading = TemplateButtonSave.bind({});
loading.args = { loading: false };

export const succeeded = TemplateButtonSave.bind({});
succeeded.args = {
  smallIconSize: {
    control: { max: 30, min: 1, step: 2, type: 'number' },
    succeeded: { control: true },
  },
};

export const normalWithText = TemplateButtonSave.bind({});
normalWithText.args = { iconSize: 'medium', labelSave: 'Save' };

export const loadingWithText = TemplateButtonSave.bind({});
loadingWithText.args = { labelLoading: 'Loading', loading: true };

export const succeededWithText = TemplateButtonSave.bind({});
succeededWithText.args = { labelSucceeded: 'Succeeded', succeeded: true };

export const normalWithTextAndSmallSize = TemplateButtonSave.bind({});
normalWithTextAndSmallSize.args = { isSmall: true, labelSave: 'Save' };

export const loadingWithTextAndSmallSize = TemplateButtonSave.bind({});
loadingWithTextAndSmallSize.args = {
  isSmall: true,
  labelLoading: 'Loading',
  loading: true,
};

export const succeededWithTextAndSmallSize = TemplateButtonSave.bind({});
succeededWithTextAndSmallSize.args = {
  isSmall: true,
  labelSucceeded: 'Succeeded',
  succeeded: true,
};
