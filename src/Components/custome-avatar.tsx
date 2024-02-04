import { Avatar as AntdAvatar, AvatarProps } from "antd";

type props = AvatarProps & {
  name?: string;
};
const CustomAvatar = ({ name, style, ...rest }: props) => {
  return;

  <AntdAvatar
    alt={name}
    size="small"
    style={{
      backgroundColor: "blue",
      display: "flex",
      alignItems: "center",
      border: "none",
      ...style,
    }}
    // {...rest}
  >
    {name}
  </AntdAvatar>;
};

export default CustomAvatar;
