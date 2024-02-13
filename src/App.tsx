import {
  Authenticated,
  GitHubBanner,
  Refine,
  WelcomePage,
  useDataProvider,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { Create, useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { dataProvider, liveProvider } from "./Providers";
import { authProvider } from "./authProvider";
import { Home, ForgotPassword, Login, Register, CompanyList } from "./pages";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp, Layout } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { resource } from "./config/resources";
import Edit from "./pages/company/edit";
import List from "./pages/tasks/list";
import TasksCreatePage from "./pages/tasks/create";
import TasksEditPage from "./pages/tasks/edit";
import CreateTask from "./pages/tasks/create";
import EditTask from "./pages/tasks/edit";

function App() {
  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={resource}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "Yx0vNZ-rj1oEv-oDIkis",
                liveMode: "auto",
              }}
            >
              <Routes>
                {/* <Route index element={<WelcomePage />} /> */}
                {/* <Route index element={<Home />} /> */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />

                <Route
                  element={
                    <Authenticated
                      key="authenticated-layout"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route index element={<Home />} />
                  <Route path="/companies">
                    <Route index element={<CompanyList />} />
                    <Route path="new" element={<Create />} />
                    <Route path="edit/:id" element={<Edit />} />
                  </Route>
                  <Route
                    path="/tasks"
                    element={
                      <List>
                        <Outlet />
                      </List>
                    }
                  >
                    <Route path="new" element={<CreateTask />} />
                    <Route path="edit/:id" element={<EditTask />} />
                  </Route>
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
