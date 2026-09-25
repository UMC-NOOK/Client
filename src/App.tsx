// src/App.tsx
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppRoutes from "./app/AppRoutes";
import { useEffect } from "react";
import { trackBottomBannerVisit } from "./pages/library/utils/bottomBannerState";

const router = createBrowserRouter([
  {
    path: "*",
    element: <AppRoutes />,
  },
]);

export default function App() {
  useEffect(trackBottomBannerVisit, []);

  return <RouterProvider router={router} />;
}
