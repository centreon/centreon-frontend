import * as React from 'react';

import { withStyles, Accordion, AccordionSummary } from '@material-ui/core';

import { useMemoComponent } from '..';

const ExpansionPanelSummary = withStyles((theme) => ({
  content: {
    '&$expanded': {
      margin: theme.spacing(1, 0),
    },
    flexGrow: 0,
    margin: theme.spacing(1, 0),
    width: '100%',
  },
  expanded: {},
  focused: {},
  root: {
    '&$expanded': {
      minHeight: 'auto',
    },
    '&$focused': {
      backgroundColor: 'unset',
    },
    justifyContent: 'flex-start',
    minHeight: 'auto',
    padding: theme.spacing(0, 3, 0, 2),
  },
}))(AccordionSummary);

export interface FiltersProps {
  expandLabel?: string;
  expandableFilters?: React.ReactElement;
  expanded?: boolean;
  filters?: React.ReactElement;
  onExpand?: () => void;
}

const Filters = React.forwardRef(
  ({ filters }: FiltersProps, ref): JSX.Element => {
    return (
      <Accordion square expanded={false}>
        <ExpansionPanelSummary
          ref={ref as React.RefObject<HTMLDivElement>}
          style={{ cursor: 'default' }}
        >
          {filters}
        </ExpansionPanelSummary>
      </Accordion>
    );
  },
);

interface MemoizedFiltersProps extends FiltersProps {
  memoProps?: Array<unknown>;
}

export const MemoizedFilters = ({
  memoProps = [],
  expanded,
  ...props
}: MemoizedFiltersProps): JSX.Element =>
  useMemoComponent({
    Component: <Filters expanded={expanded} {...props} />,
    memoProps: [...memoProps, expanded],
  });

export default Filters;
