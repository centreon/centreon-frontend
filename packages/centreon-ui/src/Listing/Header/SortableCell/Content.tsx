import * as React from 'react';

import { always, and, equals, ifElse, isNil } from 'ramda';

import { makeStyles, TableSortLabel, Theme, Tooltip } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/MoreVert';
import { CreateCSSProperties } from '@material-ui/styles';

import { Props as ListingProps } from '../..';
import { Column } from '../../models';
import HeaderLabel from '../Label';

type StylesProps = Pick<Props, 'isDragging'>;

const useStyles = makeStyles<Theme, StylesProps>((theme) => ({
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  dragHandle: ({ isDragging }): CreateCSSProperties<StylesProps> => ({
    alignSelf: 'flex-start',
    cursor: isDragging ? 'grabbing' : 'grab',
    display: 'flex',
    marginLeft: -theme.spacing(1),
    outline: 'none',
  }),
}));

type Props = Pick<
  ListingProps<unknown>,
  'columnConfiguration' | 'sortField' | 'sortOrder' | 'onSort'
> & {
  column: Column;
  isDragging?: boolean;
};

const SortableHeaderCellContent = React.forwardRef(
  (
    {
      column,
      columnConfiguration,
      sortField,
      sortOrder,
      onSort,
      isDragging,
      ...props
    }: Props,
    ref: React.ForwardedRef<HTMLDivElement>,
  ): JSX.Element => {
    const classes = useStyles({ isDragging });

    const columnLabel = column.shortLabel || column.label;

    const columnSortField = column.sortField || column.id;

    const getTooltipLabel = ifElse(isNil, always(''), always(column.label));

    const sort = (): void => {
      const isDesc = and(
        equals(columnSortField, sortField),
        equals(sortOrder, 'desc'),
      );

      onSort?.({
        sortField: columnSortField,
        sortOrder: isDesc ? 'asc' : 'desc',
      });
    };

    const headerContent = (
      <Tooltip placement="top" title={getTooltipLabel(column.shortLabel)}>
        <div>
          <HeaderLabel>{columnLabel}</HeaderLabel>
        </div>
      </Tooltip>
    );

    return (
      <div className={classes.content} ref={ref}>
        {columnConfiguration?.sortable && (
          <div className={classes.dragHandle} {...props}>
            <DragIndicatorIcon fontSize="small" />
          </div>
        )}

        {column.sortable ? (
          <TableSortLabel
            active={sortField === columnSortField}
            aria-label={`Column ${column.label}`}
            direction={sortOrder || 'desc'}
            onClick={sort}
          >
            {headerContent}
          </TableSortLabel>
        ) : (
          headerContent
        )}
      </div>
    );
  },
);

export default SortableHeaderCellContent;
