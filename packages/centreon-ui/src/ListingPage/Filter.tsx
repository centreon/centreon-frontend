import * as React from 'react';

import { Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(1),
  },
}));

export interface FiltersProps {
  content?: React.ReactElement;
}

const Filter = React.forwardRef(
  ({ content }: FiltersProps, ref): JSX.Element => {
    const classes = useStyles();

    return (
      <Paper square className={classes.content} ref={ref}>
        {content}
      </Paper>
    );
  },
);

export default Filter;
