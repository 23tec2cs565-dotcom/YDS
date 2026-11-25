import React, { useEffect, useRef } from "react";

interface SlingRingPortalProps {
  active: boolean;
  size?: number; // Canvas width/height in CSS pixels (default: 56)
  targetRadius?: number; // Portal ring radius in CSS pixels (default: 18.5)
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
  tier: "lead" | "ambient";
}

export const SlingRingPortal: React.FC<SlingRingPortalProps> = ({
  active,
  size = 56,
  targetRadius = 18.5,
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

    // High-DPI screen support (crisp on 2x/3x Retina & 4K displays)
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

    // Sling-ring tracing state (Kamar-Taj circular conjuring gesture)
    let traceProgress = activeRef.current ? 1 : 0; // 0 to 1
    const traceAngleStart = -Math.PI / 2; // Begin trace from the top
    let portalAlpha = activeRef.current ? 1 : 0;
    let headAngle = traceAngleStart;
    let secondaryAngle = headAngle + Math.PI;

    // Helper: spawn realistic compact micro-sparks hugging the rim
    const spawnSpark = (angle: number, radius: number, isLead: boolean = false) => {
      const r = radius + (Math.random() - 0.5) * 1.2;
      const originX = cx + Math.cos(angle) * r;
      const originY = cy + Math.sin(angle) * r;

      // Tangential velocity (clockwise)
      const tangX = -Math.sin(angle);
      const tangY = Math.cos(angle);

      // Centrifugal / outward velocity
      const outX = Math.cos(angle);
      const outY = Math.sin(angle);

      // Controlled velocity: sparks hug the rim closely (dissolves within 3-6px)
      const speed = isLead ? 1.1 + Math.random() * 1.1 : 0.65 + Math.random() * 0.75;
      const outwardBlend = 0.28;

      const vx = (tangX * (1 - outwardBlend) + outX * outwardBlend) * speed + (Math.random() - 0.5) * 0.35;
      const vy = (tangY * (1 - outwardBlend) + outY * outwardBlend) * speed + (Math.random() - 0.5) * 0.35;

      const maxLife = isLead ? 14 + Math.floor(Math.random() * 10) : 9 + Math.floor(Math.random() * 8);

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
        width: isLead ? 1.2 + Math.random() * 0.6 : 0.75 + Math.random() * 0.45,
        drag: 0.91,
        tier: isLead ? "lead" : "ambient",
      });
    };

    // Main animation loop
    const render = () => {
      const isCurrentlyActive = activeRef.current;

      // Sleep loop when portal is closed and all sparks have burned out
      if (!isCurrentlyActive && portalAlpha <= 0.005 && sparks.length === 0) {
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

      // 1. Tracing & Alpha dynamics
      if (isCurrentlyActive) {
        portalAlpha += (1 - portalAlpha) * 0.22;
        // Sweep the ring open like Doctor Strange tracing the portal
        if (traceProgress < 1) {
          traceProgress = Math.min(1, traceProgress + 0.075);
        }
        headAngle += 0.085;
        secondaryAngle -= 0.06;
      } else {
        portalAlpha += (0 - portalAlpha) * 0.18;
        traceProgress += (0 - traceProgress) * 0.25;
        headAngle += 0.05;
      }

      const activeRadius = targetRadius;
      const sweepAngle = traceProgress * Math.PI * 2;
      const currentCutterAngle = traceAngleStart + sweepAngle;

      // 2. Spawn Molten Micro-Sparks while portal has energy
      if (portalAlpha > 0.08) {
        if (isCurrentlyActive) {
          if (traceProgress < 0.98) {
            // High spark emission at the leading cutting head during opening trace
            spawnSpark(currentCutterAngle, activeRadius, true);
            spawnSpark(currentCutterAngle - 0.15, activeRadius, true);
          } else {
            // Steady continuous orbital grinding once fully traced
            spawnSpark(headAngle, activeRadius, true);
            if (Math.random() > 0.35) {
              spawnSpark(secondaryAngle, activeRadius, false);
            }
          }

          // Subtle ambient micro-sparks along the active perimeter
          if (Math.random() > 0.45) {
            const randAngle = traceAngleStart + Math.random() * sweepAngle;
            spawnSpark(randAngle, activeRadius, false);
          }
        }
      }

      // Limit particle array size
      if (sparks.length > 45) {
        sparks = sparks.slice(sparks.length - 45);
      }

      // 3. Draw Ambient Warm Core Backdrop (Gives rich contrast on light/frosted glass)
      if (portalAlpha > 0.03 && sweepAngle > 0.2) {
        const bgGrad = ctx.createRadialGradient(cx, cy, activeRadius * 0.6, cx, cy, activeRadius * 1.35);
        bgGrad.addColorStop(0, `rgba(255, 145, 0, ${0.12 * portalAlpha})`);
        bgGrad.addColorStop(0.7, `rgba(230, 81, 0, ${0.06 * portalAlpha})`);
        bgGrad.addColorStop(1, "rgba(255, 100, 0, 0)");

        ctx.beginPath();
        ctx.arc(cx, cy, activeRadius * 1.35, 0, Math.PI * 2);
        ctx.fillStyle = bgGrad;
        ctx.fill();
      }

      // 4. Draw the Blazing Sling Ring Arc / Circle
      if (portalAlpha > 0.02 && sweepAngle > 0.05) {
        const arcStart = traceAngleStart;
        const arcEnd = traceAngleStart + sweepAngle;

        // Layer A: Deep fiery outer halo (vivid burnt-orange for strong contrast on white)
        ctx.beginPath();
        ctx.arc(cx, cy, activeRadius, arcStart, arcEnd);
        ctx.strokeStyle = `rgba(216, 67, 21, ${0.75 * portalAlpha})`;
        ctx.lineWidth = 3.6;
        ctx.shadowColor = "#FF6F00";
        ctx.shadowBlur = 8;
        ctx.stroke();

        // Layer B: Intense molten gold plasma ring
        ctx.beginPath();
        ctx.arc(cx, cy, activeRadius, arcStart, arcEnd);
        ctx.strokeStyle = `rgba(255, 171, 0, ${0.95 * portalAlpha})`;
        ctx.lineWidth = 2.0;
        ctx.shadowColor = "#FFB300";
        ctx.shadowBlur = 5;
        ctx.stroke();

        // Layer C: Blinding incandescent core filament (sunfire gold-white)
        ctx.beginPath();
        ctx.arc(cx, cy, activeRadius, arcStart, arcEnd);
        ctx.strokeStyle = `rgba(255, 249, 196, ${0.98 * portalAlpha})`;
        ctx.lineWidth = 0.9;
        ctx.shadowColor = "#FFFFFF";
        ctx.shadowBlur = 2;
        ctx.stroke();

        // Layer D: The Doctor Strange Lead Cutter Torch
        const leadTipAngle = traceProgress < 0.99 ? currentCutterAngle : headAngle;
        ctx.beginPath();
        ctx.arc(cx, cy, activeRadius, leadTipAngle - 0.45, leadTipAngle + 0.15);
        ctx.strokeStyle = `rgba(255, 255, 255, ${portalAlpha})`;
        ctx.lineWidth = 2.4;
        ctx.shadowColor = "#FFE082";
        ctx.shadowBlur = 7;
        ctx.stroke();
      }

      // 5. Render Molten Flying Micro-Sparks (Crisp, High-Contrast Streaks)
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];

        p.prevX = p.x;
        p.prevY = p.y;

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += 0.025; // slight gravity

        p.life -= p.decay;

        if (p.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        const ratio = p.life / p.maxLife;

        let strokeColor = "";
        let sparkGlow = "";

        // High-contrast color gradient: vivid gold -> molten orange -> ember red
        if (ratio > 0.65) {
          strokeColor = `rgba(255, 250, 205, ${Math.min(1, ratio * 1.15)})`;
          sparkGlow = "#FFD54F";
        } else if (ratio > 0.3) {
          strokeColor = `rgba(255, 160, 0, ${ratio / 0.65})`;
          sparkGlow = "#FF8F00";
        } else {
          strokeColor = `rgba(216, 67, 21, ${(ratio / 0.3) * 0.85})`;
          sparkGlow = "#D84315";
        }

        ctx.beginPath();
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = p.width * Math.max(0.4, ratio);
        ctx.lineCap = "round";
        ctx.shadowColor = sparkGlow;
        ctx.shadowBlur = 3;
        ctx.stroke();
      }

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    // Wake up animation loop on interaction
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
