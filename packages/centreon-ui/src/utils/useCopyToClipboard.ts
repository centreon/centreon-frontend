import useSnackbar from '../Snackbar/useSnackbar';

type CopyFn = (text: string) => void;

interface Result {
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
  const { showSuccessMessage, showErrorMessage } = useSnackbar();

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      showErrorMessage(errorMessage);

      return;
    }

    await navigator.clipboard.writeText(text);
    showSuccessMessage(successMessage);
  };

  return { copy };
};

export default useCopyToClipboard;
