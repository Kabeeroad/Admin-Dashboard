import { KanbanColumnSkeleton, ProjectCardSkeleton } from "@/Components";
import { KanbanAddCardButton } from "@/Components/tasks/kanban/add-card-button";
import {
  kanbanBoardContainer,
  kanbanBoard,
} from "@/Components/tasks/kanban/board";
import ProjectCard, { ProjectCardMemo } from "@/Components/tasks/kanban/card";
import KanbanColumn from "@/Components/tasks/kanban/column";
import KanbanItem from "@/Components/tasks/kanban/item";
import { UPDATE_TASK_STAGE_MUTATION } from "@/graphql/mutations";
import { TASKS_QUERY, TASK_STAGES_QUERY } from "@/graphql/queries";
import { Task, TaskStage } from "@/graphql/schema.types";
import { TasksQuery } from "@/graphql/types";
import { Column } from "@ant-design/plots";
import { DragEndEvent } from "@dnd-kit/core";
import { useList, useUpdate } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import React from "react";

const List = ({ children }: React.PropsWithChildren) => {
  // hook
  const { data: stages, isLoading: isLoadingStages } = useList<TaskStage>({
    resource: "taskStages",
    filters: [
      {
        field: "title",
        operator: "in",
        value: ["TODO", "IN PROGRESS", "IN REVIEW", "DONE"],
      },
    ],
    sorters: [
      {
        field: "createdAt",
        order: "asc",
      },
    ],
    meta: {
      gqlQuery: TASK_STAGES_QUERY,
    },
  });
  //hook
  const { data: tasks, isLoading: isLoadingTasks } = useList<
    GetFieldsFromList<TasksQuery>
  >({
    resource: "tasks",
    sorters: [
      {
        field: "dueDate",
        order: "asc",
      },
    ],
    queryOptions: {
      enabled: !!stages,
    },
    pagination: {
      mode: "off",
    },
    meta: {
      gqlQuery: TASKS_QUERY,
    },
  });

  // hook
  const { mutate: updateTask } = useUpdate();

  const taskStages = React.useMemo(() => {
    if (!tasks?.data || !stages?.data) {
      return {
        unnasignedStage: [],
        stages: [],
      };
    }
    const unnasignedStage = tasks.data.filter((task) => task.stageId === null);
    const grouped: TaskStage[] = stages.data.map((stage) => ({
      ...stage,
      tasks: tasks.data.filter((task) => task.stageId?.toString() === stage.id),
    }));

    return {
      unnasignedStage,
      columns: grouped,
    };
  }, [stages, tasks]);

  const handleAddCard = (args: { stageId: string }) => {};

  const handleOnDragEnd = (event: DragEndEvent) => {
    let stageId = event.over?.id as undefined | string | null;
    const taskid = event.active.id as string;
    const taskStagesId = event.active.data.current?.stageId;

    if (taskStagesId === stageId) return;
    if (stageId === "unnassigned") {
      stageId = null;
    }
    updateTask({
      resource: " tasks",
      id: taskid,
      values: {
        stageId: stageId,
      },
      successNotification: false,
      mutationMode: "optimistic",
      meta: {
        gqlMutation: UPDATE_TASK_STAGE_MUTATION,
      },
    });
  };

  const isLoading = isLoadingStages || isLoadingTasks;
  if (isLoading) return <PageSkeleton />;
  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard handleOnDragEnd>
          <KanbanColumn
            id="unnasigned"
            title={"unnasigned"}
            count={taskStages.unnasignedStage.length || 0}
            onAddClick={() => handleAddCard({ stageId: "unnasigned" })}
          >
            {taskStages.unnasignedStage.map((task) => (
              <KanbanItem
                key={task.id}
                id={task.id}
                data={{ ...task, stagesId: "unnasigned" }}
              >
                <ProjectCardMemo
                  {...task}
                  dueDate={task.dueDate || undefined}
                />
              </KanbanItem>
            ))}
            {!taskStages.unnasignedStage.length && (
              <KanbanAddCardButton
                onClick={() => handleAddCard({ stageId: "unnasigned" })}
              />
            )}
          </KanbanColumn>
          {taskStages.columns?.map((Column) => (
            <KanbanColumn
              key={Column.id}
              id={Column.id}
              title={Column.id}
              count={Column.tasks.length}
              onAddClick={() => handleAddCard({ stageId: Column.id })}
            >
              {!isLoading &&
                Column.tasks.map((tasks) => (
                  <KanbanItem key={tasks.id} id={tasks.id} data={tasks}>
                    <ProjectCardMemo
                      {...tasks}
                      dueDate={tasks.dueDate || undefined}
                    />
                  </KanbanItem>
                ))}
              {!Column.tasks.length && (
                <KanbanAddCardButton
                  onClick={() => handleAddCard({ stageId: Column.id })}
                />
              )}
            </KanbanColumn>
          ))}
        </KanbanBoard>
      </KanbanBoardContainer>
    </>
  );
};

export default List;

const PageSkeleton = () => {
  const columnCount = 6;
  const itemCount = 4;
  return (
    <kanbanBoardContainer>
      {Array.from({ length: columnCount }).map((_, index) => (
        <KanbanColumnSkeleton key={index}>
          {Array.from({ length: itemCount }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </KanbanColumnSkeleton>
      ))}
    </kanbanBoardContainer>
  );
};
