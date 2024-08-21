
import { RouterProvider } from "react-router-dom";
import router from "./shared/Routers/AdminRoutes/AdminRoutes";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
