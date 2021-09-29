import React from 'react';

import clsx from 'clsx';

import { makeStyles, Theme  } from '@material-ui/core/';

import { getStatusColors, Avatar } from '@centreon/ui';

import { SeverityCode } from '../../StatusChip';

const useStyles = makeStyles<Theme, { severityCode?: number }>((theme) => {
  const getStatusIconColor = (severityCode :string): JSX.Element =>
    getStatusColors({
      severityCode,
      theme,
    }).backgroundColor;

  return {
    icon: {
      borderRadius: '50px',
      boxSizing: 'border-box',
      color: theme.palette.background.paper,
      cursor: 'pointer',
      display: 'inline-block',
      fontSize: '.875rem',
      height: '32px',
      margin: '0 6px',
      minWidth: '32px',
      overflow: 'hidden',
      padding: '0px 5px',
      position: 'relative',
      textAlign: 'center',
      textDecoration: 'none',
    },
    bordered: ({ severityCode }): CreateCSSProperties => ({
      ...(severityCode && {
        border: getStatusIconColor(severityCode),
      }),
    colored: ({ severityCode }): CreateCSSProperties => ({
      ...(severityCode && {
        background: getStatusIconColor(severityCode),
        border: '2px solid transparent',
      }),
    }),
    numberCount: {
      color: theme.palette.background.paper,
      lineHeight: '28px',
    },
    numberWrap: {
      fontSize: '0.875rem',
      position: 'relative',
      textDecoration: 'none',
    },
  
})};

interface Props {
  iconNumber: number | JSX.Element;
  iconType: string;
  severityCode: SeverityCode;
}

const IconNumber = ({
  iconType,
  severityCode,
  iconNumber,
}: Props): JSX.Element => {
  const classes = useStyles({ severityCode });

  return (
    <span className={clsx(classes.icon, classes[iconType], classes.numberWrap)}>
      <span className={classes.numberCount}>
        <Avatar colored={{  bgcolor: severityCode  }}>{iconNumber},
        </Avatar>
      </span>
    </span>
  );
};

export default IconNumber;
