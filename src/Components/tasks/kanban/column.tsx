import { Text } from "@/Components/text";
import { PlusOutlined } from "@ant-design/icons";
import { useDroppable } from "@dnd-kit/core";
import { Badge, Button, Space } from "antd";
// import { title } from "process";
import React from "react";

const KanbanColumn = ({ children }: React.PropsWithChildren) => {
  const { isOver, setNodeRef, active } = useDroppable({
    id: "",
    data: "",
  });
  const count = 2;
  const descrition = "Description";
  const title = "Title";
  const onAddClickHandlee = () => {};
  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0 16px",
      }}
    >
      <div style={{ padding: "12px" }}>
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Space>
            <Text
              ellipsis={{ tooltip: title }}
              size="xs"
              strong
              style={{
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </Text>
            {!!count && <Badge count={count} color="cyan" />}
          </Space>
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            onClick={onAddClickHandlee}
          />
        </Space>
        {descrition}
      </div>
      <div
        style={{
          flex: 1,
          overflowY: active ? "unset" : "scroll",
          border: "2px dashed transparent",
          borderColor: isOver ? "#000040" : "transparent",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;
