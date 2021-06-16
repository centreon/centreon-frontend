/* eslint-disable no-console */

import * as React from 'react';

import UnsavedChangesDialog from '.';

export default { title: 'Dialog/Unsaved Changes Dialog' };

const closeDialog = () => console.log('close');
const discardChanges = () => console.log('discard');
const saveChanges = () => console.log('save');

export const normal = (): JSX.Element => (
  <UnsavedChangesDialog
    dialogOpened
    isValidForm
    closeDialog={closeDialog}
    discardChanges={discardChanges}
    isSubmitting={false}
    saveChanges={saveChanges}
  />
);

export const withNotValidForm = (): JSX.Element => (
  <UnsavedChangesDialog
    dialogOpened
    closeDialog={closeDialog}
    discardChanges={discardChanges}
    isSubmitting={false}
    isValidForm={false}
    saveChanges={saveChanges}
  />
);

export const submitting = (): JSX.Element => (
  <UnsavedChangesDialog
    dialogOpened
    isSubmitting
    isValidForm
    closeDialog={closeDialog}
    discardChanges={discardChanges}
    saveChanges={saveChanges}
  />
);
