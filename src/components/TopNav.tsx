import { Link } from "react-router-dom";
import { useState } from "react";

export default function TopNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#fcf9f4]/40 dark:bg-[#1c1c19]/40 backdrop-blur-xl">
        <div className="flex justify-between items-center px-6 py-4 max-w-screen-xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#72553d] dark:text-[#E8C9A0]">
              auto_awesome
            </span>
            <span className="text-2xl font-headline italic tracking-tight text-[#72553d] dark:text-[#E8C9A0]">
              Your Pet Fate
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-[#72553d] dark:text-[#E8C9A0] font-bold text-xs uppercase tracking-widest hover:opacity-80 transition-opacity"
            >
              Home
            </Link>
            <a
              href="#"
              className="text-[#72553d]/60 dark:text-[#E8C9A0]/60 font-bold text-xs uppercase tracking-widest hover:opacity-80 transition-opacity"
            >
              History
            </a>
            <a
              href="#"
              className="text-[#72553d]/60 dark:text-[#E8C9A0]/60 font-bold text-xs uppercase tracking-widest hover:opacity-80 transition-opacity"
            >
              Profile
            </a>
          </div>
          {/* Desktop profile */}
          <div className="hidden md:block w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border-2 border-primary-fixed">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3lgJP6NL2J8abLjg0tZ9dbxV4o_iebcVQwn1gDH7XCwkRYqVfH0-r33Ka3gxFu8jjVGuMejlRLC04M_6lXmQ2sfdyro4XsCLcrfR7Uq3AKoHiv7ol1ambQEQzsKePe3xbUVMv6h9UfYTM8ZofTl0FdfnryOaDQ9ypqt8WFcVtOeuOujtU35OWuJ2jZFaiaH7mKBcufrLRWKxDhyQC5I5S7wQKlbkQEMx_0as4qn_xXewopdJOjZxcFlYvJ5QMCxrKpEeD97u-rwQ"
              alt="Profile"
            />
          </div>
          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-low transition-colors"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[#72553d]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile slide-out menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        {/* Menu panel */}
        <div
          className={`absolute top-0 right-0 w-72 h-full bg-surface-container-lowest shadow-2xl transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 pt-20">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#72553d] font-bold text-sm uppercase tracking-widest py-4 px-4 hover:bg-surface-container-low rounded-lg transition-colors"
              >
                Home
              </Link>
              <a
                href="#"
                className="text-[#72553d]/60 font-bold text-sm uppercase tracking-widest py-4 px-4 hover:bg-surface-container-low rounded-lg transition-colors"
              >
                History
              </a>
              <a
                href="#"
                className="text-[#72553d]/60 font-bold text-sm uppercase tracking-widest py-4 px-4 hover:bg-surface-container-low rounded-lg transition-colors"
              >
                Profile
              </a>
            </div>
            <div className="mt-8 pt-8 border-t border-outline-variant">
              <div className="flex items-center gap-4 px-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-high overflow-hidden border-2 border-primary-fixed">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3lgJP6NL2J8abLjg0tZ9dbxV4o_iebcVQwn1gDH7XCwkRYqVfH0-r33Ka3gxFu8jjVGuMejlRLC04M_6lXmQ2sfdyro4XsCLcrfR7Uq3AKoHiv7ol1ambQEQzsKePe3xbUVMv6h9UfYTM8ZofTl0FdfnryOaDQ9ypqt8WFcVtOeuOujtU35OWuJ2jZFaiaH7mKBcufrLRWKxDhyQC5I5S7wQKlbkQEMx_0as4qn_xXewopdJOjZxcFlYvJ5QMCxrKpEeD97u-rwQ"
                    alt="Profile"
                  />
                </div>
                <div>
                  <p className="font-bold text-sm text-on-surface">Guest User</p>
                  <p className="text-xs text-on-surface-variant">View Profile</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
