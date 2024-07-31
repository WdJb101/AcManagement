import { createBrowserRouter } from "react-router-dom";
import Login from "../../../feature/Login/Login";
import AdminLayout from "../../../feature/AdminLayout/AdminLayout";
import AdminOverview from "../../../feature/AdminOverView/AdminOverView";
import AdminContact from "../../../feature/AdminContact/AdminContact";
import AdminVoice from "../../../feature/AdminInvoice/AdminVoice";
import AdminPayment from "../../../feature/AdminPayment/AdminPayment";
import AdminSetting from "../../../feature/AdminSetting/AdminSetting";
import AdminiVoucher from "../../../feature/AdminVoucher/AdminiVoucher";
import AdminHelpCenter from "../../../feature/AdminHelpCenter/AdminHelpCenter";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/overview",
        element: <AdminOverview />,
      },
      {
        path: "/voucher",
        element: <AdminiVoucher />,
      },
      {
        path: "/payment",
        element: <AdminPayment />,
      },
      {
        path: "/invoice",
        element: <AdminVoice />,
      },

      {
        path: "/setting",
        element: <AdminSetting />,
      },
      {
        path: "/help-center",
        element: <AdminHelpCenter />,
      },
      {
        path: "/contact",
        element: <AdminContact />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);

export default router;
