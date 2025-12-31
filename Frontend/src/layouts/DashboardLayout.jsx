import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const menu = {
    student: [
      { label: "Dashboard", path: "/student" },
      { label: "Resources", path: "/student/resources" },
      { label: "All Counsellors", path: "/student/Allcounsellors" },
      {label : "Helplines" , path : "/student/helplines"},
      {label : "Forum" , path : "/student/forum"}
    ],

    counsellor: [
      { label: "Dashboard", path: "/counsellor" },
      { label: "Upload Resources", path: "/counsellor/resources" },
      { label: "Availability", path: "/counsellor/slots" },
    ],

    admin: [
      { label: "Dashboard", path: "/admin" },
      { label: "Review Resources", path: "/admin/resources" },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* NAVBAR */}
      <header className="h-14 border-b bg-white flex items-center justify-between px-4">
        <h1 className="font-semibold text-lg">CampusWell</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            {user?.role?.toUpperCase()}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* SIDEBAR */}
        <div className="space-y-2 mt-3">
            {menu[user?.role]?.map((item) => (
            <Link key={item.path} to={item.path}>
                <Button variant="ghost" className="w-full justify-start">
                {item.label}
                </Button>
            </Link>
            ))}
        </div>
        <Separator orientation="vertical" className="mx-2" />

        {/* CONTENT */}
        <main className="flex-1 p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
