"use client";

import { useEffect, useState, type ReactNode } from "react";

export function ScrollHeader({ children }: { children: ReactNode }) {
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    const update = () => setFloating(window.scrollY > 160);
    const initialFrame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div className="header-slot" id="beranda">
      <header className={`site-header${floating ? " is-floating" : ""}`}>
        {children}
      </header>
    </div>
  );
}
