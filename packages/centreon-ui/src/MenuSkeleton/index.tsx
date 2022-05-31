import clsx from 'clsx';
import { equals } from 'ramda';

import { SkeletonProps, useTheme, alpha } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { LoadingSkeleton } from '@centreon/ui';

const useStyles = makeStyles((theme) => ({
  skeleton: {
    backgroundColor: alpha(theme.palette.grey[50], 0.4),
    borderRadius: 5,
    margin: theme.spacing(1, 0, 1, 2),
  },
}));

interface Props {
  animate?: boolean;
  className?: string;
  height?: number | string;
  variant?: SkeletonProps['variant'];
  width?: number | string;
}

const MenuLoader = ({
  width = 15,
  height = 5,
  className,
  variant = 'rectangular',
  animate = true,
}: Props): JSX.Element => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <LoadingSkeleton
      animation={animate ? 'wave' : false}
      className={clsx(classes.skeleton, className)}
      height={
        equals(typeof height, 'string')
          ? height
          : theme.spacing(height as number)
      }
      variant={variant}
      width={
        equals(typeof width, 'string') ? width : theme.spacing(width as number)
      }
    />
  );
};

export default MenuLoader;
