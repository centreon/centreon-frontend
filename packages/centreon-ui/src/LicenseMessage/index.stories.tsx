import { ComponentMeta, ComponentStory } from '@storybook/react';

import LicenseMessage from '.';

export default {
  component: LicenseMessage,
  title: 'License Message',
} as ComponentMeta<typeof LicenseMessage>;

const TemplateLicenseMessage: ComponentStory<typeof LicenseMessage> = (
  args,
) => <LicenseMessage {...args} />;

export const withLabel = TemplateLicenseMessage.bind({});
withLabel.args = { label: 'This is a license message' };
