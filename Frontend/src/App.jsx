import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Outlet } from "react-router-dom";

import Login from "./pages/auth/login";
import Unauthorized from "./pages/Unauthorized";

import StudentDashboard from "./pages/student/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import CounsellorDashboard from "./pages/counsellor/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import StudentResources from "./pages/student/Resource";
import StudentBookings from "./pages/student/Bookings";
import Helplines from "./pages/student/Helplines";

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
              <Outlet />
            </DashboardLayout>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="resources" element={<StudentResources />} />
          <Route path="bookings" element={<StudentBookings />} />
          <Route path="helplines" element={<Helplines/>}/>
        </Route>
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
