import { ComponentMeta, ComponentStory } from '@storybook/react';

import TextField from '.';

export default {
  component: TextField,
  title: 'InputField/Text',
} as ComponentMeta<typeof TextField>;

const TemplateTextField: ComponentStory<typeof TextField> = (args) => (
  <TextField {...args} />
);

export const small = TemplateTextField.bind({});
small.args = { placeholder: 'Name', size: 'small' };

export const withLabelAndHelperText = TemplateTextField.bind({});
withLabelAndHelperText.args = {
  helperText: 'choose a name for current object',
  label: 'name',
};

export const withPlaceholderOnly = (): JSX.Element => (
  <TextField placeholder="name" />
);

export const withError = (): JSX.Element => (
  <TextField error="Wrong name" label="name" />
);

export const fullWidth = (): JSX.Element => (
  <TextField fullWidth label="full width" />
);

export const compact = (): JSX.Element => (
  <TextField placeholder="Compact" size="compact" />
);

export const transparent = (): JSX.Element => (
  <TextField transparent placeholder="Transparent" />
);
