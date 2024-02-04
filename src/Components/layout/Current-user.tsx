import { Popover, Button } from "antd";
import CustomAvatar from "../custome-avatar";
import { useGetIdentity } from "@refinedev/core";

const CurrentUser = () => {
  const CurrentUser = ()=>{
    const {data: user} = useGetIdentity()
  }
  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 999 }}
      >
        <CustomAvatar />
      </Popover>
    </>
  );
};

export default CurrentUser;
