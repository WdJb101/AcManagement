import { createBrowserRouter } from "react-router-dom";
import Login from "../../../feature/Login/Login";
import AdminLayout from "../../../feature/AdminLayout/AdminLayout";

import Overview from "../../../feature/OverView/OverView";
import Setting from "../../../feature/Setting/Setting";
import Invoice from "../../../feature/Invoice/Invoice";
import Voucher from "../../../feature/Voucher/Voucher";
import Payment from "../../../feature/Payment/Payment";
import Contact from "../../../feature/Contact/Contact";
import HelpCenter from "../../../feature/Help-center/HelpCenter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/overview",
        element: <Overview />,
      },
      {
        path: "/voucher",
        element: <Voucher />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/invoice",
        element: <Invoice />,
      },

      {
        path: "/setting",
        element: <Setting />,
      },
      {
        path: "/help-center",
        element: <HelpCenter />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);

export default router;
