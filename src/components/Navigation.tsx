import React, { useLayoutEffect, useRef, useState } from 'react';
import { Home, Trophy, Target, Globe, Info } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'toppers', label: 'Toppers', icon: Trophy },
  { id: 'oqad', label: 'O.Q.A.D', icon: Target },
  { id: 'abroad', label: 'MBBS Abroad', icon: Globe },
  { id: 'about', label: 'About Us', icon: Info },
];

interface DesktopNavProps {
  theme: 'dark' | 'light';
  activeId: string;
  onSelect: (id: string) => void;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({
  theme,
  activeId,
  onSelect,
}) => {
  const isDark = theme === 'dark';
  const navRef = useRef<HTMLElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [highlight, setHighlight] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const measure = () => {
      const nav = navRef.current;
      const activeButton = buttonRefs.current[activeId];
      if (!nav || !activeButton) return;

      const navRect = nav.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      setHighlight({
        x: buttonRect.left - navRect.left,
        y: buttonRect.top - navRect.top,
        width: buttonRect.width,
        height: buttonRect.height,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (navRef.current) observer.observe(navRef.current);
    Object.values(buttonRefs.current).forEach((button) => {
      if (button) observer.observe(button);
    });
    window.addEventListener('resize', measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [activeId]);

  return (
    <nav
      ref={navRef}
      className="relative isolate hidden items-center gap-1.5 md:flex lg:gap-2.5"
    >
      <span
        aria-hidden="true"
        className={`desktop-nav-highlight ${
          isDark
            ? 'desktop-nav-highlight--dark'
            : 'desktop-nav-highlight--light'
        }`}
        style={{
          width: highlight.width,
          height: highlight.height,
          transform: `translate3d(${highlight.x}px, ${highlight.y}px, 0)`,
        }}
      />
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeId === item.id;

        return (
          <button
            key={item.id}
            ref={(node) => {
              buttonRefs.current[item.id] = node;
            }}
            onClick={() => onSelect(item.id)}
            className={`desktop-nav-button relative z-10 flex min-w-[62px] cursor-pointer select-none flex-col items-center justify-center whitespace-nowrap rounded-xl px-3.5 py-1.5 font-mono text-xs font-bold tracking-tight ${
              isActive
                ? isDark
                  ? 'text-[#CCFF00]'
                  : 'text-[#0066FF]'
                : isDark
                ? 'text-zinc-300 hover:bg-zinc-900/40 hover:text-white'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
            title={item.label}
          >
            <Icon
              className={`mb-0.5 h-4 w-4 ${
                isActive
                  ? isDark
                    ? 'text-[#CCFF00]'
                    : 'text-[#0066FF]'
                  : ''
              }`}
              strokeWidth={2.4}
            />
            <span className="leading-tight font-extrabold tracking-tight">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

interface MobileBottomNavProps {
  theme: 'dark' | 'light';
  activeId: string;
  onSelect: (id: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  theme,
  activeId,
  onSelect,
}) => {
  const isDark = theme === 'dark';

  return (
    <nav
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-lg transition-colors px-2 py-1.5 safe-area-pb ${
        isDark
          ? 'bg-[#0a0a0c]/95 border-zinc-800 text-zinc-300'
          : 'bg-white/95 border-slate-200 text-slate-700 shadow-lg'
      }`}
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all cursor-pointer min-w-[56px] ${
                isActive
                  ? isDark
                    ? 'text-[#CCFF00]'
                    : 'text-[#0066FF]'
                  : isDark
                  ? 'text-zinc-300 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <div
                className={`p-1 rounded-md transition-all ${
                  isActive
                    ? isDark
                      ? 'bg-[#CCFF00]/15'
                      : 'bg-[#0066FF]/10'
                    : ''
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={2.4} />
              </div>
              <span className="text-[10px] font-mono font-bold tracking-tight mt-0.5 line-clamp-1">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
