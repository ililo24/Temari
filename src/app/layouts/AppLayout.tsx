import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";
import { supabase } from "../../lib/supabase";

export default function AppLayout() {
  // undefined = still checking, null = signed out.
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Don't redirect while still checking: the session can arrive late after
  // an OAuth redirect.
  if (session === undefined) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="font-body-md text-body-md text-on-surface-variant">Loading...</span>
      </div>
    );
  }

  if (session === null) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

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
