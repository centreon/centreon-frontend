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
  <Form<BasicForm> {...mandatoryProps} />
);

export const basicFormWithCategories = (): JSX.Element => (
  <Form<BasicForm> {...mandatoryProps} categories={basicFormCategories} />
);

export const basicFormWithCustomButton = (): JSX.Element => (
  <Form<BasicForm> {...mandatoryProps} Buttons={CustomButton} />
);
