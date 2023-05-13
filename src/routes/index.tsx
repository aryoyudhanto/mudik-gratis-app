import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../pages";
import Home from "../pages/Home";
import Mudik from "../pages/Mudik";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/mudik",
    element: <Mudik />,
  },
]);

const index = () => {
  return <RouterProvider router={router} />;
};

export default index;
