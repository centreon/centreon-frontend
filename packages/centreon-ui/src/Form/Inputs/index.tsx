import { useMemo } from 'react';

import {
  always,
  any,
  ascend,
  cond,
  equals,
  filter,
  find,
  groupBy,
  isEmpty,
  isNil,
  keys,
  last,
  not,
  pluck,
  prop,
  propEq,
  reduce,
  sort,
  toPairs,
} from 'ramda';
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

export const getInput = cond<
  InputType,
  (props: InputPropsWithoutCategory) => JSX.Element
>([
  [equals(InputType.Switch) as (b: InputType) => boolean, always(SwitchInput)],
  [equals(InputType.Radio) as (b: InputType) => boolean, always(RadioInput)],
  [equals(InputType.Text) as (b: InputType) => boolean, always(TextInput)],
  [
    equals(InputType.SingleAutocomplete) as (b: InputType) => boolean,
    always(Autocomplete),
  ],
  [
    equals(InputType.MultiAutocomplete) as (b: InputType) => boolean,
    always(Autocomplete),
  ],
  [equals(InputType.Password) as (b: InputType) => boolean, always(TextInput)],
  [
    equals(InputType.MultiConnectedAutocomplete) as (b: InputType) => boolean,
    always(ConnectedAutocomplete),
  ],
  [
    equals(InputType.SingleConnectedAutocomplete) as (b: InputType) => boolean,
    always(ConnectedAutocomplete),
  ],
  [
    equals(InputType.FieldsTable) as (b: InputType) => boolean,
    always(FieldsTable),
  ],
  [equals(InputType.Grid) as (b: InputType) => boolean, always(Grid)],
]);

const useStyles = makeStyles((theme) => ({
  additionalLabel: {
    marginBottom: theme.spacing(0.5),
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
}

const Inputs = ({ inputs, categories = [] }: Props): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();

  const categoriesName = pluck('name', categories);

  const inputsByCategory = useMemo(
    () =>
      groupBy(
        ({ category }) => find(equals(category), categoriesName) as string,
        inputs,
      ),
    [inputs],
  );

  const sortedCategoryNames = useMemo(() => {
    const sortedCategories = sort(ascend(prop('order')), categories);

    const usedCategories = filter(
      ({ name }) => any(equals(name), keys(inputsByCategory)),
      sortedCategories,
    );

    return pluck('name', usedCategories);
  }, []);

  const sortedInputsByCategory = useMemo(
    () =>
      reduce<string, Record<string, Array<InputProps>>>(
        (acc, value) => ({
          ...acc,
          [value]: sort(
            (a, b) => (b?.required ? 1 : 0) - (a?.required ? 1 : 0),
            inputsByCategory[value],
          ),
        }),
        {},
        sortedCategoryNames,
      ),
    [inputs],
  );

  const lastCategory = useMemo(() => last(sortedCategoryNames), []);

  const truc = (
    isEmpty(sortedInputsByCategory)
      ? [[null, inputs]]
      : toPairs(sortedInputsByCategory)
  ) as Array<[string | null, Array<InputProps>]>;

  return (
    <div>
      {truc.map(([categoryName, categorizedInputs]) => {
        const hasCategoryTitle = not(isNil(categoryName));

        const categoryProps = hasCategoryTitle
          ? find(propEq('name', categoryName), categories)
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
              not(equals(lastCategory, categoryName as string)) && <Divider />}
          </div>
        );
      })}
    </div>
  );
};

export default Inputs;
