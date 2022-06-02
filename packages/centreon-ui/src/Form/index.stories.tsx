import { Paper } from '@mui/material';

import {
  BasicForm,
  basicFormCategories,
  basicFormInitialValues,
  basicFormInputs,
  basicFormValidationSchema,
  CustomButton,
} from './storiesData';

import Form from '.';

export default { title: 'Form' };

const submit = (_, { setSubmitting }): void => {
  setSubmitting(true);
  setTimeout(() => {
    setSubmitting(false);
  }, 700);
};

const mandatoryProps = {
  initialValues: basicFormInitialValues,
  inputs: basicFormInputs,
  submit,
  validationSchema: basicFormValidationSchema,
};

export const basicForm = (): JSX.Element => (
  <Paper elevation={0} sx={{ p: 1 }}>
    <Form<BasicForm> {...mandatoryProps} />
  </Paper>
);

export const basicFormWithCategories = (): JSX.Element => (
  <Paper elevation={0} sx={{ p: 1 }}>
    <Form<BasicForm> {...mandatoryProps} categories={basicFormCategories} />
  </Paper>
);

export const basicFormWithCustomButton = (): JSX.Element => (
  <Paper elevation={0} sx={{ p: 1 }}>
    <Form<BasicForm> {...mandatoryProps} Buttons={CustomButton} />
  </Paper>
);
