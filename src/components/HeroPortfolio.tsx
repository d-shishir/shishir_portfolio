import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../hero.css";

interface TrailPoint {
  x: number;
  y: number;
  life: number;
  radius: number;
}

// Controls for wipe effect
const LERP_SPEED = 0.15;
const MAX_TRAIL_LENGTH = 300; // Allows ~3 seconds of constant movement (60fps)
const TRAIL_FADE_SPEED = 0.0055; // Decrease life by this amount per frame. 0.0055 * 60fps = ~3 seconds to zero
const GRID_SIZE = 60;
const PARALLAX_STRENGTH = 6; 

export function HeroPortfolio() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const img1Ref = useRef<HTMLImageElement | null>(null);
  const img2Ref = useRef<HTMLImageElement | null>(null);
  const imagesLoaded = useRef(0);

  const spotX = useRef(typeof window !== "undefined" ? window.innerWidth / 2 : 760);
  const spotY = useRef(typeof window !== "undefined" ? window.innerHeight / 2 : 400);
  const mouseX = useRef(spotX.current);
  const mouseY = useRef(spotY.current);
  const prevSpotX = useRef(spotX.current);
  const prevSpotY = useRef(spotY.current);

  const lastInteractionTime = useRef(Date.now());
  const isInteracting = useRef(false);
  const trail = useRef<TrailPoint[]>([]);
  const animId = useRef<number>(0);
  
  // Create an offscreen canvas to act as the mask
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const nameRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const bottomNavRef = useRef<HTMLDivElement>(null);

  const gridOffsetX = useRef(0);
  const gridOffsetY = useRef(0);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;
    if (imagesLoaded.current < 2) {
      animId.current = requestAnimationFrame(drawFrame);
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    const W = window.innerWidth;
    const H = window.innerHeight;
    const img1 = img1Ref.current!;
    const img2 = img2Ref.current!;

    if (!maskCanvasRef.current) {
      maskCanvasRef.current = document.createElement("canvas");
    }
    const maskCanvas = maskCanvasRef.current;
    if (maskCanvas.width !== W * dpr || maskCanvas.height !== H * dpr) {
      maskCanvas.width = W * dpr;
      maskCanvas.height = H * dpr;
      const mCtx = maskCanvas.getContext("2d");
      if (mCtx) mCtx.scale(dpr, dpr);
    }
    const maskCtx = maskCanvas.getContext("2d")!;

    prevSpotX.current = spotX.current;
    prevSpotY.current = spotY.current;
    
    // Only move target if actively interacting, no auto wander
    if (isInteracting.current) {
      spotX.current += (mouseX.current - spotX.current) * LERP_SPEED;
      spotY.current += (mouseY.current - spotY.current) * LERP_SPEED;
    }

    gridOffsetX.current = -((mouseX.current - W / 2) / W) * PARALLAX_STRENGTH * 4;
    gridOffsetY.current = -((mouseY.current - H / 2) / H) * PARALLAX_STRENGTH * 4;

    ctx.clearRect(0, 0, W, H);

    function drawCover(targetCtx: CanvasRenderingContext2D, img: HTMLImageElement, px: number, py: number) {
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;
      const canvasW = W;
      const canvasH = H;
      
      const scale = Math.max(canvasW / imgW, canvasH / imgH) * 1.1;
      const sw = imgW * scale;
      const sh = imgH * scale;

      const maxSx = (sw - canvasW) / 2;
      const finalSx = (canvasW - sw) / 2 + Math.max(-maxSx, Math.min(maxSx, px));

      // We want to align near the top, but ensure we never leave a gap at the bottom.
      // Maximum allowed shift up is (sh - canvasH)
      const maxSy = sh - canvasH;
      let finalSy = -maxSy * 0.1 + py; // start slightly shifted up, allow pan
      
      // Clamp it so it doesn't show background on top (finalSy <= 0) 
      // and doesn't show background on bottom (finalSy >= -maxSy)
      finalSy = Math.min(0, Math.max(-maxSy, finalSy));

      targetCtx.drawImage(img, finalSx, finalSy, sw, sh);
    }

    // Base image
    // Image Pan offsets based on spot position
    const pcX = (spotX.current - W / 2) / (W / 2);
    const pcY = (spotY.current - H / 2) / (H / 2);
    const maxBackgroundPan = 12; // Reduced background panning

    // Animated grid
    ctx.save();
    ctx.globalAlpha = 0.065;
    ctx.strokeStyle = "#888";
    ctx.lineWidth = 0.8;
    const gox = ((gridOffsetX.current % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
    const goy = ((gridOffsetY.current % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
    for (let x = -GRID_SIZE + gox; x <= W + GRID_SIZE; x += GRID_SIZE) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = -GRID_SIZE + goy; y <= H + GRID_SIZE; y += GRID_SIZE) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    ctx.restore();

    // Dynamic wipe radius based on screen size (e.g. 15% of width, bounded)
    const dynamicWipeRadius = Math.max(50, Math.min(130, W * 0.1));

    const isIdle = Date.now() - lastInteractionTime.current > 3000;
    if (isIdle) {
      isInteracting.current = false;
    }

    // Update Wipe Trail Logic
    // Only push points if interacting AND not idle
    if (isInteracting.current && !isIdle) {
      trail.current.push({
        x: spotX.current,
        y: spotY.current,
        life: 1.0,
        radius: dynamicWipeRadius,
      });
      if (trail.current.length > MAX_TRAIL_LENGTH) {
        trail.current.shift();
      }
    }

    // Shrink wipe trail over time
    trail.current.forEach((t) => {
      if (isInteracting.current && !isIdle) {
        t.life -= TRAIL_FADE_SPEED;
      } else {
        t.life -= TRAIL_FADE_SPEED * 8; // Fade out rapidly on exit or idle
      }
    });
    
    // allow the existing points to fade out naturally
    trail.current = trail.current.filter((t) => t.life > 0);

    // Draw the base image (img1) onto the main canvas
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "source-over";
    drawCover(ctx, img1, -pcX * maxBackgroundPan, -pcY * maxBackgroundPan);

    if (trail.current.length > 0) { 
      // 1. Prepare mask canvas (clear it first)
      maskCtx.clearRect(0, 0, W, H);
      maskCtx.globalCompositeOperation = "source-over";
      
      // 2. Draw the textured brush strokes onto the mask canvas
      // We use a soft radial gradient as a "brush stamp" to simulate a smudge/sponge
      for (let i = 0; i < trail.current.length; i++) {
        const p = trail.current[i];
        const r = p.radius * p.life;
        if (r > 2) {
          const brush = maskCtx.createRadialGradient(p.x, p.y, r * 0.1, p.x, p.y, r);
          // Opaque center, fading to transparent edge for a soft brush feel
          brush.addColorStop(0, `rgba(0, 0, 0, ${p.life})`);
          brush.addColorStop(0.6, `rgba(0, 0, 0, ${p.life * 0.8})`);
          brush.addColorStop(1, "rgba(0, 0, 0, 0)");
          
          maskCtx.fillStyle = brush;
          maskCtx.beginPath();
          maskCtx.arc(p.x, p.y, r, 0, Math.PI * 2);
          maskCtx.fill();
        }
      }

      // 3. Keep ONLY the areas on maskCanvas where the brush strokes overlap
      // by drawing img2 with "source-in". This stamps img2 precisely into the brush strokes!
      maskCtx.globalCompositeOperation = "source-in";
      
      // We use the EXACT same drawCover logic so img2 perfectly superimposes over img1
      // instead of using independent raw scaling math.
      drawCover(maskCtx, img2, -pcX * maxBackgroundPan, -pcY * maxBackgroundPan);
      
      // 4. Draw the fully assembled wipe mask over the main canvas
      ctx.drawImage(maskCanvas, 0, 0, W, H);
    }

    // Check if wipe overlaps UI elements and toggle invert class
    const allUiRefs = [nameRef.current, socialRef.current, bottomNavRef.current];
    for (const el of allUiRefs) {
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      // Check distance against the head of the trail (latest spot)
      const dist = Math.sqrt((cx - spotX.current) ** 2 + (cy - spotY.current) ** 2);
      const threshold = dynamicWipeRadius + Math.max(rect.width, rect.height) * 0.5;
      
      if (dist < threshold && trail.current.length > 0 && isInteracting.current) {
        el.classList.add("hero-invert");
      } else {
        el.classList.remove("hero-invert");
      }
    }

    animId.current = requestAnimationFrame(drawFrame);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Define loadImages strictly internally so resize can use it
    const loadImages = () => {
      imagesLoaded.current = 0;
      const isPortrait = window.innerHeight > window.innerWidth;
      const img1Src = isPortrait ? "/hero-1.png" : "/oldhero-1.png";
      const img2Src = isPortrait ? "/hero-2.png" : "/oldhero-2.png";

      const i1 = new Image();
      const i2 = new Image();
      i1.src = img1Src;
      i2.src = img2Src;
      img1Ref.current = i1;
      img2Ref.current = i2;
      i1.onload = () => { imagesLoaded.current++; };
      i2.onload = () => { imagesLoaded.current++; };
    };

    function resize() {
      if (!canvas) return;
      
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;
        
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.scale(dpr, dpr);
      }
      
      const prevIsPortrait = canvas.height > canvas.width;
      const currentIsPortrait = displayHeight > displayWidth;
      
      if (prevIsPortrait !== currentIsPortrait && img1Ref.current) {
         loadImages();
      }
    }
    resize();
    window.addEventListener("resize", resize);

    function onInteractStart(e: MouseEvent | TouchEvent) {
      isInteracting.current = true;
      lastInteractionTime.current = Date.now();
      if ("touches" in e) {
        mouseX.current = e.touches[0].clientX;
        mouseY.current = e.touches[0].clientY;
      } else {
        mouseX.current = e.clientX;
        mouseY.current = e.clientY;
      }
    }

    function onInteractEnd(e?: MouseEvent | TouchEvent) {
      if (e?.type === "mouseout" && (e as MouseEvent).relatedTarget !== null) {
        return; // Only trigger on screen boundary exit
      }

      isInteracting.current = false;
      lastInteractionTime.current = Date.now();
      // Allow smudge to fade naturally, do not clear trail.current
    }

    function onInteractMove(e: MouseEvent | TouchEvent) {
      let clientX, clientY;
      if ("touches" in e) {
        // Only trigger on active touch drag
        if (!isInteracting.current) return; 
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        // Boundary check for fast mouse movements off-screen
        if (e.clientX <= 0 || e.clientX >= window.innerWidth - 1 || e.clientY <= 0 || e.clientY >= window.innerHeight - 1) {
          onInteractEnd();
          return;
        }
        // Always interact on mouse move (hover)
        isInteracting.current = true;
        clientX = e.clientX;
        clientY = e.clientY;
      }
      lastInteractionTime.current = Date.now();
      mouseX.current = clientX;
      mouseY.current = clientY;

      // Parallax UI
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const px = ((clientX - cx) / cx) * -PARALLAX_STRENGTH;
      const py = ((clientY - cy) / cy) * -PARALLAX_STRENGTH;
      if (nameRef.current) nameRef.current.style.transform = `translate(${px}px, ${py}px)`;
      if (navRef.current) navRef.current.style.transform = `translate(${px * 0.6}px, ${py * 0.6}px)`;
      if (socialRef.current) socialRef.current.style.transform = `translate(${px * 0.8}px, ${py * 0.8}px)`;
      if (bottomNavRef.current) bottomNavRef.current.style.transform = `translate(${px * 0.7}px, ${py * 0.7}px)`;
    }
    
    // Mouse events (hover desktop)
    window.addEventListener("mousemove", onInteractMove);
    document.addEventListener("mouseleave", onInteractEnd as EventListener);
    document.addEventListener("mouseout", onInteractEnd as EventListener);

    // Touch events (mobile drag)
    window.addEventListener("touchstart", onInteractStart, { passive: true });
    window.addEventListener("touchend", onInteractEnd);
    window.addEventListener("touchmove", onInteractMove, { passive: true });

    loadImages();

    animId.current = requestAnimationFrame(drawFrame);

    return () => {
      cancelAnimationFrame(animId.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onInteractMove);
      document.removeEventListener("mouseleave", onInteractEnd as EventListener);
      document.removeEventListener("mouseout", onInteractEnd as EventListener);
      window.removeEventListener("touchstart", onInteractStart);
      window.removeEventListener("touchend", onInteractEnd);
      window.removeEventListener("touchmove", onInteractMove);
    };
  }, [drawFrame]);

  return (
    <div className="hero-root">
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Top-left: Name */}
      <div ref={nameRef} className="hero-name">
        <span className="hero-name-first">Shishir</span>
        <span className="hero-name-last">Lamichhane</span>
        <span className="hero-name-sub">Software Engineer</span>
      </div>

      {/* Top-right: Nav (removed F1 Records) */}

      {/* Bottom-left: Portfolio navigation */}
      <div ref={bottomNavRef} className="hero-bottom-nav">
        <button className="hero-bottom-nav-btn" onClick={() => navigate("/about")} id="about-me-btn">
          <span>About</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
        </button>
        <button className="hero-bottom-nav-btn" onClick={() => navigate("/projects")} id="view-projects-btn">
          <span>Projects</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
        </button>
        <button className="hero-bottom-nav-btn" onClick={() => navigate("/resume")} id="resume-btn">
          <span>Résumé</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
        </button>
        <button className="hero-bottom-nav-btn" onClick={() => navigate("/contact")} id="contact-me-btn">
          <span>Contact</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
        </button>
      </div>

      {/* Bottom-right: Socials */}
      <div ref={socialRef} className="hero-socials">
        <a
          href="https://www.linkedin.com/in/dshishir13"
          target="_blank"
          rel="noreferrer"
          className="hero-social-icon"
          aria-label="LinkedIn"
          id="hero-linkedin"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M22.23 0H1.77C.794 0 0 .793 0 1.77v20.46c0 .977.794 1.77 1.77 1.77h20.46c.977 0 1.77-.793 1.77-1.77V1.77C24 .793 23.206 0 22.23 0zm-6.963 20.52h-3.515v-5.503c0-1.312-.022-2.998-1.828-2.998-1.828 0-2.108 1.426-2.108 2.894v5.607h-3.516V9.497h3.375v1.633h.048c.467-.885 1.597-1.67 3.29-1.67 3.515 0 4.16 2.314 4.16 5.338v5.722zm-9.207 0h-3.515v-11.02h3.515v11.02zm-1.757-12.68c-1.13 0-1.828-.821-1.828-1.847 0-1.013.688-1.847 1.828-1.847 1.14 0 1.828.834 1.828 1.847 0 1.026-.688 1.847-1.828 1.847z" />
          </svg>
        </a>
        <a
          href="https://github.com/d-shishir"
          target="_blank"
          rel="noreferrer"
          className="hero-social-icon"
          aria-label="GitHub"
          id="hero-github"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12 .297c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.112.82-.259.82-.577 0-.286-.01-1.042-.015-2.048-3.338.726-4.04-1.607-4.04-1.607-.546-1.388-1.334-1.758-1.334-1.758-1.09-.746.083-.73.083-.73 1.207.085 1.841 1.238 1.841 1.238 1.07 1.834 2.809 1.304 3.495.998.106-.773.418-1.303.763-1.604-2.664-.303-5.467-1.332-5.467-5.921 0-1.306.467-2.376 1.235-3.216-.124-.303-.535-1.527.116-3.175 0 0 1.008-.322 3.301 1.235a11.485 11.485 0 0 1 3.003-.404c1.02.004 2.04.139 3.003.404 2.293-1.557 3.301-1.235 3.301-1.235.651 1.648.24 2.872.116 3.175.768.84 1.235 1.91 1.235 3.216 0 4.601-2.805 5.617-5.471 5.921.432.373.817 1.103.817 2.224 0 1.605-.014 2.899-.014 3.286 0 .318.219.689.825.577C20.563 22.1 24 17.6 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
