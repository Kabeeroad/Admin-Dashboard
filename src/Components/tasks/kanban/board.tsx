import { DndContext } from "@dnd-kit/core";
import React, { Children } from "react";

export const kanbanBoardContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div style={{}}>
      <div style={{}}>{children}</div>
    </div>
  );
};
export const kanbanBoard = ({ children }: React.PropsWithChildren) => {
  return <DndContext>{Children}</DndContext>;
};
