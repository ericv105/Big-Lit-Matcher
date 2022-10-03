import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: 'inline-block',
    textAlign: 'center',
    padding: '10px',
    border: '1px solid blue',
    backgroundColor: 'yellow',
  };
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <h2>{props.show}</h2>
    </div>
  );
}