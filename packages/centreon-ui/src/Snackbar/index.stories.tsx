import React from 'react';

import { Typography } from '@material-ui/core';

import Severity from './Severity';
import useSnackbar from './useSnackbar';
import withSnackbar from './withSnackbar';

export default { title: 'Snackbar' };

interface Props {
  displayMessages?: boolean;
}

const Story = ({ displayMessages = false }: Props): JSX.Element => {
  const { showMessage, showMessages } = useSnackbar();

  const message = 'This is a message';

  const messages = {
    first: 'my first message',
    second: 'my second message',
  };

  const snackbars = [
    {
      severity: Severity.success,
    },
    {
      severity: Severity.error,
    },
    {
      severity: Severity.warning,
    },
    {
      severity: Severity.info,
    },
  ];

  React.useEffect(() => {
    snackbars.forEach(({ severity }) => {
      if (displayMessages) {
        showMessages({ messages, severity });
        return;
      }
      showMessage({ message, severity });
    });
  }, [displayMessages]);

  return <Typography>Snackbars</Typography>;
};

const StoryWithSnackbar = withSnackbar({ Component: Story, maxSnackbars: 4 });

export const snackbar = (): JSX.Element => <StoryWithSnackbar />;

export const snackbarWithMessages = (): JSX.Element => (
  <StoryWithSnackbar displayMessages />
);
