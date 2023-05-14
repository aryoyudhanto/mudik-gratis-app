import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../pages";
import Home from "../pages/Home";
import Mudik from "../pages/Mudik";
import Verif from "../pages/VerifikasiTiket";

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
  {
    path: "/verif",
    element: <Verif />,
  },
]);

const index = () => {
  return <RouterProvider router={router} />;
};

export default index;
