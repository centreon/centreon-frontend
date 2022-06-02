import { useMemo, useState } from 'react';

import { FormikValues, useFormikContext } from 'formik';
import { equals, isNil, map, prop, type } from 'ramda';
import { useTranslation } from 'react-i18next';

import { FormHelperText, Stack } from '@mui/material';

import SingleAutocompleteField from '../../InputField/Select/Autocomplete';
import { labelPressEnterToAccept } from '../translatedLabels';
import MultiAutocompleteField from '../../InputField/Select/Autocomplete/Multi';
import useMemoComponent from '../../utils/useMemoComponent';
import { SelectEntry } from '../../InputField/Select';

import { InputPropsWithoutCategory, InputType } from './models';

const Autocomplete = ({
  fieldName,
  label,
  required,
  getDisabled,
  getRequired,
  change,
  additionalMemoProps,
  autocompleteConfiguration,
  type: inputType,
}: InputPropsWithoutCategory): JSX.Element => {
  const { t } = useTranslation();

  const [inputText, setInputText] = useState('');

  const { values, setFieldValue, errors } = useFormikContext<FormikValues>();

  const isMultiple = equals(inputType, InputType.MultiAutocomplete);

  const changeValues = (_, newValues): void => {
    const normalizedNewValues = isMultiple
      ? map((newValue: SelectEntry | string) => {
          if (isCreatable && equals(type(newValue), 'String')) {
            return newValue;
          }

          if (isCreatable) {
            return prop('name', newValue as SelectEntry);
          }

          return newValue;
        }, newValues)
      : newValues;

    if (change) {
      change({ setFieldValue, value: normalizedNewValues });

      return;
    }

    setFieldValue(fieldName, normalizedNewValues);
  };

  const isCreatable = autocompleteConfiguration?.creatable;

  const selectedValues = prop(fieldName, values);

  const getError = (): Array<string> | undefined => {
    const error = prop(fieldName, errors) as Array<string> | string | undefined;

    const normalizedError = isMultiple
      ? ((error as Array<string> | undefined)
          ?.map((errorText, index) => {
            if (isNil(errorText)) {
              return undefined;
            }

            return `${selectedValues[index]}: ${errorText}`;
          })
          .filter(Boolean) as Array<string>)
      : [error as string];

    return normalizedError || undefined;
  };

  const textChange = (event): void => setInputText(event.target.value);

  const getValues = (): SelectEntry | Array<SelectEntry> => {
    if (isMultiple && isCreatable) {
      return selectedValues.map((value) => ({
        id: value,
        name: value,
      }));
    }

    if (isCreatable) {
      return {
        id: selectedValues,
        name: selectedValues,
      };
    }

    return selectedValues;
  };

  const inputErrors = getError();

  const disabled = getDisabled?.(values) || false;
  const isRequired = required || getRequired?.(values) || false;
  const additionalLabel =
    inputText && isCreatable ? ` (${labelPressEnterToAccept})` : '';

  const AutocompleteField = useMemo(
    () => (isMultiple ? MultiAutocompleteField : SingleAutocompleteField),
    [isMultiple],
  );

  return useMemoComponent({
    Component: (
      <div>
        <AutocompleteField
          disabled={disabled}
          freeSolo={isCreatable}
          inputValue={inputText}
          isOptionEqualToValue={(option, selectedValue): boolean =>
            equals(option, selectedValue)
          }
          label={`${t(label)}${additionalLabel}`}
          open={isCreatable ? false : undefined}
          options={autocompleteConfiguration?.options || []}
          popupIcon={isCreatable ? null : undefined}
          required={isRequired}
          value={getValues()}
          onChange={changeValues}
          onTextChange={textChange}
        />
        {inputErrors && (
          <Stack>
            {inputErrors.map((error) => (
              <FormHelperText error key={error}>
                {error}
              </FormHelperText>
            ))}
          </Stack>
        )}
      </div>
    ),
    memoProps: [
      getValues(),
      inputErrors,
      additionalLabel,
      disabled,
      additionalMemoProps,
      isMultiple,
      autocompleteConfiguration?.options,
      isCreatable,
    ],
  });
};

export default Autocomplete;
