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
import Allcounsellors from "./pages/student/Allcounsellors";
import Helplines from "./pages/student/Helplines";
import Counsellorslots from "./pages/student/Counsellorslots";
import Forum from "./pages/student/Forum";


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
          <Route path="helplines" element={<Helplines/>}/>
          <Route path = "Allcounsellors" element = {<Allcounsellors/>}/>
          <Route path = "counsellors/:counsellorId" element = {<Counsellorslots/>}/>
          <Route path = "forum" element = {<Forum/>}/>
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
