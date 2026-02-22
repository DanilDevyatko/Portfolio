'use client';

import { useEffect, useRef, useState } from 'react';

export function MouseFollower() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [canUseMouse, setCanUseMouse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanUseMouse(mq.matches);

    update();
    mq.addEventListener('change', update);

    return () => {
      mq.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!canUseMouse) return;

    const el = ref.current;
    if (!el) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;

    const speed = 0.12; // lower = smoother

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', move);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(rafId);
    };
  }, [canUseMouse]);

  if (!canUseMouse) return null;

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: -8,
        left: -8,
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)',
        transform: 'translate3d(0,0,0)',
        zIndex: 9999,
      }}
    />
  );
}
