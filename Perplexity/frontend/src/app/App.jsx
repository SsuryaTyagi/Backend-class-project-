import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import { Toaster } from "react-hot-toast";

export default function App() {
  
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <RouterProvider router={router}/>
      <Toaster position="bottom-right"/>
    </div>
  );
}
