import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-background font-body-md text-body-md text-on-surface antialiased">
      <main className="w-full min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
