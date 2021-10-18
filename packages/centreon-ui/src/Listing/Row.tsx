/* eslint-disable react/no-unused-prop-types */

import * as React from 'react';

import { equals, not, pluck } from 'ramda';

import {
  TableRowProps,
  TableRow,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { useViewportIntersection } from '../utils/useViewportIntersection';

import { Column, ColumnConfiguration, RowColorCondition } from './models';

const useStyles = makeStyles<Theme>((theme) => {
  return {
    intersectionRow: {
      display: 'contents',
      width: '100%',
    },
    row: {
      cursor: 'pointer',
      display: 'contents',
      width: '100%',
    },
    skeleton: {
      height: theme.spacing(2.5),
      width: '100%',
    },
    skeletonContainer: {
      padding: theme.spacing(0.5),
    },
  };
});

type Props = {
  checkable: boolean;
  children;
  columnConfiguration?: ColumnConfiguration;
  columnIds: Array<string>;
  disableRowCondition: (row) => boolean;
  isHovered?: boolean;
  isSelected?: boolean;
  isShiftKeyDown: boolean;
  lastSelectionIndex: number | null;
  row;
  rowColorConditions: Array<RowColorCondition>;
  shiftKeyDownRowPivot: number | null;
  visibleColumns: Array<Column>;
} & TableRowProps;

type RowProps = {
  isInViewport: boolean;
} & Props;

const Row = React.memo<RowProps>(
  ({
    children,
    tabIndex,
    onMouseOver,
    onFocus,
    onClick,
    isInViewport,
    visibleColumns,
    checkable,
  }: RowProps): JSX.Element => {
    const classes = useStyles();

    if (not(isInViewport)) {
      return (
        <>
          {checkable && (
            <div className={classes.skeletonContainer}>
              <div>
                <Skeleton className={classes.skeleton} variant="rect" />
              </div>
            </div>
          )}
          {visibleColumns.map(({ id }) => (
            <div className={classes.skeletonContainer} key={`loading_${id}`}>
              <div>
                <Skeleton className={classes.skeleton} variant="rect" />
              </div>
            </div>
          ))}
        </>
      );
    }

    return (
      <TableRow
        className={classes.row}
        component="div"
        tabIndex={tabIndex}
        onClick={onClick}
        onFocus={onFocus}
        onMouseOver={onMouseOver}
      >
        {children}
      </TableRow>
    );
  },
  (prevProps, nextProps) => {
    const {
      row: previousRow,
      rowColorConditions: previousRowColorConditions,
      isInViewport: prevIsInViewport,
      visibleColumns: previousVisibleColumns,
      isShiftKeyDown: prevIsShiftKeyDown,
      shiftKeyDownRowPivot: prevShiftKeyDownRowPivot,
      lastSelectionIndex: prevLastSelectionIndex,
    } = prevProps;
    const {
      row: nextRow,
      rowColorConditions: nextRowColorConditions,
      isInViewport: nextIsInViewport,
      visibleColumns: nextVisibleColumns,
      isShiftKeyDown: nextIsShiftKeyDown,
      shiftKeyDownRowPivot: nextShiftKeyDownRowPivot,
      lastSelectionIndex: nextLastSelectionIndex,
    } = nextProps;

    if (
      not(
        equals(
          pluck('id', previousVisibleColumns),
          pluck('id', nextVisibleColumns),
        ),
      )
    ) {
      return false;
    }

    if (not(equals(prevProps.isHovered, nextProps.isHovered))) {
      return false;
    }

    if (not(prevIsInViewport) && not(nextIsInViewport)) {
      return true;
    }

    if (not(prevIsInViewport) && nextIsInViewport) {
      return false;
    }

    const previousRowColors = previousRowColorConditions?.map(({ condition }) =>
      condition(previousRow),
    );
    const nextRowColors = nextRowColorConditions?.map(({ condition }) =>
      condition(nextRow),
    );

    return (
      equals(prevProps.isSelected, nextProps.isSelected) &&
      equals(prevProps.row, nextProps.row) &&
      equals(prevProps.className, nextProps.className) &&
      equals(previousRowColors, nextRowColors) &&
      equals(prevProps.columnIds, nextProps.columnIds) &&
      equals(prevProps.columnConfiguration, nextProps.columnConfiguration) &&
      equals(prevIsShiftKeyDown, nextIsShiftKeyDown) &&
      equals(prevShiftKeyDownRowPivot, nextShiftKeyDownRowPivot) &&
      equals(prevLastSelectionIndex, nextLastSelectionIndex)
    );
  },
);

const IntersectionRow = (props: Props): JSX.Element => {
  const rowRef = React.useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const { isInViewport, setElement } = useViewportIntersection({
    root: rowRef.current?.parentElement?.parentElement?.parentElement,
    rootMargin: `${theme.spacing(20)}px 0px ${theme.spacing(20)}px 0px`,
  });
  const classes = useStyles();

  const getFirstCellElement = (): ChildNode | null | undefined =>
    rowRef.current?.firstChild?.firstChild?.firstChild;

  React.useEffect(() => {
    setElement(getFirstCellElement() as HTMLDivElement);
  }, [getFirstCellElement()]);

  return (
    <div className={classes.intersectionRow} ref={rowRef}>
      <Row {...props} isInViewport={isInViewport} />
    </div>
  );
};

export default IntersectionRow;
