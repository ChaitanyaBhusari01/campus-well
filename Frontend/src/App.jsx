import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Outlet } from "react-router-dom";

import Landing from "./pages/Landing"
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/login";
import Unauthorized from "./pages/Unauthorized";

import AdminDashboard from "./pages/admin/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

import StudentDashboard from "./pages/student/Dashboard";
import StudentResources from "./pages/student/Resource";
import Allcounsellors from "./pages/student/Allcounsellors";
import Helplines from "./pages/student/Helplines";
import Counsellorslots from "./pages/student/Counsellorslots";
import Forum from "./pages/student/Forum";
import Screening from "./pages/student/Screening";

import CounsellorDashboard from "./pages/counsellor/Dashboard";
import Sessions from "./pages/counsellor/sessions";
import Addresource from "./pages/counsellor/Addresource"


function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path = "/" element = {<Landing/>}/>
      <Route path = "/signup" element = {<Signup/>}/>
      <Route path="/login" element={<Login />} />
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
          <Route path = "Screening" element = {<Screening/>}/>
        </Route>
      </Route>

      {/* Counsellor */}
      <Route element={<ProtectedRoute allowedRoles={["counsellor"]} />}>
        <Route
          path="/counsellor/*"
          element={
            <DashboardLayout>
              <Outlet/>
            </DashboardLayout>
          }
        >
          <Route index element={<CounsellorDashboard/>}/>
          <Route path="sessions" element = {<Sessions/>}/>
          <Route path = "Addresource" element = {<Addresource/>}/>
        </Route>
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
        >
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
