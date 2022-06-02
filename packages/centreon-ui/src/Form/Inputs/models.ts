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
  ConnectedAutocomplete,
  FieldsTable,
}

interface FieldsTableGetRequiredProps {
  index: number;
  values: FormikValues;
}

export interface InputProps {
  additionalLabel?: string;
  additionalMemoProps?: Array<unknown>;
  autocompleteConfiguration?: {
    creatable?: boolean;
    options: Array<SelectEntry>;
  };
  category: string;
  change?: ({ setFieldValue, value }) => void;
  connectedAutocompleteConfiguration?: {
    endpoint?: string;
    filterKey?: string;
  };
  fieldName: string;
  fieldsTableConfiguration?: {
    additionalFieldsToMemoize?: Array<string>;
    columns: Array<Omit<InputProps, 'category'>>;
    defaultRowValue: object;
    deleteLabel: string;
    getRequired?: ({ values, index }: FieldsTableGetRequiredProps) => boolean;
  };
  getDisabled?: (values: FormikValues) => boolean;
  getRequired?: (values: FormikValues) => boolean;
  label: string;
  radioConfiguration?: {
    options?: Array<{
      label: string;
      value: boolean | string;
    }>;
  };
  required?: boolean;
  switchConfiguration?: {
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
