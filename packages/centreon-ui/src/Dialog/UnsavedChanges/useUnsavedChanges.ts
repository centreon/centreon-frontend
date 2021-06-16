import * as React from 'react';

import { and, isNil, not } from 'ramda';

interface UnsavedDialogOpened {
  action: () => void;
}

interface PanelSubmitForm {
  submitForm: () => Promise<void>;
}

interface Props {
  isValidForm: boolean;
}

interface UseUnsavedChanges {
  closeUnsavedDialog: () => void;
  openUnsavedDialog: (action: () => void) => void;
  panelSubmitForm: PanelSubmitForm | null;
  savePanelChanges: () => void;
  setPanelSubmitForm: React.Dispatch<
    React.SetStateAction<PanelSubmitForm | null>
  >;
  unsavedDialogOpened: UnsavedDialogOpened | null;
}

const useUnsavedChanges = ({ isValidForm }: Props): UseUnsavedChanges => {
  const [unsavedDialogOpened, setUnsavedDialogOpened] =
    React.useState<UnsavedDialogOpened | null>(null);
  const [panelSubmitForm, setPanelSubmitForm] =
    React.useState<PanelSubmitForm | null>(null);

  const openUnsavedDialog = (action: () => void): void => {
    setUnsavedDialogOpened({ action });
  };

  const closeUnsavedDialog = (): void => {
    if (isNil(unsavedDialogOpened)) {
      return;
    }
    unsavedDialogOpened.action();
    setUnsavedDialogOpened(null);
  };

  const savePanelChanges = (): void => {
    if (and(isNil(panelSubmitForm), not(isValidForm))) {
      setUnsavedDialogOpened(null);
      return;
    }
    panelSubmitForm?.submitForm();
    setPanelSubmitForm(null);
  };

  return {
    closeUnsavedDialog,
    openUnsavedDialog,
    panelSubmitForm,
    savePanelChanges,
    setPanelSubmitForm,
    unsavedDialogOpened,
  };
};

export default useUnsavedChanges;
