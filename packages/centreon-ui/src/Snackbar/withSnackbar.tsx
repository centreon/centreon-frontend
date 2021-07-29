import * as React from 'react';

import { SnackbarProvider } from 'notistack';

import { Fade } from '@material-ui/core';

import Snackbar, { SnackbarProps } from '.';

interface SnackbarContextProviderProps {
  children?: React.ReactNode;
}

const withSnackbar = (
  Component: (props) => JSX.Element,
): ((props) => JSX.Element) => {
  return (props: SnackbarContextProviderProps): React.ReactElement => {
    const snackbarContent = (
      id: string | number,
      { message, severity }: Omit<SnackbarProps, 'id'>,
    ): JSX.Element => {
      return <Snackbar id={id} message={message} severity={severity} />;
    };

    return (
      <SnackbarProvider
        TransitionComponent={({ children, ...rest }): JSX.Element => (
          <Fade {...rest}>
            <div>{children}</div>
          </Fade>
        )}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        content={snackbarContent}
        maxSnack={3}
      >
        <Component {...props} />
      </SnackbarProvider>
    );
  };
};

export default withSnackbar;
