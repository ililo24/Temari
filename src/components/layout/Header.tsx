import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-lg">
      <span className="font-label-lg text-label-lg text-on-surface">StudyPulse Workspace</span>
      <div className="flex items-center gap-space-md">
        <Link
          className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
          to="/settings"
        >
          Settings
        </Link>
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
