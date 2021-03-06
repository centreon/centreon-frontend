import { ChangeEvent } from 'react';

import { FormikValues, useFormikContext } from 'formik';
import { prop } from 'ramda';
import { useTranslation } from 'react-i18next';

import { FormControlLabel, Switch as MUISwitch } from '@mui/material';

import { useMemoComponent } from '@centreon/ui';

import { InputPropsWithoutGroup } from './models';

const Switch = ({
  fieldName,
  change,
  label,
  switchInput,
  getDisabled,
  additionalMemoProps,
}: InputPropsWithoutGroup): JSX.Element => {
  const { t } = useTranslation();

  const { values, setFieldValue } = useFormikContext<FormikValues>();

  const changeSwitchValue = (event: ChangeEvent<HTMLInputElement>): void => {
    if (change) {
      change({ setFieldValue, value: event.target.checked });

      return;
    }

    setFieldValue(fieldName, event.target.checked);
  };

  const value =
    switchInput?.getChecked?.(prop(fieldName, values)) ??
    prop(fieldName, values);
  const disabled = getDisabled?.(values) || false;

  return useMemoComponent({
    Component: (
      <FormControlLabel
        control={
          <MUISwitch
            checked={value}
            disabled={disabled}
            inputProps={{ 'aria-label': t(label) }}
            onChange={changeSwitchValue}
          />
        }
        label={t(label) as string}
      />
    ),
    memoProps: [value, disabled, additionalMemoProps],
  });
};

export default Switch;
