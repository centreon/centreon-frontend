import * as React from 'react';

import { Skeleton } from '@mui/material';
import { SkeletonProps } from '@mui/lab';
import makeStyles from '@mui/styles/makeStyles';

import { PageSkeletonProps } from '.';

export const useSkeletonStyles = makeStyles((theme) => ({
  skeletonLayout: {
    borderRadius: theme.spacing(0.5),
  },
}));

const BaseRectSkeleton = ({
  animate,
  ...props
}: Pick<PageSkeletonProps, 'animate'> & SkeletonProps): JSX.Element => {
  const classes = useSkeletonStyles();

  return (
    <Skeleton
      animation={animate ? 'wave' : false}
      className={classes.skeletonLayout}
      variant="rectangular"
      width="100%"
      {...props}
    />
  );
};

export default BaseRectSkeleton;
