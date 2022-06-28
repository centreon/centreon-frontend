import { useState } from 'react';

import useSnackbar from '../Snackbar/useSnackbar';

type CopiedText = string | null;
type CopyFn = (text: string) => void;

interface Result {
  copiedText: CopiedText;
  copy: CopyFn;
}

interface Props {
  errorMessage: string;
  successMessage: string;
}
const useCopyToClipboard = ({
  successMessage,
  errorMessage,
}: Props): Result => {
  const [copiedText, setCopiedText] = useState<CopiedText>(null);
  const { showSuccessMessage, showErrorMessage } = useSnackbar();

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      showErrorMessage(errorMessage);
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);

      showSuccessMessage(successMessage);
    } catch (error) {
      setCopiedText(null);
      showErrorMessage(errorMessage);
    }
  };

  return { copiedText, copy };
};

export default useCopyToClipboard;
