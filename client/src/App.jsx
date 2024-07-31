import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Shared/Routers/Routers";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
