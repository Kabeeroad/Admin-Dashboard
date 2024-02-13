import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor } from "@dnd-kit/core";
// import { Props } from "@dnd-kit/core/dist/components/DndContext/DndContext";
import React, { Children } from "react";

export const kanbanBoardContainer = ({ children }: React.
  PropsWithChildren) => {

  return (
    <div
      style={{
        width: "calc(100% + 64px)",
        height: "calc(100% - 64px)",
        display: "flex",
        justifyContent: "column",
        margin: "-32px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "32px",
          overflow: "scroll",
        }}
      >
        {children}
      </div>
    </div>
  );
};

type Props = {
  onDragEnd: (event: DragEndEvent) => void;
};

export const kanbanBoard = ({ children onDragEnd}: React.
  PropsWithChildren<Props>) => {

    const mouseSensor = useSensor(MouseSensor,{
      activationConstraint: {
        distance: 5,
      }
      

    })

    const touchSensor = useSensor(TouchSensor,{
      activationConstraint:{
        distance: 5
      }
    })

    const sensors = useSensor(mouseSensor, touchSensor)
  return (
    <DndContext onDragEnd={onDragEnd} sensors={sensors}>
      {children}
    </DndContext>
  )
};
