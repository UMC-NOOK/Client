// src/App.tsx
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app/AppRoutes";
import { useEffect } from "react";
import { trackBottomBannerVisit } from "./pages/library/utils/bottomBannerState";

export default function App() {
  useEffect(trackBottomBannerVisit, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
