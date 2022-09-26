import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "./SortableItem";

function Preference({ prefType, getName, allPrefs, setAllPrefs }) {
  const [items, setItems] = useState([1, 2, 3]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      {Object.keys(allPrefs[prefType]).map((val, i) => (
        <SortableContext
          key={i}
          items={allPrefs[prefType][val]}
          strategy={horizontalListSortingStrategy}
        >
          <h1 style={{display: 'inline-block'}}>{getName(val)}</h1>
          {allPrefs[prefType][val].map((pref) => (
            <SortableItem key={pref + i} id={pref} show={getName(pref)}/>
          ))}
          <br />
        </SortableContext>
      ))}
    </DndContext>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}

export default Preference;
