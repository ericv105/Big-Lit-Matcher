import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
        <Row>
        <SortableContext
          key={val}
          id={val + "," + prefType}
          items={allPrefs[prefType][val].map((elem, index) => {
            return elem + "," + val + "," + index;
          })}
          strategy={horizontalListSortingStrategy}
        >
          <Col xs="auto">
            <h4 style={{ display: "inline-block" }}>{getName(val)}:&nbsp;</h4>
          </Col>
          <Col>
          {allPrefs[prefType][val].map((pref, id) => (
            <SortableItem
              key={val + pref}
              id={pref + "," + val + "," + id}
              show={getName(pref)}
            />
          ))}
          </Col>
          <br />
        </SortableContext>
        </Row>
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
