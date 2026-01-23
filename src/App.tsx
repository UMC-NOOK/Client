import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppShell from "./app/AppShell";
import AppRoutes from "./app/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <AppRoutes />
      </AppShell>
    </BrowserRouter>
  );
}
