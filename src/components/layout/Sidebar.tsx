import { NavLink } from "react-router-dom";

const NAV_LINKS: { to: string; label: string }[] = [
  { to: "/", label: "Dashboard" },
  { to: "/lessons", label: "Lessons" },
  { to: "/exams", label: "Exams & Past Papers" },
  { to: "/groups", label: "Study Groups & Collab" },
  { to: "/ai-study", label: "AI Study Assistant" },
  { to: "/settings", label: "Settings" }
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="h-16 px-space-md flex items-center gap-space-sm">
          <img
            alt="StudyPulse Brand Icon"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1Xf8n8ZQwr2bd4kDcOygHF0k3rRk6PuWRwZImRDeQP-un_XjwUFGpE0pri_Vk6w6tAUtmNS58vtA1JGYy6ImxRkopsG2R9fhZ0hQDv3dxegllMoAMw-RZP4XB-0oTwmQwIfPaMQr-DFhXCi50ywq8SPDMU6qeUXY0Rsz5dpfVpgqchTwpzbCU7PQ7ZF7NqGA-D9BPUdPmbcYtG71t66pw3-d9yn1fQk1T35zqJhIiFqqyUO_ja-q_aeC7ry"
          />
          <span className="font-headline-sm text-headline-sm text-primary tracking-tight">StudyPulse</span>
        </div>
        <nav className="px-space-sm py-space-md space-y-space-xs flex flex-col">
          {NAV_LINKS.map((link) => (
            <NavLink
              className={({ isActive }) =>
                `px-space-md py-space-sm rounded-lg font-label-lg text-label-lg transition-colors ${
                  isActive
                    ? "bg-primary-container text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                }`
              }
              end={link.to === "/"}
              key={link.to}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-space-md">
        <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface">Academic Term</span>
            <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
              Active
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Term 2 Finals Prep</p>
        </div>
      </div>
    </aside>
  );
}
