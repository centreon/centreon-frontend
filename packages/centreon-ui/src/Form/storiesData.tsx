import { useFormikContext } from 'formik';
import * as Yup from 'yup';

import { Typography } from '@mui/material';

import { Category, InputProps, InputType } from './Inputs/models';

export interface BasicForm {
  active: boolean;
  email: string;
  name: string;
}

export const basicFormValidationSchema = Yup.object().shape({
  active: Yup.boolean().required('Active is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  name: Yup.string().required('Name is required'),
});

export const basicFormInitialValues = {
  active: false,
  email: '',
  name: '',
};

export const basicFormCategories: Array<Category> = [
  {
    name: 'First category',
    order: 1,
  },
  {
    name: 'Second category',
    order: 2,
  },
];

export const basicFormInputs: Array<InputProps> = [
  {
    category: 'First category',
    fieldName: 'name',
    label: 'Name',
    type: InputType.Text,
  },
  {
    category: 'First category',
    fieldName: 'email',
    label: 'Email',
    type: InputType.Text,
  },
  {
    category: 'Second category',
    fieldName: 'active',
    label: 'Active',
    type: InputType.Switch,
  },
];

export const CustomButton = (): JSX.Element => {
  const { dirty, isValid } = useFormikContext();

  return (
    <div>
      <Typography>Has form changed? {JSON.stringify(dirty)}</Typography>
      <Typography>Is valid? {JSON.stringify(isValid)}</Typography>
    </div>
  );
};
