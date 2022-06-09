import { ComponentMeta, ComponentStory } from '@storybook/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { Alert, Container } from '@mui/material';

import { getModuleLicenseCheckEndpoint } from '../api';

import LicenseCheck from '.';

export default {
  argTypes: {
    isLicenseValid: { control: 'boolean' },
  },
  component: LicenseCheck,
  title: 'LicenseCheck',
} as ComponentMeta<typeof LicenseCheck>;

const mockedAxios = new MockAdapter(axios);

const moduleName = 'paidModule';

const endpoint = getModuleLicenseCheckEndpoint(moduleName);

const Module = (): JSX.Element => (
  <Container maxWidth="sm">
    <Alert severity="success">Welcome to {moduleName}</Alert>
  </Container>
);

interface Props {
  isLicenseValid: boolean;
}
const Story = ({ isLicenseValid }: Props): JSX.Element => {
  mockedAxios.onGet(endpoint).reply(() => [200, { success: isLicenseValid }]);

  return (
    <LicenseCheck moduleName={moduleName}>
      <Module />
    </LicenseCheck>
  );
};

const TemplateLicenseCheck: ComponentStory<typeof LicenseCheck> = (args) => (
  <LicenseCheck moduleName={moduleName}>
    <Module />
  </LicenseCheck>
);
export const DynamicLicenseCheck = TemplateLicenseCheck.bind({});

export const withInvalidLicense = (): JSX.Element => (
  <Story isLicenseValid={false} />
);

export const withValidLicense = (): JSX.Element => <Story isLicenseValid />;
