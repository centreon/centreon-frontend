import * as React from 'react';

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  CollisionDetection,
  DraggableSyntheticListeners,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  SortingStrategy,
} from '@dnd-kit/sortable';
import {
  equals,
  find,
  indexOf,
  isNil,
  move,
  not,
  path,
  pipe,
  propEq,
  pick,
  pluck,
} from 'ramda';

import { debounce, useTheme } from '@material-ui/core';

import SortableItem from './SortableItem';
import Item from './Item';

interface ContentProps {
  attributes;
  isDragging: boolean;
  itemRef: React.RefObject<HTMLDivElement>;
  listeners: DraggableSyntheticListeners;
  style;
}

interface RootComponentProps {
  children: JSX.Element | null;
  isInDragOverlay?: boolean;
}

interface Props<T> {
  Content: ({
    isDragging,
    listeners,
    attributes,
    style,
    itemRef,
    ...other
  }: ContentProps & T) => JSX.Element;
  RootComponent?: ({
    children,
    isInDragOverlay,
  }: RootComponentProps) => JSX.Element;
  additionalProps?: Array<unknown>;
  collisionDetection: CollisionDetection;
  getDisableItemCondition?: (item: T) => boolean;
  itemProps: Array<string>;
  items: Array<T>;
  onDragEnd?: (items: Array<string>) => void;
  onDragOver?: (items: Array<string>) => void;
  sortingStrategy: SortingStrategy;
  updateSortableItemsOnItemsChange?: boolean;
}

type OrderDebounce = (value: Array<string>) => void;

const SortableItems = <T extends { id: string }>({
  items,
  onDragEnd,
  onDragOver,
  collisionDetection,
  sortingStrategy,
  itemProps,
  additionalProps,
  RootComponent = ({ children }) => children as JSX.Element,
  Content,
  getDisableItemCondition = () => false,
  updateSortableItemsOnItemsChange = false,
}: Props<T>): JSX.Element => {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [sortableItems, setSortableItems] = React.useState(pluck('id', items));
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const theme = useTheme();
  const debouncedChangeOrder = React.useRef<OrderDebounce>(
    debounce<OrderDebounce>((newItemsOrder: Array<string>): void => {
      setSortableItems(newItemsOrder);
      onDragOver?.(newItemsOrder);
    }, 150),
  );

  const dragStart = (event): void => {
    setActiveId(path(['active', 'id'], event) as string);
  };

  const dragCancel = () => setActiveId(null);

  const dragEnd = () => {
    setActiveId(null);

    onDragEnd?.(sortableItems);
  };

  const dragOver = (event): void => {
    const overId = path(['over', 'id'], event);

    if (
      pipe(isNil, not)(overId) &&
      pipe(equals(activeId), not)(overId as string | null)
    ) {
      const oldIndex = indexOf(activeId, sortableItems);
      const newIndex = indexOf(overId, sortableItems);

      const newItemsOrder = move<string>(oldIndex, newIndex, sortableItems);
      debouncedChangeOrder.current(newItemsOrder);
    }
  };

  const activeItem = find(propEq('id', activeId), items) as Record<
    string,
    unknown
  >;

  React.useEffect(() => {
    if (not(updateSortableItemsOnItemsChange)) {
      return;
    }
    setSortableItems(pluck('id', items));
  }, [items]);

  return (
    <DndContext
      collisionDetection={collisionDetection}
      sensors={sensors}
      onDragCancel={dragCancel}
      onDragEnd={dragEnd}
      onDragOver={dragOver}
      onDragStart={dragStart}
    >
      <SortableContext items={sortableItems} strategy={sortingStrategy}>
        <RootComponent>
          <>
            {sortableItems.map((sortableItem) => {
              const item = find(propEq('id', sortableItem), items) as
                | Record<string, unknown>
                | undefined;

              if (isNil(item)) {
                return null;
              }

              return (
                not(getDisableItemCondition(item as T)) && (
                  <SortableItem
                    Content={Content}
                    itemId={sortableItem}
                    key={sortableItem}
                    memoProps={itemProps}
                    {...pick(itemProps, item)}
                    {...additionalProps}
                  />
                )
              );
            })}
          </>
        </RootComponent>
      </SortableContext>
      <DragOverlay style={{ zIndex: theme.zIndex.tooltip }}>
        <RootComponent isInDragOverlay>
          {activeId ? (
            <Item
              isDragging
              Content={Content}
              title={activeId}
              {...pick(itemProps, activeItem)}
              {...additionalProps}
            />
          ) : null}
        </RootComponent>
      </DragOverlay>
    </DndContext>
  );
};

export default SortableItems;
