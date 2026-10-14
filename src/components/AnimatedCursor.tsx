import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCursorProps {
  theme: 'dark' | 'light';
}

export const AnimatedCursor: React.FC<AnimatedCursorProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Direct position for the fast center dot
  const mousePos = useRef({ x: -100, y: -100 });
  // Interpolated trailing position for the bubble
  const bubblePos = useRef({ x: -100, y: -100 });

  const dotRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check if device supports fine hover cursor (ignore on touchscreens)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'SELECT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'switch' ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth animation loop using lerp (Linear Interpolation) for fluid trailing effect
    const loop = () => {
      const ease = 0.18; // smooth trailing speed

      bubblePos.current.x += (mousePos.current.x - bubblePos.current.x) * ease;
      bubblePos.current.y += (mousePos.current.y - bubblePos.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (bubbleRef.current) {
        bubbleRef.current.style.transform = `translate3d(${bubblePos.current.x}px, ${bubblePos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  return (
    <div
      className={`hidden md:block pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Trailing Fluid Bubble */}
      <div
        ref={bubbleRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 w-10 h-10 rounded-full transition-all duration-200 ease-out will-change-transform ${
          isHovering
            ? isDark
              ? 'scale-150 bg-[#CCFF00]/25 border-2 border-[#CCFF00]/80 shadow-[0_0_20px_rgba(204,255,0,0.5)] backdrop-blur-[2px]'
              : 'scale-150 bg-[#0066FF]/20 border-2 border-[#0066FF]/80 shadow-[0_0_20px_rgba(0,102,255,0.4)] backdrop-blur-[2px]'
            : isDark
            ? 'scale-100 bg-[#CCFF00]/15 border border-[#CCFF00]/50 shadow-[0_0_12px_rgba(204,255,0,0.25)]'
            : 'scale-100 bg-[#0066FF]/15 border border-[#0066FF]/50 shadow-[0_0_12px_rgba(0,102,255,0.2)]'
        } ${isClicking ? 'scale-90 duration-75' : ''}`}
      />

      {/* Immediate Sharp Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full transition-transform duration-75 will-change-transform ${
          isDark
            ? 'bg-[#CCFF00] shadow-[0_0_8px_#CCFF00]'
            : 'bg-[#0066FF] shadow-[0_0_8px_#0066FF]'
        } ${isHovering ? 'scale-0' : 'scale-100'}`}
      />
    </div>
  );
};
