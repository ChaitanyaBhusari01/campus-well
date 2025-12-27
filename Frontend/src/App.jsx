import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/auth/login";
import Unauthorized from "./pages/Unauthorized";

import StudentDashboard from "./pages/student/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import CounsellorDashboard from "./pages/counsellor/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Student */}
      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
        <Route
          path="/student/*"
          element={
            <DashboardLayout>
              <StudentDashboard />
            </DashboardLayout>
          }
        />
      </Route>

      {/* Counsellor */}
      <Route element={<ProtectedRoute allowedRoles={["counsellor"]} />}>
        <Route
          path="/counsellor/*"
          element={
            <DashboardLayout>
              <CounsellorDashboard />
            </DashboardLayout>
          }
        />
      </Route>

      {/* Admin */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route
          path="/admin/*"
          element={
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
