import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function Header() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    await supabase.auth.signOut();
    setProfileOpen(false);
    setLoggingOut(false);
    // AppLayout's guard also reacts to SIGNED_OUT via onAuthStateChange;
    // this explicit navigation just makes the redirect immediate.
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-lg">
      <div className="flex items-center gap-space-sm">
        <div className="flex items-center bg-surface-container-low px-space-md py-space-xs rounded-lg gap-space-xs text-on-surface-variant w-72">
          <span className="material-symbols-outlined text-[18px]">search</span>
          <input
            className="bg-transparent text-body-sm font-body-sm text-on-surface outline-none placeholder:text-outline w-full"
            placeholder="Search topics, questions, past papers..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-space-md">
        <div className="hidden md:flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container text-on-primary-fixed font-label-md text-label-md">
          <span className="text-base leading-none">🔥</span>
          <span>14-day streak</span>
        </div>

        <div className="hidden lg:flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md">
          <span className="text-base leading-none">⚡</span>
          <span>Midterm in 12 days</span>
        </div>

        <button className="relative p-space-xs rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
        </button>

        <div className="h-6 w-px bg-outline-variant" />

        <div className="relative" ref={profileRef}>
          <button
            className="flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg hover:bg-surface-container-low transition-colors text-left focus:outline-none"
            onClick={() => setProfileOpen((o) => !o)}
            type="button"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1L8WFo-mBDL9i-zWMDD7A3FwtonEsEz2nPorHrxciq8JruCbrL61YLWAGGdHkIXcgXdNR6LQBQduxbsNKBzncu8LZVj6DbL-ztN_WG_AWmdEGvByBQmy70DvdC-fAXfDxIBLoKxsBRH17DbTIOjDnzysFjbGpK1L2AwpyXM8Mgsf93OZwAVfft6PVxgYhrFx9dsEb7MXzBtUr2o2kablt0h_4MtLSiXwv8OVO45GC9XicOXgod4ZRKA"
            />
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface leading-tight">Amina K.</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">(Grade 11)</span>
            </div>
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">expand_more</span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-surface-container-lowest shadow-xl z-50 p-space-xs">
              <div className="px-space-sm py-1 font-label-sm text-outline uppercase tracking-wider">
                Student Account
              </div>
              <Link
                className="w-full flex items-center gap-2 px-space-sm py-2 rounded-lg hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors"
                onClick={() => setProfileOpen(false)}
                to="/settings"
              >
                <span className="material-symbols-outlined text-[18px]">settings</span>
                <span>Account Settings</span>
              </Link>
              <Link
                className="w-full flex items-center gap-2 px-space-sm py-2 rounded-lg hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors"
                onClick={() => setProfileOpen(false)}
                to="/landing"
              >
                <span className="material-symbols-outlined text-[18px]">public</span>
                <span>Back to Landing</span>
              </Link>
              <div className="h-px bg-surface-container my-1" />
              <button
                className="w-full flex items-center gap-2 px-space-sm py-2 rounded-lg hover:bg-error-container text-error font-label-md text-label-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loggingOut}
                onClick={handleLogout}
                type="button"
              >
                <span className={`material-symbols-outlined text-[18px] ${loggingOut ? "animate-spin" : ""}`}>
                  {loggingOut ? "progress_activity" : "logout"}
                </span>
                <span>{loggingOut ? "Signing out..." : "Log Out"}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
