import React, { useEffect, useRef } from "react";

interface SlingRingPortalProps {
  active: boolean;
  size?: number; // Canvas width/height in CSS pixels (default: 52)
  targetRadius?: number; // Portal ring radius in CSS pixels (default: 18)
  className?: string;
}

interface Spark {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  decay: number;
  width: number;
  drag: number;
}

export const SlingRingPortal: React.FC<SlingRingPortalProps> = ({
  active,
  size = 52,
  targetRadius = 18,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeRef = useRef<boolean>(active);
  const wakeUpRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    activeRef.current = active;
    if (wakeUpRef.current) {
      wakeUpRef.current();
    }
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // High-DPI screen support (crisp on Retina / 4K)
    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const cx = size / 2;
    const cy = size / 2;

    let animId: number | null = null;
    let isSleeping = false;
    let sparks: Spark[] = [];
    let currentRadius = activeRef.current ? targetRadius : 0;
    let portalAlpha = activeRef.current ? 1 : 0;
    let headAngle = Math.random() * Math.PI * 2;

    // Helper: spawn compact, delicate micro-sparks hugging the rim
    const spawnSpark = (angle: number, radius: number, isLead: boolean = false) => {
      // Spawn right on the ring circumference with subtle jitter
      const r = radius + (Math.random() - 0.5) * 1.0;
      const originX = cx + Math.cos(angle) * r;
      const originY = cy + Math.sin(angle) * r;

      // Tangential velocity (clockwise)
      const tangX = -Math.sin(angle);
      const tangY = Math.cos(angle);

      // Controlled, subtle outward drift (tangent dominates)
      const outX = Math.cos(angle);
      const outY = Math.sin(angle);

      // Low, controlled speed so sparks stay strictly within 2-5px of the ring
      const speed = isLead ? 0.9 + Math.random() * 0.9 : 0.6 + Math.random() * 0.7;
      const outwardBlend = 0.25;

      const vx = (tangX * (1 - outwardBlend) + outX * outwardBlend) * speed + (Math.random() - 0.5) * 0.3;
      const vy = (tangY * (1 - outwardBlend) + outY * outwardBlend) * speed + (Math.random() - 0.5) * 0.3;

      const maxLife = isLead ? 12 + Math.floor(Math.random() * 10) : 8 + Math.floor(Math.random() * 8);

      sparks.push({
        x: originX,
        y: originY,
        prevX: originX - vx * 0.5,
        prevY: originY - vy * 0.5,
        vx,
        vy,
        life: maxLife,
        maxLife,
        decay: 1,
        width: isLead ? 1.0 + Math.random() * 0.5 : 0.7 + Math.random() * 0.4,
        drag: 0.92,
      });
    };

    // Main animation step
    const render = () => {
      const isCurrentlyActive = activeRef.current;

      // Sleep loop when portal is closed and sparks have fizzled
      if (!isCurrentlyActive && portalAlpha <= 0.01 && sparks.length === 0) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        isSleeping = true;
        animId = null;
        return;
      }

      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      ctx.save();
      ctx.scale(dpr, dpr);

      // Smooth radius and alpha transition
      if (isCurrentlyActive) {
        currentRadius += (targetRadius - currentRadius) * 0.24;
        portalAlpha += (1 - portalAlpha) * 0.25;
      } else {
        currentRadius += (0 - currentRadius) * 0.2;
        portalAlpha += (0 - portalAlpha) * 0.22;
      }

      // Smooth, elegant rotation
      headAngle += 0.07;

      // Spawn subtle micro-sparks while portal is visible
      if (portalAlpha > 0.1 && currentRadius > 3) {
        // 1 lead spark on the cutter head
        if (isCurrentlyActive) {
          spawnSpark(headAngle, currentRadius, true);
        }

        // 1 subtle ambient spark along the rim
        if (isCurrentlyActive && Math.random() > 0.4) {
          spawnSpark(Math.random() * Math.PI * 2, currentRadius, false);
        }
      }

      // Keep spark pool clean and lightweight
      if (sparks.length > 40) {
        sparks = sparks.slice(sparks.length - 40);
      }

      // Additive blending for clean radiant glow
      ctx.globalCompositeOperation = "lighter";

      // 1. Draw the Sleek, Contained Mystic Ring
      if (portalAlpha > 0.02 && currentRadius > 1) {
        // Outer amber glow halo
        ctx.beginPath();
        ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 120, 0, ${0.4 * portalAlpha})`;
        ctx.lineWidth = 3.0;
        ctx.shadowColor = "#FF6F00";
        ctx.shadowBlur = 6;
        ctx.stroke();

        // Golden fire core ring
        ctx.beginPath();
        ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 185, 20, ${0.85 * portalAlpha})`;
        ctx.lineWidth = 1.6;
        ctx.shadowColor = "#FFB300";
        ctx.shadowBlur = 4;
        ctx.stroke();

        // Incandescent white-hot center filament
        ctx.beginPath();
        ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 240, ${0.9 * portalAlpha})`;
        ctx.lineWidth = 0.8;
        ctx.shadowColor = "#FFFFFF";
        ctx.shadowBlur = 2;
        ctx.stroke();

        // Bright lead spark tracer arc (Doctor Strange sling ring cutter head)
        ctx.beginPath();
        ctx.arc(cx, cy, currentRadius, headAngle - 0.5, headAngle + 0.2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.95 * portalAlpha})`;
        ctx.lineWidth = 2.0;
        ctx.shadowColor = "#FFE082";
        ctx.shadowBlur = 6;
        ctx.stroke();
      }

      // 2. Render Micro-Sparks (short, subtle, elegant streaks)
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];

        p.prevX = p.x;
        p.prevY = p.y;

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += 0.02; // subtle gravity

        p.life -= p.decay;

        if (p.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        const ratio = p.life / p.maxLife;

        let strokeColor = "";
        let sparkShadow = "";

        if (ratio > 0.6) {
          strokeColor = `rgba(255, 255, 255, ${ratio})`;
          sparkShadow = "#FFE082";
        } else if (ratio > 0.25) {
          strokeColor = `rgba(255, 190, 30, ${ratio / 0.6})`;
          sparkShadow = "#FF9800";
        } else {
          strokeColor = `rgba(255, 80, 0, ${(ratio / 0.25) * 0.7})`;
          sparkShadow = "#E64A19";
        }

        ctx.beginPath();
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = p.width * Math.max(0.4, ratio);
        ctx.lineCap = "round";
        ctx.shadowColor = sparkShadow;
        ctx.shadowBlur = 2;
        ctx.stroke();
      }

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    // Wake up handler to resume animation loop when re-activated
    wakeUpRef.current = () => {
      if (isSleeping) {
        isSleeping = false;
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      wakeUpRef.current = null;
      if (animId) {
        cancelAnimationFrame(animId);
      }
    };
  }, [size, targetRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
};

export default SlingRingPortal;
