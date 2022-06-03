import { FormikValues } from 'formik';

import { SvgIconProps } from '@mui/material';

import { SelectEntry } from '../../InputField/Select';

export enum InputType {
  Switch,
  Radio,
  Text,
  SingleAutocomplete,
  MultiAutocomplete,
  Password,
  SingleConnectedAutocomplete,
  MultiConnectedAutocomplete,
  FieldsTable,
  Grid,
  Custom,
}

interface FieldsTableGetRequiredProps {
  index: number;
  values: FormikValues;
}

export interface InputProps {
  additionalLabel?: string;
  additionalMemoProps?: Array<unknown>;
  autocomplete?: {
    creatable?: boolean;
    options: Array<SelectEntry>;
  };
  category: string;
  change?: ({ setFieldValue, value }) => void;
  connectedAutocomplete?: {
    endpoint?: string;
    filterKey?: string;
  };
  custom?: {
    Component: React.ComponentType<InputPropsWithoutCategory>;
  };
  fieldName: string;
  fieldsTable?: {
    additionalFieldsToMemoize?: Array<string>;
    columns: Array<Omit<InputProps, 'category'>>;
    defaultRowValue: object;
    deleteLabel: string;
    getRequired?: ({ values, index }: FieldsTableGetRequiredProps) => boolean;
  };
  getDisabled?: (values: FormikValues) => boolean;
  getRequired?: (values: FormikValues) => boolean;
  grid?: {
    columns: Array<Omit<InputProps, 'category'>>;
    gridTemplateColumns?: string;
  };
  label: string;
  radio?: {
    options?: Array<{
      label: string;
      value: boolean | string;
    }>;
  };
  required?: boolean;
  switchInput?: {
    getChecked?: (value) => boolean;
  };
  type: InputType;
}

export type InputPropsWithoutCategory = Omit<InputProps, 'category'>;

export interface Category {
  EndIcon?: (props: SvgIconProps) => JSX.Element;
  TooltipContent?: () => JSX.Element;
  name: string;
  order: number;
}
