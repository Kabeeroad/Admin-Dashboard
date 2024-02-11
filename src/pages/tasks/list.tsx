import {
  kanbanBoardContainer,
  kanbanBoard,
} from "@/Components/tasks/kanban/board";
import KanbanColumn from "@/Components/tasks/kanban/column";
import KanbanItem from "@/Components/tasks/kanban/item";

const List = () => {
  return (
    <>
      <kanbanBoardContainer>
        <kanbanBoard>
          <KanbanColumn>
            <KanbanItem></KanbanItem>
          </KanbanColumn>
          <KanbanColumn></KanbanColumn>
        </kanbanBoard>
      </kanbanBoardContainer>
    </>
  );
};

export default List;
