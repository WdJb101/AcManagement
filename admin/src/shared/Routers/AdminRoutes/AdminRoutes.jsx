import { createBrowserRouter } from "react-router-dom";
import Login from "../../../Dashboard/Login/Login";
import PopUp from "../../../feature/popup/PopUp";
import AdminLayout from "../../../feature/AdminLayout/AdminLayout";
import AdminOverview from "../../../feature/AdminOverView/AdminOverView";
import AdminContact from "../../../feature/AdminContact/AdminContact";
import AdminVoice from "../../../feature/AdminInvoice/AdminVoice";
import AdminPayment from "../../../feature/AdminPayment/AdminPayment";
import AdminSetting from "../../../feature/AdminSetting/AdminSetting";
import AdminiVoucher from "../../../feature/AdminVoucher/AdminiVoucher";
import AdminHelpCenter from "../../../feature/AdminHelpCenter/AdminHelpCenter";
import AdminLedger from "../../../feature/AdminLedger/containers/AdminLedger";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/overview",
        element: <AdminOverview />,
      },
      {
        path: "/admin/ledger",
        element: <AdminLedger></AdminLedger>,
      },
      {
        path: "/admin/AdminiVoucher",
        element: <AdminiVoucher />,
      },
      {
        path: "/admin/AdminPayment",
        element: <AdminPayment />,
      },
      {
        path: "/admin/AdminVoice",
        element: <AdminVoice />,
      },

      {
        path: "/admin/AdminSetting",
        element: <AdminSetting />,
      },
      {
        path: "/admin/AdminHelpCenter",
        element: <AdminHelpCenter />,
      },
      {
        path: "/admin/AdminContact",
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
