import * as React from 'react';

import { map, find, propEq, not } from 'ramda';
import { rectIntersection, DraggableSyntheticListeners } from '@dnd-kit/core';
import { rectSortingStrategy } from '@dnd-kit/sortable';
import clsx from 'clsx';

import { Chip, lighten, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { SelectEntry } from '../..';
import SortableItems from '../../../../SortableItems';

import { ItemHoverProps } from '.';

export interface DraggableSelectEntry extends SelectEntry {
  id: string;
}

interface Props {
  changeItemsOrder: (newItems: Array<DraggableSelectEntry>) => void;
  deleteValue: (id: string | number) => void;
  itemClick?: (item: DraggableSelectEntry) => void;
  itemHover?: (props: ItemHoverProps | null) => void;
  items: Array<DraggableSelectEntry>;
}

interface ContentProps
  extends Pick<DraggableSelectEntry, 'name' | 'createOption' | 'id'> {
  attributes;
  id: string;
  isDragging: boolean;
  itemRef: React.RefObject<HTMLDivElement>;
  listeners: DraggableSyntheticListeners;
  style;
}

const useStyles = makeStyles((theme) => ({
  createdTag: {
    backgroundColor: lighten(theme.palette.primary.main, 0.7),
  },
  tag: {
    margin: theme.spacing(0.5),
  },
}));

const SortableList = ({
  items,
  deleteValue,
  changeItemsOrder,
  itemClick,
  itemHover,
}: Props): JSX.Element => {
  const classes = useStyles();

  const dragEnd = (newItems): void =>
    changeItemsOrder(
      map(
        (item) => find(propEq('id', item), items),
        newItems,
      ) as Array<DraggableSelectEntry>,
    );

  const Content = ({
    attributes,
    listeners,
    name,
    createOption,
    id,
    style,
    itemRef,
  }: ContentProps): JSX.Element => {
    const labelItemRef = React.useRef<HTMLElement | null>(null);

    const mouseUp = (event: React.MouseEvent): void => {
      if (not(event.shiftKey)) {
        return;
      }
      itemClick?.({ createOption, id, name });
    };

    const mouseLeave = (): void => itemHover?.(null);

    const mouseOver = (): void =>
      itemHover?.({
        anchorElement: labelItemRef.current,
        item: { createOption, id, name },
      });

    const deleteItem = (): void => deleteValue(id);

    return (
      <div ref={itemRef} style={style}>
        <Chip
          clickable
          className={clsx(classes.tag, createOption && classes.createdTag)}
          deleteIcon={<CloseIcon />}
          label={
            <Typography
              ref={labelItemRef}
              variant="body2"
              onMouseUp={mouseUp}
              {...attributes}
              {...listeners}
            >
              {name}
            </Typography>
          }
          size="small"
          onDelete={deleteItem}
          onMouseLeave={mouseLeave}
          onMouseOver={mouseOver}
        />
      </div>
    );
  };

  return (
    <SortableItems
      updateSortableItemsOnItemsChange
      Content={Content}
      collisionDetection={rectIntersection}
      itemProps={['id', 'name', 'createOption']}
      items={items}
      sortingStrategy={rectSortingStrategy}
      onDragEnd={dragEnd}
    />
  );
};

export default SortableList;
