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
          key={val}
          id={val + "," + prefType}
          items={allPrefs[prefType][val].map((elem, index) => {
            return elem + "," + val + "," + index;
          })}
          strategy={horizontalListSortingStrategy}
        >
          <h1 style={{ display: "inline-block" }}>{getName(val)}</h1>
          {allPrefs[prefType][val].map((pref, id) => (
            <SortableItem
              key={val + pref}
              id={pref + "," + val + "," + id}
              show={getName(pref)}
            />
          ))}
          <br />
        </SortableContext>
      ))}
    </DndContext>
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    const [chooser, type] = active.data.current.sortable.containerId.split(",");
    const oldIndex = active.id.split(",")[2];
    const newIndex = over.id.split(",")[2];
    if (active.id !== over.id) {
      setAllPrefs((allPrefs) => ({
        ...allPrefs,
        [type]: {
          ...allPrefs[type],
          [chooser]: arrayMove(allPrefs[type][chooser], oldIndex, newIndex),
        },
      }));
    }
  }
}

export default Preference;
