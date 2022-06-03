import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { Paper } from '@mui/material';

import {
  BasicForm,
  basicFormCategories,
  basicFormInitialValues,
  basicFormInputs,
  basicFormValidationSchema,
  buildResult,
  CustomButton,
} from './storiesData';

import Form from '.';

export default { title: 'Form' };

const mockedAxios = new MockAdapter(axios, { delayResponse: 500 });

mockedAxios
  .onGet(
    /endpoint\?page=\d+(?:&search={"\$or":\[{"host\.name":{"\$rg":".*"}}]})?/,
  )
  .reply((config) => {
    return [
      200,
      buildResult(parseInt(config.url?.split('page=')[1][0] || '0', 10)),
    ];
  });

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

export const loadingForm = (): JSX.Element => (
  <Paper elevation={0} sx={{ p: 1 }}>
    <Form<BasicForm> {...mandatoryProps} isLoading />
  </Paper>
);

export const loadingFormWithCategories = (): JSX.Element => (
  <Paper elevation={0} sx={{ p: 1 }}>
    <Form<BasicForm>
      {...mandatoryProps}
      isLoading
      categories={basicFormCategories}
    />
  </Paper>
);
