import { useRoutes } from "react-router-dom";
// layouts
import Root from "./pages/core/Root";
import Login from "./pages/auth/Login";
// pages

import NotFound from "./pages/NotFound";
import AuthGuard from "./guards/AuthGuard";
import Dashboard from "./pages/dashboard/Dashboard";
// ----------------------------------------------------------------------

const Router = () => {
  const element = useRoutes([
    {
      element: (
        <AuthGuard>
          <Root />
        </AuthGuard>
      ),
      children: [
        { path: "/", element: <Dashboard /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "*", element: <NotFound /> },
  ]);

  return element;
};

export default Router;


