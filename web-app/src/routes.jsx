import { useRoutes } from "react-router-dom";
// layouts
import Root from "./pages/core/Root";
import RootDashboard from "./pages/core/RootDashboard";
import Login from "./pages/auth/Login";
import Singup from "./pages/auth/Signup";
import ClientDashboard from './components/ClientDashboard'
import Contact from './components/Contact'
import ShipTrack from './components/Shiptrack'
import AboutUs from './components/AboutUs'
import Analytics from './components/Analytics'
import Products from './components/Products'
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
        //<AuthGuard>
        //  <Root />
          <RootDashboard />
          
        //</AuthGuard>
      ),
      children: [
        { path: "/admin", element: <Dashboard /> },
      ],
    },
    
    { path: "/", element: <Root /> ,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Singup />},
      { path: "/clientDashboard", element: <ClientDashboard />},
      { path: "/Contact", element: <Contact />},
      { path: "/shipTrack", element: <ShipTrack />},
      { path: "/products", element: <Products />},
      { path: "/aboutus", element: <AboutUs />},
      { path: "/analytics", element: <Analytics />},
      
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);

  return element;
};

export default Router;


