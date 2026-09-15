import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-lg">
      <span className="font-label-lg text-label-lg text-on-surface">StudyPulse Workspace</span>
      <div className="flex items-center gap-space-md">
        <NavLink
          className={({ isActive }) =>
            `font-label-md text-label-md transition-colors ${
              isActive ? "text-primary font-semibold" : "text-on-surface-variant hover:text-on-surface"
            }`
          }
          end
          to="/settings"
        >
          Settings
        </NavLink>
        <div className="h-6 w-px bg-outline-variant" />
        <Link
          className="font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors"
          to="/landing"
        >
          Exit to Landing
        </Link>
      </div>
    </header>
  );
}
