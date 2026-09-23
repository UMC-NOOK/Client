// src/App.tsx
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppRoutes from "./app/AppRoutes";

const router = createBrowserRouter([
  {
    path: "*",
    element: <AppRoutes />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
