import { useState } from "react";
import LoginPage from "./pages/auth/LoginPage";
import DashboardAdmin from "./pages/admin/DashboardAdmin";

function App() {
  const [sudahLogin, setSudahLogin] = useState(false);

  if (sudahLogin) {
    return <DashboardAdmin onLogout={() => setSudahLogin(false)} />;
  }

  return <LoginPage onLoginSuccess={() => setSudahLogin(true)} />;
}

export default App;