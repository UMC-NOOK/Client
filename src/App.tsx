// src/App.tsx
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
