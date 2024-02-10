import React from "react";
import CompanyList from "./list";
import { Avatar, Form, Modal, Select } from "antd";
import { useGo, useSelect } from "@refinedev/core";
import { useModalForm } from "@refinedev/antd";
import { CREATE_COMPANY_MUTATION } from "@/graphql/mutations";
import FormItem from "antd/es/form/FormItem";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import SelectOptionWithAvatar from "@/Components/select-option-with-avatar";
import { GetFields, GetFieldsFromList } from "@refinedev/nestjs-query";
import { UsersSelectQuery } from "@/graphql/types";

const Create = () => {
  const go = useGo();

  const goToListPage = () => {
    go({
      to: { resource: "companies", action: "list" },
      options: { keepQuery: true },
      type: "replace",
    });
  };
  const { formProps, modalProps } = useModalForm({
    action: "create",
    defaultVisible: true,
    resource: "companies",
    redirect: false,
    mutationMode: "pessimistic",
    onMutationSuccess: goToListPage,
    meta: {
      gqlMutation: CREATE_COMPANY_MUTATION,
    },
  });

  const { selectProps, queryResult } = useSelect<
    GetFieldsFromList<UsersSelectQuery>
  >({
    resource: "users",
    optionLabel: "name",
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });

  return (
    <CompanyList>
      <Modal
        {...modalProps}
        mask={true}
        onCancel={goToListPage}
        title="Create Company"
        width={512}
      >
        <Form {...formProps} layout="vertical">
          <Form.Item
            label="Company name"
            name="name"
            rules={[{ required: true }]}
          >
            <input placeholder="Please enter a company name" />
          </Form.Item>
          <Form.Item
            label="Sales owner"
            name="salesOwnerid"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Please select a sales owner"
              {...selectProps}
              options={
                queryResult.data?.data.map((user) => ({
                  values: user.id,
                  label: (
                    <SelectOptionWithAvatar
                      name={user.name}
                      avatarUrl={user.avatarUrl ?? undefined}
                    />
                  ),
                })) ?? []
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </CompanyList>
  );
};

export default Create;
