import { useFormikContext } from 'formik';
import * as Yup from 'yup';

import { Typography } from '@mui/material';

import { SelectEntry } from '../InputField/Select';
import { Listing } from '../api/models';

import {
  Category,
  InputProps,
  InputPropsWithoutCategory,
  InputType,
} from './Inputs/models';

export interface BasicForm {
  active: boolean;
  animals: Array<SelectEntry>;
  class: { id: number; name: string } | null;
  custom: string;
  email: string;
  group: { id: number; name: string } | null;
  isForced: boolean;
  language: string;
  name: string;
  password: string;
  scopes: Array<string>;
  sports: Array<SelectEntry>;
}

const selectEntryValidationSchema = Yup.object().shape({
  id: Yup.number().required('Required'),
  name: Yup.string().required('Required'),
});

export const basicFormValidationSchema = Yup.object().shape({
  active: Yup.boolean().required('Active is required'),
  animals: Yup.array().of(selectEntryValidationSchema.required('Required')),
  class: selectEntryValidationSchema.nullable().required('Required'),
  custom: Yup.string().required('Custom is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  group: selectEntryValidationSchema.nullable().required('Required'),
  isForced: Yup.boolean().required('Is forced is required'),
  language: Yup.string().required('Language is required'),
  name: Yup.string().required('Name is required'),
  password: Yup.string().required('Password is required'),
  scopes: Yup.array().of(Yup.string().required('Required')),
  sports: Yup.array().of(selectEntryValidationSchema.required('Required')),
});

export const basicFormInitialValues = {
  active: false,
  animals: [],
  class: null,
  custom: '',
  email: '',
  group: null,
  isForced: false,
  language: 'French',
  name: '',
  password: '',
  scopes: [],
  sports: [],
};

export const classOptions = [...Array(10).keys()].map((idx) => ({
  id: idx,
  name: `Class ${idx}`,
}));

export const sportOptions = [...Array(10).keys()].map((idx) => ({
  id: idx,
  name: `Sport ${idx}`,
}));

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
  {
    additionalLabel: 'This a very special label',
    category: 'First category',
    fieldName: 'password',
    label: 'Password',
    type: InputType.Password,
  },
  {
    category: 'First category',
    fieldName: 'language',
    label: 'Language',
    radio: {
      options: [
        {
          label: 'French',
          value: 'French',
        },
        {
          label: 'English',
          value: 'English',
        },
      ],
    },
    type: InputType.Radio,
  },
  {
    category: 'First category',
    fieldName: 'isForced',
    label: 'Is Forced?',
    radio: {
      options: [
        {
          label: 'Is not forced',
          value: false,
        },
        {
          label: 'Is forced',
          value: true,
        },
      ],
    },
    type: InputType.Radio,
  },
  {
    category: 'First category',
    fieldName: '',
    grid: {
      columns: [
        {
          autocomplete: {
            options: classOptions,
          },
          fieldName: 'class',
          label: 'Class (Single autocomplete)',
          type: InputType.SingleAutocomplete,
        },
        {
          autocomplete: {
            options: sportOptions,
          },
          fieldName: 'sports',
          label: 'Sports (Multi autocomplete)',
          type: InputType.MultiAutocomplete,
        },
      ],
    },
    label: 'autocompletes',
    type: InputType.Grid,
  },
  {
    autocomplete: {
      creatable: true,
      options: [],
    },
    category: 'First category',
    fieldName: 'scopes',
    label: 'Scopes (Multi autocomplete that allows value creation)',
    type: InputType.MultiAutocomplete,
  },
  {
    category: 'First category',
    fieldName: '',
    grid: {
      columns: [
        {
          connectedAutocomplete: {
            endpoint: 'endpoint',
          },
          fieldName: 'group',
          label: 'Group (Single connected autocomplete)',
          type: InputType.SingleConnectedAutocomplete,
        },
        {
          connectedAutocomplete: {
            endpoint: 'endpoint',
          },
          fieldName: 'animals',
          label: 'Animals (Multi connected autocomplete)',
          type: InputType.MultiConnectedAutocomplete,
        },
      ],
      gridTemplateColumns: '400px 1fr',
    },
    label: 'connected autocompletes',
    type: InputType.Grid,
  },
  {
    category: 'Second category',
    custom: {
      Component: ({ label }: InputPropsWithoutCategory): JSX.Element => (
        <Typography>This is a {label} component</Typography>
      ),
    },
    fieldName: 'custom',
    label: 'Custom',
    type: InputType.Custom,
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

const buildEntities = (from): Array<SelectEntry> => {
  return Array(10)
    .fill(0)
    .map((_, index) => ({
      id: from + index,
      name: `Entity ${from + index}`,
    }));
};

export const buildResult = (page): Listing<SelectEntry> => ({
  meta: {
    limit: 10,
    page,
    total: 40,
  },
  result: buildEntities((page - 1) * 10),
});
