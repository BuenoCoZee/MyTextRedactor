import { createRoot } from "react-dom/client";
import { AuthProvider } from "./app/providers/AuthContext.tsx";
import "./app/styles/main.css";
import App from "./app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
