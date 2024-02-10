import CustomAvatar from "@/Components/custome-avatar";
import { Text } from "@/Components/text";
import { COMPANIES_LIST_QUERY } from "@/graphql/queries";
import { Company } from "@/graphql/schema.types";
import { currencyNumber } from "@/utilities";
import { SearchOutlined } from "@ant-design/icons";
import { CreateButton, FilterDropdown, List } from "@refinedev/antd";
import { getDefaultFilter, useGo, useTable } from "@refinedev/core";
import { Input, Space, Table } from "antd";
import React from "react";

export const CompanyList = () => {
  const go = useGo();
  const { tableProps, filters } = useTable({
    resource: "companies",
    pagination: {
      pageSize: 12,
    },
    meta: {
      gqlQuery: COMPANIES_LIST_QUERY,
    },
  });
  return (
    <List
      breadcrumb={false}
      headerButtons={() => (
        <CreateButton
          onClick={() => {
            go({
              to: {
                resource: "companies",
                action: "create",
              },
              options: {
                keepQuery: true,
              },
              type: "replace",
            });
          }}
        />
      )}
    >
      <Table.Column
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
        }}
      >
        <Table.Column<Company>
          dataIndex="index"
          title="Company Title"
          defaultFilteredValue={getDefaultFilter("id", filters)}
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="search Company" />
            </FilterDropdown>
          )}
          render={(values, record) => (
            <Space>
              <CustomAvatar
                shape="square"
                name={record.name}
                src={record.avatarUrl}
              />
              <Text style={{ whiteSpace: "nowrap" }}>{record.name}</Text>
            </Space>
          )}
        />

        <Table.Column<Company>
          dataIndex="totalRevenue"
          title="Open deals amount"
          render={(value, Company) => (
            <Text>
              {currencyNumber(Company?.dealsAggregate?.[0].sum?.value || 0)}
            </Text>
          )}
        />
      </Table.Column>
    </List>
  );
};
