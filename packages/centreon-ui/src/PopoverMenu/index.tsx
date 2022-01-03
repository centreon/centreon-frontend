import * as React from 'react';

import clsx from 'clsx';

import {
  ClickAwayListener,
  Paper,
  Popper,
  PopperPlacementType,
  useTheme,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { IconButton } from '..';

const useStyles = makeStyles({
  popoverIconButton: {
    padding: 0,
    width: '100%',
  },
});

interface Props {
  children: (props?) => JSX.Element;
  className?: string;
  icon: JSX.Element;
  onClose?: () => void;
  onOpen?: () => void;
  popperPlacement?: PopperPlacementType;
  title?: string;
}

const PopoverMenu = ({
  icon,
  title,
  children,
  popperPlacement,
  onOpen,
  onClose,
  className,
}: Props): JSX.Element => {
  const theme = useTheme();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState();

  const isOpen = Boolean(anchorEl);

  const close = (reason?): void => {
    const isClosedByInputClick = reason?.type === 'mousedown';

    if (isClosedByInputClick) {
      return;
    }
    onClose?.();
    setAnchorEl(undefined);
  };

  const toggle = (event): void => {
    if (isOpen) {
      close();

      return;
    }

    onOpen?.();
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <IconButton
        ariaLabel={title}
        className={clsx(classes.popoverIconButton, className)}
        size="large"
        title={title}
        onClick={toggle}
      >
        {icon}
      </IconButton>
      {isOpen && (
        <ClickAwayListener onClickAway={close}>
          <Popper
            open
            anchorEl={anchorEl}
            placement={popperPlacement}
            style={{ zIndex: theme.zIndex.tooltip }}
          >
            <Paper>{children({ close })}</Paper>
          </Popper>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default PopoverMenu;
