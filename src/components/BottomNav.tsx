import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="fixed bottom-0 w-full z-50 rounded-t-[3rem] bg-[#fcf9f4]/80 dark:bg-[#1c1c19]/80 backdrop-blur-2xl md:hidden shadow-[0_-8px_32px_rgba(114,85,61,0.06)]">
      <div className="flex justify-around items-center pt-3 pb-8 px-8">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center rounded-full px-6 py-2 transition-transform active:scale-90 duration-300 ease-out ${isHome ? "bg-[#72553d] text-white dark:bg-[#E8C9A0] dark:text-[#1c1c19]" : "text-[#72553d]/50 dark:text-[#E8C9A0]/50 hover:text-[#72553d] dark:hover:text-[#E8C9A0]"}`}
        >
          <span className="material-symbols-outlined">auto_stories</span>
          <span className="font-sans text-[10px] uppercase tracking-widest font-bold mt-1">
            Home
          </span>
        </Link>
        <a
          href="#"
          className="flex flex-col items-center justify-center text-[#72553d]/50 dark:text-[#E8C9A0]/50 hover:text-[#72553d] dark:hover:text-[#E8C9A0] transition-colors active:scale-90 duration-300 ease-out"
        >
          <span className="material-symbols-outlined">history_edu</span>
          <span className="font-sans text-[10px] uppercase tracking-widest font-bold mt-1">
            History
          </span>
        </a>
        <a
          href="#"
          className="flex flex-col items-center justify-center text-[#72553d]/50 dark:text-[#E8C9A0]/50 hover:text-[#72553d] dark:hover:text-[#E8C9A0] transition-colors active:scale-90 duration-300 ease-out"
        >
          <span className="material-symbols-outlined">person_pin</span>
          <span className="font-sans text-[10px] uppercase tracking-widest font-bold mt-1">
            Profile
          </span>
        </a>
      </div>
    </nav>
  );
}
