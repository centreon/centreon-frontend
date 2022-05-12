import {
  IconButton as MuiIconButton,
  IconButtonProps,
  Tooltip,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(0.25),
  },
}));

export type Props = {
  ariaLabel?: string;
  title?: string;
} & IconButtonProps;

const IconButton = ({
  title = 'TOTO',
  ariaLabel,
  ...rest
}: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Tooltip aria-label={ariaLabel} title={title}>
      <span>
        <MuiIconButton className={classes.button} color="primary" {...rest} />
      </span>
    </Tooltip>
  );
};

export default IconButton;
