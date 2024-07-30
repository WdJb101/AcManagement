import { createBrowserRouter } from "react-router-dom";
import Login from "../../Dashboard/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    children: [
      //   {
      //     path: `/`,
      //     element: <Home />,
      //   },
    ],
  },
]);

export default router;
