import { Formik, FormikHelpers, FormikValues } from 'formik';
import * as Yup from 'yup';

import { makeStyles } from '@mui/styles';

import FormButtons from './FormButtons';
import Inputs from './Inputs';
import { Category, InputProps } from './Inputs/models';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    margin: theme.spacing(2, 0, 0),
  },
}));

interface Props<T> {
  Buttons?: React.ComponentType;
  categories?: Array<Category>;
  initialValues: T;
  inputs: Array<InputProps>;
  submit: (values: T, bag: FormikHelpers<T>) => void | Promise<void>;
  validate?: (values: FormikValues) => void;
  validationSchema: Yup.SchemaOf<T>;
}

const Form = <T extends object>({
  initialValues,
  validate,
  validationSchema,
  submit,
  categories,
  inputs,
  Buttons = FormButtons,
}: Props<T>): JSX.Element => {
  const classes = useStyles();

  return (
    <Formik<T>
      enableReinitialize
      validateOnBlur
      validateOnMount
      initialValues={initialValues}
      validate={validate}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      <div className={classes.formContainer}>
        <Inputs categories={categories} inputs={inputs} />
        <Buttons />
      </div>
    </Formik>
  );
};

export default Form;
