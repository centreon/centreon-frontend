import { useMemo } from 'react';

import * as R from 'ramda';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@mui/styles';
import { Divider, IconButton, Tooltip, Typography } from '@mui/material';

import {
  Category,
  InputProps,
  InputPropsWithoutCategory,
  InputType,
} from './models';
import Autocomplete from './Autocomplete';
import SwitchInput from './Switch';
import RadioInput from './Radio';
import TextInput from './Text';
import ConnectedAutocomplete from './ConnectedAutocomplete';
import FieldsTable from './FieldsTable';
import Grid from './Grid';
import Custom from './Custom';
import LoadingSkeleton from './LoadingSkeleton';

export const getInput = R.cond<
  InputType,
  (props: InputPropsWithoutCategory) => JSX.Element | null
>([
  [
    R.equals(InputType.Switch) as (b: InputType) => boolean,
    R.always(SwitchInput),
  ],
  [
    R.equals(InputType.Radio) as (b: InputType) => boolean,
    R.always(RadioInput),
  ],
  [R.equals(InputType.Text) as (b: InputType) => boolean, R.always(TextInput)],
  [
    R.equals(InputType.SingleAutocomplete) as (b: InputType) => boolean,
    R.always(Autocomplete),
  ],
  [
    R.equals(InputType.MultiAutocomplete) as (b: InputType) => boolean,
    R.always(Autocomplete),
  ],
  [
    R.equals(InputType.Password) as (b: InputType) => boolean,
    R.always(TextInput),
  ],
  [
    R.equals(InputType.MultiConnectedAutocomplete) as (b: InputType) => boolean,
    R.always(ConnectedAutocomplete),
  ],
  [
    R.equals(InputType.SingleConnectedAutocomplete) as (
      b: InputType,
    ) => boolean,
    R.always(ConnectedAutocomplete),
  ],
  [
    R.equals(InputType.FieldsTable) as (b: InputType) => boolean,
    R.always(FieldsTable),
  ],
  [R.equals(InputType.Grid) as (b: InputType) => boolean, R.always(Grid)],
  [R.equals(InputType.Custom) as (b: InputType) => boolean, R.always(Custom)],
]);

const useStyles = makeStyles((theme) => ({
  additionalLabel: {
    marginBottom: theme.spacing(0.5),
  },
  buttons: {
    columnGap: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  category: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  categoryTitle: {
    alignItems: 'center',
    columnGap: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
  },
  inputWrapper: { width: '100%' },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    rowGap: theme.spacing(2),
  },
  tooltip: {
    maxWidth: theme.spacing(60),
  },
}));

interface Props {
  categories?: Array<Category>;
  inputs: Array<InputProps>;
  isLoading?: boolean;
}

const Inputs = ({
  inputs,
  categories = [],
  isLoading = false,
}: Props): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();

  const categoriesName = R.pluck('name', categories);

  const inputsByCategory = useMemo(
    () =>
      R.groupBy(
        ({ category }) => R.find(R.equals(category), categoriesName) as string,
        inputs,
      ),
    [inputs],
  );

  const sortedCategoryNames = useMemo(() => {
    const sortedCategories = R.sort(R.ascend(R.prop('order')), categories);

    const usedCategories = R.filter(
      ({ name }) => R.any(R.equals(name), R.keys(inputsByCategory)),
      sortedCategories,
    );

    return R.pluck('name', usedCategories);
  }, []);

  const sortedInputsByCategory = useMemo(
    () =>
      R.reduce<string, Record<string, Array<InputProps>>>(
        (acc, value) => ({
          ...acc,
          [value]: R.sort(
            (a, b) => (b?.required ? 1 : 0) - (a?.required ? 1 : 0),
            inputsByCategory[value],
          ),
        }),
        {},
        sortedCategoryNames,
      ),
    [inputs],
  );

  const lastCategory = useMemo(() => R.last(sortedCategoryNames), []);

  const normalizedInputsByCategory = (
    R.isEmpty(sortedInputsByCategory)
      ? [[null, inputs]]
      : R.toPairs(sortedInputsByCategory)
  ) as Array<[string | null, Array<InputProps>]>;

  return (
    <div>
      {normalizedInputsByCategory.map(([categoryName, categorizedInputs]) => {
        const hasCategoryTitle = R.not(R.isNil(categoryName));

        const categoryProps = hasCategoryTitle
          ? R.find(R.propEq('name', categoryName), categories)
          : ({} as Category);

        return (
          <div key={categoryName}>
            <div className={classes.category}>
              {hasCategoryTitle && (
                <div className={classes.categoryTitle}>
                  <Typography variant="h5">
                    {t(categoryName as string)}
                  </Typography>
                  <Tooltip
                    classes={{
                      tooltip: classes.tooltip,
                    }}
                    placement="top"
                    title={
                      categoryProps?.TooltipContent ? (
                        <categoryProps.TooltipContent />
                      ) : (
                        ''
                      )
                    }
                  >
                    <IconButton size="small">
                      {categoryProps?.EndIcon && (
                        <categoryProps.EndIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Tooltip>
                </div>
              )}
              <div className={classes.inputs}>
                {categorizedInputs.map((inputProps) => {
                  if (isLoading) {
                    return (
                      <LoadingSkeleton
                        input={inputProps}
                        key={inputProps.label}
                      />
                    );
                  }

                  const Input = getInput(inputProps.type);

                  return (
                    <div
                      className={classes.inputWrapper}
                      key={inputProps.label}
                    >
                      {inputProps.additionalLabel && (
                        <Typography
                          className={classes.additionalLabel}
                          variant="body1"
                        >
                          {t(inputProps.additionalLabel)}
                        </Typography>
                      )}
                      <Input {...inputProps} />
                    </div>
                  );
                })}
              </div>
            </div>
            {hasCategoryTitle &&
              R.not(R.equals(lastCategory, categoryName as string)) && (
                <Divider />
              )}
          </div>
        );
      })}
    </div>
  );
};

export default Inputs;
