import React, { useEffect, useRef } from "react";

interface SlingRingPortalProps {
  active: boolean;
  size?: number; // Canvas width/height in CSS pixels (default: 140)
  targetRadius?: number; // Portal ring radius in CSS pixels (default: 23)
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
  gravity: number;
  drag: number;
}

export const SlingRingPortal: React.FC<SlingRingPortalProps> = ({
  active,
  size = 140,
  targetRadius = 23,
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

    // High-DPI screen support (Retina / 4K)
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
    let secondaryAngle = headAngle + Math.PI;

    // Helper: spawn realistic tangential Doctor Strange sparks
    const spawnSpark = (
      angle: number,
      radius: number,
      isLeadCutter: boolean = false
    ) => {
      // Spawn slightly fluctuating around the ring circumference
      const radialJitter = (Math.random() - 0.5) * 1.8;
      const r = Math.max(2, radius + radialJitter);
      const originX = cx + Math.cos(angle) * r;
      const originY = cy + Math.sin(angle) * r;

      // Tangential velocity vector (clockwise rotation)
      const tangX = -Math.sin(angle);
      const tangY = Math.cos(angle);

      // Centrifugal / outward velocity vector
      const outX = Math.cos(angle);
      const outY = Math.sin(angle);

      // Speed configuration: cutter head produces high-velocity sparks, perimeter produces steady shower
      const speed = isLeadCutter
        ? 3.6 + Math.random() * 4.8
        : 2.0 + Math.random() * 3.4;

      // Real angle grinding: tangent dominates, with realistic outward burst angle (20° - 45°)
      const outwardBlend = 0.35 + Math.random() * 0.45;
      const vx = (tangX * (1 - outwardBlend) + outX * outwardBlend) * speed + (Math.random() - 0.5) * 1.0;
      const vy = (tangY * (1 - outwardBlend) + outY * outwardBlend) * speed + (Math.random() - 0.5) * 1.0;

      const maxLife = isLeadCutter
        ? 32 + Math.floor(Math.random() * 28)
        : 20 + Math.floor(Math.random() * 22);

      sparks.push({
        x: originX,
        y: originY,
        prevX: originX - vx * 0.45,
        prevY: originY - vy * 0.45,
        vx,
        vy,
        life: maxLife,
        maxLife,
        decay: 1,
        width: isLeadCutter ? 1.5 + Math.random() * 1.5 : 0.8 + Math.random() * 1.2,
        gravity: 0.05 + Math.random() * 0.08, // Ballistic downward gravity
        drag: 0.94 + Math.random() * 0.03, // Aerodynamic air drag
      });
    };

    // Main physics and render step
    const render = () => {
      const isCurrentlyActive = activeRef.current;

      // If portal is closed and all flying sparks have decayed, sleep loop to save resources
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

      // Smooth radius and alpha dynamics
      if (isCurrentlyActive) {
        currentRadius += (targetRadius - currentRadius) * 0.22;
        portalAlpha += (1 - portalAlpha) * 0.25;
      } else {
        currentRadius += (0 - currentRadius) * 0.16;
        portalAlpha += (0 - portalAlpha) * 0.18;
      }

      // Rotate cutting heads around the circle
      headAngle += 0.13;
      secondaryAngle -= 0.09;

      // Spawn new molten sparks while portal is active / opening
      if (portalAlpha > 0.08 && currentRadius > 3) {
        // High-density cutter head (the intense point where the sling ring grinds)
        const cutterCount = isCurrentlyActive ? 4 : 1;
        for (let i = 0; i < cutterCount; i++) {
          const jitter = (Math.random() - 0.5) * 0.4;
          spawnSpark(headAngle + jitter, currentRadius, true);
        }

        // Secondary counter-rotating head
        if (isCurrentlyActive && Math.random() > 0.35) {
          spawnSpark(secondaryAngle + (Math.random() - 0.5) * 0.4, currentRadius, false);
        }

        // Ambient perimeter spark emissions
        const ambientCount = isCurrentlyActive ? 3 : 1;
        for (let i = 0; i < ambientCount; i++) {
          const randAngle = Math.random() * Math.PI * 2;
          spawnSpark(randAngle, currentRadius, false);
        }
      }

      // Cap sparks buffer for rock-solid 60 FPS
      if (sparks.length > 180) {
        sparks = sparks.slice(sparks.length - 180);
      }

      // Additive blending for blinding incendiary plasma glow
      ctx.globalCompositeOperation = "lighter";

      // 1. Draw the Blazing Ring Plasma Filaments
      if (portalAlpha > 0.02 && currentRadius > 1) {
        // Outer fiery corona glow
        ctx.beginPath();
        ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 75, 0, ${0.45 * portalAlpha})`;
        ctx.lineWidth = 6.0;
        ctx.shadowColor = "#FF3D00";
        ctx.shadowBlur = 14;
        ctx.stroke();

        // Intense golden plasma ring body
        ctx.beginPath();
        ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 185, 10, ${0.85 * portalAlpha})`;
        ctx.lineWidth = 3.2;
        ctx.shadowColor = "#FFB300";
        ctx.shadowBlur = 8;
        ctx.stroke();

        // Blinding white-hot incandescent filament
        ctx.beginPath();
        ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 245, ${0.95 * portalAlpha})`;
        ctx.lineWidth = 1.4;
        ctx.shadowColor = "#FFFFFF";
        ctx.shadowBlur = 4;
        ctx.stroke();

        // Rotating cutting arc segment (super-bright lead torch)
        ctx.beginPath();
        ctx.arc(cx, cy, currentRadius, headAngle - 0.8, headAngle + 0.3);
        ctx.strokeStyle = `rgba(255, 255, 255, ${portalAlpha})`;
        ctx.lineWidth = 3.6;
        ctx.shadowColor = "#FFD54F";
        ctx.shadowBlur = 12;
        ctx.stroke();

        // Counter-rotating ember ribbon
        ctx.beginPath();
        ctx.arc(cx, cy, currentRadius + 0.4, secondaryAngle - 0.6, secondaryAngle + 0.6);
        ctx.strokeStyle = `rgba(255, 140, 0, ${0.75 * portalAlpha})`;
        ctx.lineWidth = 2.4;
        ctx.shadowColor = "#FF6F00";
        ctx.shadowBlur = 6;
        ctx.stroke();
      }

      // 2. Simulate & Render Flying Molten Sparks (Motion Blurred Streaks)
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];

        // Save position for motion streak
        p.prevX = p.x;
        p.prevY = p.y;

        // Physics step: air drag + velocity + downward gravity
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;

        p.life -= p.decay;

        if (p.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        // Thermodynamic cooling: life ratio 1.0 -> 0.0
        const lifeRatio = p.life / p.maxLife;

        let strokeColor = "";
        let sparkShadow = "";
        let blurAmount = 0;

        if (lifeRatio > 0.7) {
          // White-hot newly sheared molten metal
          const alpha = Math.min(1, lifeRatio * 1.25);
          strokeColor = `rgba(255, 255, 255, ${alpha})`;
          sparkShadow = "#FFE082";
          blurAmount = 4;
        } else if (lifeRatio > 0.4) {
          // Incandescent golden fire
          const alpha = lifeRatio / 0.7;
          strokeColor = `rgba(255, 195, 20, ${alpha})`;
          sparkShadow = "#FF9800";
          blurAmount = 3;
        } else if (lifeRatio > 0.15) {
          // Fiery orange-red cooling plasma
          const alpha = lifeRatio / 0.4;
          strokeColor = `rgba(255, 80, 0, ${alpha})`;
          sparkShadow = "#E64A19";
          blurAmount = 2;
        } else {
          // Deep red ember / cinder right before extinguishing
          const alpha = lifeRatio / 0.15;
          strokeColor = `rgba(180, 30, 0, ${alpha * 0.8})`;
          sparkShadow = "#B71C1C";
          blurAmount = 1;
        }

        // Draw elongated velocity streak
        ctx.beginPath();
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = p.width * Math.max(0.4, lifeRatio);
        ctx.lineCap = "round";
        ctx.shadowColor = sparkShadow;
        ctx.shadowBlur = blurAmount;
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
