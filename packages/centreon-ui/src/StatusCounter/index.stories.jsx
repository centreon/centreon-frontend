/* eslint-disable react/prop-types */
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SeverityCode } from '../StatusChip';

import StatusCounter from '.';

export default { component: StatusCounter, title: 'StatusCounter' } as ComponentMeta<typeof StatusCounter> ;

const HeaderBackground = ({ children }) => (
  <div style={{ backgroundColor: '#232f39' }}>{children}</div>
);

const TemplateStatusCounter: ComponentStory<typeof StatusCounter> = (args) => (
  <HeaderBackground>
    <StatusCounter {...args} />
  </HeaderBackground>
);


export const customisable = TemplateStatusCounter.bind({});

export const severityCodeHigh = () => (
  <HeaderBackground>
    <StatusCounter count={3} severityCode={SeverityCode.High} />
  </HeaderBackground>
);

export const severityCodeMedium = () => (
  <HeaderBackground>
    <StatusCounter count={3} severityCode={SeverityCode.Medium} />
  </HeaderBackground>
);

export const severityCodeLow = () => (
  <HeaderBackground>
    <StatusCounter count={3} severityCode={SeverityCode.Low} />
  </HeaderBackground>
);

export const severityCodeOk = () => (
  <HeaderBackground>
    <StatusCounter count={3} severityCode={SeverityCode.Ok} />
  </HeaderBackground>
);

export const severityCodeHighCount0 = () => (
  <HeaderBackground>
    <StatusCounter count={0} severityCode={SeverityCode.High} />
  </HeaderBackground>
);

export const severityCodeMediumCount0 = () => (
  <HeaderBackground>
    <StatusCounter count={0} severityCode={SeverityCode.Medium} />
  </HeaderBackground>
);

export const severityCodeLowCount0 = () => (
  <HeaderBackground>
    <StatusCounter count={0} severityCode={SeverityCode.Low} />
  </HeaderBackground>
);

export const severityCodeOkCount0 = () => (
  <HeaderBackground>
    <StatusCounter count={0} severityCode={SeverityCode.Ok} />
  </HeaderBackground>
);

export const severityCodeOkBigCount = () => (
  <HeaderBackground>
    <StatusCounter count={500000} severityCode={SeverityCode.Ok} />
  </HeaderBackground>
);
