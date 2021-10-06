/* eslint-disable react/prop-types */

import React from 'react';

import { SeverityCode } from '../../StatusChip';

import IconNumber from '.';

export default { title: 'Icon/Number' };

const HeaderBackground = ({ children }) => (
  <div style={{ backgroundColor: '#232f39' }}>{children}</div>
);

export const normal = () => (
  <HeaderBackground>
    <IconNumber iconNumber={3} />
  </HeaderBackground>
);

export const coloredRed = () => (
  <HeaderBackground>
    <IconNumber
      iconNumber={3}
      iconType="colored"
      severityCode={SeverityCode.High}
    />
  </HeaderBackground>
);

export const coloredGrayLight = () => (
  <HeaderBackground>
    <IconNumber
      iconNumber={3}
      iconType="colored"
      severityCode={SeverityCode.None}
    />
  </HeaderBackground>
);

export const coloredGrayDark = () => (
  <HeaderBackground>
    <IconNumber
      iconNumber={3}
      iconType="colored"
      severityCode={SeverityCode.Low}
    />
  </HeaderBackground>
);

export const coloredGreen = () => (
  <HeaderBackground>
    <IconNumber
      iconNumber={3}
      iconType="colored"
      severityCode={SeverityCode.Ok}
    />
  </HeaderBackground>
);

export const coloredOrange = () => (
  <HeaderBackground>
    <IconNumber
      iconNumber={3}
      iconType="colored"
      severityCode={SeverityCode.Medium}
    />
  </HeaderBackground>
);

export const coloredBlue = () => (
  <HeaderBackground>
    <IconNumber
      iconNumber={3}
      iconType="colored"
      severityCode={SeverityCode.Pending}
    />
  </HeaderBackground>
);

export const borderedRed = () => (
  <HeaderBackground>
    <IconNumber
      iconNumber={3}
      iconType="bordered"
      severityCode={SeverityCode.High}
    />
  </HeaderBackground>
);

export const borderedGrayLight = () => (
  <HeaderBackground>
    <IconNumber
      iconNumber={3}
      iconType="bordered"
      severityCode={SeverityCode.None}
    />
  </HeaderBackground>
);

export const borderedGrayDark = () => (
  <HeaderBackground>
    <IconNumber
      iconNumber={3}
      iconType="bordered"
      severityCode={SeverityCode.Low}
    />
  </HeaderBackground>
);

export const borderedGreen = () => (
  <HeaderBackground>
    <IconNumber
      iconNumber={3}
      iconType="bordered"
      severityCode={SeverityCode.Ok}
    />
  </HeaderBackground>
);

export const borderedOrange = () => (
  <HeaderBackground>
    <IconNumber
      iconNumber={3}
      iconType="bordered"
      severityCode={SeverityCode.Medium}
    />
  </HeaderBackground>
);

export const borderedBlue = () => (
  <HeaderBackground>
    <IconNumber
      iconNumber={3}
      iconType="bordered"
      severityCode={SeverityCode.Pending}
    />
  </HeaderBackground>
);

export const bigNumber = () => (
  <HeaderBackground>
    <IconNumber
      iconNumber={123456789}
      iconType="bordered"
      severityCode={SeverityCode.Pending}
    />
  </HeaderBackground>
);
