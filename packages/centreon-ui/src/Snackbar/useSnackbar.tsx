import * as React from 'react';

import { useSnackbar as useNotistackSnackbar } from 'notistack';

import { Typography } from '@material-ui/core';

import Severity from './Severity';

interface ShowMessageProps {
  message: string | JSX.Element;
  severity: Severity;
}

interface ShowMessagesProps {
  messages: Record<string, string>;
  severity: Severity;
}

interface UseSnackbar {
  showMessage: (props: ShowMessageProps) => void;
  showMessages: (props: ShowMessagesProps) => void;
}

const useSnackbar = (): UseSnackbar => {
  const { enqueueSnackbar } = useNotistackSnackbar();

  const showMessage = ({ message, severity }: ShowMessageProps): void => {
    enqueueSnackbar({ message, severity });
  };

  const showMessages = ({ messages, severity }: ShowMessagesProps): void => {
    const messageKeys = Object.keys(messages);

    const formattedMessages = messageKeys.map(
      (messageKey) => `${messageKey}: ${messages[messageKey]}`,
      [],
    );

    showMessage({
      message: (
        <div>
          {formattedMessages.map((errorMessage, index) => (
            <Typography key={messageKeys[index]} variant="body2">
              {errorMessage}
            </Typography>
          ))}
        </div>
      ),
      severity,
    });
  };

  return {
    showMessage,
    showMessages,
  };
};

export default useSnackbar;
