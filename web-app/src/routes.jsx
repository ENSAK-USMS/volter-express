import { useRoutes } from "react-router-dom";
// layouts
import Root from "./pages/core/Root";
import RootDashboard from "./pages/core/RootDashboard";
import Login from "./pages/auth/Login";
import Login2 from "./pages/auth/Login2";
import Singup from "./pages/auth/Signup";
import ClientDashboard from './components/ClientDashboard'
import Contact from './components/Contact'
import ShipTrack from './components/Shiptrack'
import AboutUs from './components/AboutUs'
import Analytics from './components/Analytics'
import Products from './components/Products'
import Customer from './components/Customer'
import Order from './components/Order'
import Truck from './components/Truck'
import Faqs from './components/Faqs'
// pages

import NotFound from "./pages/NotFound";
import AuthGuard from "./guards/AuthGuard";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/Home/Home";
// ----------------------------------------------------------------------

const Router = () => {
  const element = useRoutes([
    {
      path: "/admin",
      element: (
        //<AuthGuard>
        //  <Root />
        <RootDashboard />

        //</AuthGuard>
      ),
      children: [
        { path: "dashboard", element: <ClientDashboard /> },
        { path: "order", element: <Order /> },
        { path: "customer", element: <Customer /> },
        { path: "truck", element: <Truck /> },
      ],
    },
    { path: "admin/login", element: <Login2 /> },

    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Singup /> },
        { path: "/clientDashboard", element: <ClientDashboard /> },
        { path: "/Contact", element: <Contact /> },
        { path: "/shipTrack", element: <ShipTrack /> },
        { path: "/products", element: <Products /> },
        { path: "/aboutus", element: <AboutUs /> },
        { path: "/analytics", element: <Analytics /> },
        { path: "/faqs", element: <Faqs /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);

  return element;
};

export default Router;


