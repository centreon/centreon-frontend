import React from 'react';

import { Button } from '@material-ui/core';

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
      buttonLabel: 'Show success snackbar',
      severity: Severity.success,
    },
    {
      buttonLabel: 'Show error snackbar',
      severity: Severity.error,
    },
    {
      buttonLabel: 'Show warning snackbar',
      severity: Severity.warning,
    },
    {
      buttonLabel: 'Show info snackbar',
      severity: Severity.info,
    },
  ];

  return (
    <>
      {snackbars.map(({ buttonLabel, severity }) => (
        <Button
          key={buttonLabel}
          variant="contained"
          onClick={() =>
            displayMessages
              ? showMessages({ messages, severity })
              : showMessage({ message, severity })
          }
        >
          {buttonLabel}
        </Button>
      ))}
    </>
  );
};

const StoryWithSnackbar = withSnackbar(Story);

export const snackbar = (): JSX.Element => <StoryWithSnackbar />;

export const snackbarWithMessages = (): JSX.Element => (
  <StoryWithSnackbar displayMessages />
);
