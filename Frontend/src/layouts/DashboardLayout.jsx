import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menu = {
    student: [
      { label: "Dashboard", path: "/student" },
      { label: "Resources", path: "/student/resources" },
      { label: "All Counsellors", path: "/student/Allcounsellors" },
      { label: "Helplines", path: "/student/helplines" },
      { label: "Forum", path: "/student/forum" },
      {label : "Screening" , path: "/student/Screening"}
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-50 text-slate-800">

      {/* NAVBAR */}
      <header className="h-16 border-b bg-white flex items-center justify-between px-6 shadow-sm">
        <h1 className="font-semibold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-400">
          CampusWell
        </h1>

        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-600 px-3 py-1 rounded-md bg-slate-100">
            {user?.role?.toUpperCase()}
          </span>

          <Button
            variant="outline"
            className="bg-gradient-to-r from-indigo-600 to-teal-400 text-white border-0"
            onClick={logout}
          >
            Logout
          </Button>

          {/* mobile toggle */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            Menu
          </Button>
        </div>
      </header>

      <div className="flex flex-1">

        {/* SIDEBAR */}
        <aside
          className={`${
            open ? "block" : "hidden md:block"
          } w-60 p-4 mt-4 ml-4 rounded-2xl bg-white shadow-sm`}
        >
          <nav className="space-y-1">
            {menu[user?.role]?.map((item) => {
              const active = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    className={`
                      w-full justify-start text-left
                      ${active
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "hover:bg-slate-100"}
                    `}
                  >
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </aside>

        <Separator orientation="vertical" className="mx-2 hidden md:block" />

        {/* CONTENT */}
        <main className="flex-1 p-6 pr-8">
          <div className="w-full">
            {children || <Outlet />}
          </div>
        </main>

      </div>
    </div>
  );
}
