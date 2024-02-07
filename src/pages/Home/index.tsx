import {
  DashboardTotalCountCard,
  DealsChart,
  UpcomingEvents,
} from "@/Components";
import { DASHBOARD_TOTAL_COUNTS_QUERY } from "@/graphql/queries";
import { useCustom } from "@refinedev/core";
import { Col, Row } from "antd";

export const Home = () => {
  const { data, isLoading } = useCustom({
    url: "",
    method: "get",
    meta: {
      gqlQuery: DASHBOARD_TOTAL_COUNTS_QUERY,
    },
  });
  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            resource="compnies"
            isLoading={isLoading}
            totalCunt={data?.data.compnies.totalCunt}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            resource=" contracts"
            isloading={isLoading}
            totalCount={data?.data.contracts.totalCount}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            resource="deals"
            isloading={isLoading}
            totalCount={data?.data.deals.totalCount}
          />
        </Col>
      </Row>

      <Row
        gutter={[32, 32]}
        style={{
          marginTop: "32px",
        }}
      >
        <Col
          xs={24}
          sm={24}
          xl={8}
          style={{
            height: "460px",
          }}
        >
          <UpcomingEvents />
        </Col>
        <Col
          xs={24}
          sm={24}
          xl={16}
          style={{
            height: "460px",
          }}
        >
          <DealsChart />
        </Col>
      </Row>
    </div>
  );
};
