import { useEffect } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import SnackbarProvider from './SnackbarProvider';
import useSnackbar from './useSnackbar';

export default {
  component: SnackbarProvider,
  title: 'Snackbar',
} as ComponentMeta<typeof SnackbarProvider>;

interface Props {
  displayMessages?: boolean;
}

const Story = ({ displayMessages = false }: Props): JSX.Element => {
  const {
    showErrorMessage,
    showErrorMessages,
    showInfoMessage,
    showInfoMessages,
    showSuccessMessage,
    showSuccessMessages,
    showWarningMessage,
    showWarningMessages,
  } = useSnackbar();

  const message = 'This is a message';

  const messages = {
    first: 'my first message',
    second: 'my second message',
  };

  const snackbars = [
    {
      showSnackbar: displayMessages ? showSuccessMessages : showSuccessMessage,
    },
    {
      showSnackbar: displayMessages ? showErrorMessages : showErrorMessage,
    },
    {
      showSnackbar: displayMessages ? showWarningMessages : showWarningMessage,
    },
    {
      showSnackbar: displayMessages ? showInfoMessages : showInfoMessage,
    },
  ];

  useEffect(() => {
    snackbars.forEach(({ showSnackbar }) => {
      showSnackbar(
        (displayMessages ? messages : message) as string &
          Record<string, string>,
      );
    });
  }, [displayMessages]);

  return <div />;
};

const StoryWithSnackbar = ({ displayMessages }: Props): JSX.Element => (
  <SnackbarProvider maxSnackbars={4}>
    <Story displayMessages={displayMessages} />
  </SnackbarProvider>
);

const TemplateSnackbarProvider: ComponentStory<typeof SnackbarProvider> = (
  args,
) => <StoryWithSnackbar displayMessages {...args} />;

export const DynamicSnackbar = TemplateSnackbarProvider.bind({});

export const snackbar = (): JSX.Element => <StoryWithSnackbar />;

export const snackbarWithMessages = (): JSX.Element => (
  <StoryWithSnackbar displayMessages />
);
