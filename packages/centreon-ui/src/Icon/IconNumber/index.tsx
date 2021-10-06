import React from 'react';

import clsx from 'clsx';

import { makeStyles, Theme, Avatar } from '@material-ui/core';
import { CreateCSSProperties } from '@material-ui/styles';

import { getStatusColors } from '@centreon/ui';

import { SeverityCode } from '../../StatusChip';

interface StyleProps {
  severityCode?: SeverityCode;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => {
  const getStatusIconColor = (severityCode: SeverityCode): string =>
    getStatusColors({
      severityCode,
      theme,
    }).backgroundColor;

  return {
    bordered: ({ severityCode }): CreateCSSProperties<StyleProps> => ({
      ...(severityCode && {
        border: getStatusIconColor(severityCode),
      }),
    }),
    colored: ({ severityCode }): CreateCSSProperties<StyleProps> => ({
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
  };
});

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
    <span className={clsx(classes[iconType], classes.numberWrap)}>
      <span className={classes.numberCount}>
        <Avatar className={classes.colored}>{iconNumber}</Avatar>
      </span>
    </span>
  );
};

export default IconNumber;
