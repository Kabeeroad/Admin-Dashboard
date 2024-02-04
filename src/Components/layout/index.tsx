import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import Header from "./Header";
import { GitHubBanner } from "@refinedev/core";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <GitHubBanner />
      <ThemedLayoutV2
        Header={Header}
        Title={(titleProps) => {
          return <ThemedTitleV2 {...titleProps} text="Refine" />;
        }}
      >
        {children}
      </ThemedLayoutV2>
    </>
  );
};

export default Layout;
