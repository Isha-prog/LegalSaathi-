import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useCase } from "../context/CaseContext";

export default function AppLayout() {
  const { user } = useCase();

  // Route guard — in the connected-backend version this will check a real
  // session/token instead of local mock state.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="content page-fade">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
