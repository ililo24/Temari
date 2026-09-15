import { Outlet } from "react-router-dom";
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background font-body-md text-body-md text-on-surface antialiased">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="pt-16 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
