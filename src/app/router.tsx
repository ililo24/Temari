import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import Dashboard from "../pages/dashboard";
import Lessons from "../pages/lessons";
import Exams from "../pages/exams";
import Groups from "../pages/group";
import AiStudy from "../pages/aiStudy";
import Settings from "../pages/settings";
import Landing from "../pages/landing";
import Login from "../pages/login";
import Signup from "../pages/signup";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public / auth pages: Landing, Login, Signup */}
      <Route element={<AuthLayout />}>
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Authenticated workspace pages behind the shared App layout */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/ai-study" element={<AiStudy />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/landing" replace />} />
    </Routes>
  );
}
