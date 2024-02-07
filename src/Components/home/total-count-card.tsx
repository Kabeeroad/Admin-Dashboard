import { Card, Skeleton } from "antd";
import { totalCountVariants } from "../constants";
import { Text } from "../text";
import { Area, AreaConfig } from "@ant-design/plots";

type Props = {
  resource: "compnies" | "contracts" | "deals";
  isLoading: boolean;
  totalCount: number;
};

const DashboardTotalCountCard = ({
  resource,
  isLoading,
  totalCount,
}: Props) => {
  const { primaryColor, secondaryColor, icon, title } =
    totalCountVariants[resource];
  const config: AreaConfig = {
    data: totalCountVariants[resource].data,
    xField: "index",
    yField: "value",
    // appendPadding: [1, 0, 0, 0],

    padding: 0,
    syncViewPadding: true,
    autoFit: true,
    tooltip: false,
    animation: false,
    xAxis: false,
    yAxixs: {
      tickCount: 12,
    },
  };
  return (
    <Card
      style={{ height: "96px", padding: 0 }}
      bodyStyle={{ padding: "8px 8px 8px 12px" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          whiteSpace: "nowrap",
        }}
      >
        {icon}
        <Text size="md" className="secondary" style={{ marginLeft: "8px" }}>
          {title}
        </Text>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Text
          size="xxxl"
          strong
          style={{
            flex: 1,
            whiteSpace: "nowrap",
            flexShrink: 0,
            textAlign: "start",
            marginLeft: "48px",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {isLoading ? (
            <Skeleton.Button
              style={{
                marginTop: "8px",
                width: "74px",
              }}
            />
          ) : (
            totalCount
          )}
        </Text>
        <Area {...config} style={{ witdh: "50%" }} />
      </div>
    </Card>
  );
};

export default DashboardTotalCountCard;
