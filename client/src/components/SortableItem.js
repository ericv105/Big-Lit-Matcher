import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const newStyle = {
    transform: CSS.Translate.toString(transform),
    touchAction: 'none',
    transition,
    display: "inline-block",
    backgroundColor: 'white', 
    borderStyle: "solid",
    borderWidth: "0 0 0 3px",
    borderRadius: "2px",
    borderLeftColor: "#7193f1",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
    padding: '5px 10px',
    margin: '3px',
  };

  return (
    <p ref={setNodeRef} style={newStyle} {...attributes} {...listeners}>
      {props.show}
    </p>
  );
}
