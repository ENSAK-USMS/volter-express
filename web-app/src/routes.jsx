import { useRoutes } from "react-router-dom";
// layouts
import Root from "./pages/core/Root";
import Login from "./pages/auth/Login";
// pages

import NotFound from "./pages/NotFound";
import AuthGuard from "./guards/AuthGuard";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/Home/Home";
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
        { path: "/admin", element: <Dashboard /> },
      ],
    },
    { path: "/login", element: <Login /> },
    
    { path: "/", element: <Root /> ,
      children: [
        { path: "/", element: <Home /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);

  return element;
};

export default Router;


