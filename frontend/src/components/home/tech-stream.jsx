"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The stack, flying past the camera.
 *
 * A dot field is generic — it could sit behind any technology company. These
 * are real lines from the work Coderzon actually does: Spark jobs, EKS
 * clusters, materialised views, latency budgets. The background says what the
 * company builds without a word of marketing copy.
 *
 * Deliberately not Matrix rain. Falling green glyphs are a twenty-five-year-old
 * screensaver and read as costume, not craft. Here the fragments travel *toward*
 * the viewer down a perspective tunnel: each has a real position in space, and
 * size, opacity and speed all follow from its distance. That is what makes it
 * read as depth rather than as a texture.
 *
 * Canvas 2D rather than WebGL, on purpose. Rendering type in WebGL means
 * building a glyph atlas and hand-rolling kerning; `fillText` gets the site's
 * own monospace face for free, correctly hinted at every size. A hundred draw
 * calls a frame is comfortably inside budget.
 */

/**
 * What flies past: the stack, by name.
 *
 * Grouped by the services it belongs to, and deliberately short. Every entry
 * maps to one of the things this company sells — not to every tool
 * the codebase happens to mention. A background listing everything anyone has
 * ever touched reads as a tag cloud; one that names only what is actually on
 * offer reads as a capability list, and a visitor scanning for the platform
 * they already run finds it in a second.
 *
 * Names rather than code. A line of SQL says "engineers work here"; a name
 * says which engineers.
 *
 * Set in the mono face, matching the eyebrows and labels elsewhere, so the
 * field reads as a manifest rather than as scattered logos.
 */
const STACK = [
  // Cloud Computing, Legacy Modernization, Support & Maintenance
  "AWS",
  "Microsoft Azure",
  "Google Cloud",
  "Docker",
  "Terraform",
  // Data Engineering — the warehouses the work actually lands in, and the
  // tools that move data into them. This is what the firm leads with, so it
  // is the largest group in the field.
  "Snowflake",
  "BigQuery",
  "Amazon Redshift",
  "Microsoft Fabric",
  "dbt",
  "Apache Kafka",
  // Data Analytics, Business Intelligence
  "Power BI",
  "Tableau",
  "Databricks",
  "Apache Spark",
  "Apache Airflow",
  "PostgreSQL",
  // Agentic AI, Artificial Intelligence Solutions
  "Python",
  "TensorFlow",
  "PyTorch",
  "LangChain",
  "Vector search",
  // Web Development, MVP, Digital Product Engineering, SaaS
  "React",
  "Node.js",
  // Mobile App Development
  "Flutter",
  "React Native",
  "Swift",
];

/** Perspective. Focal length sets how sharply the tunnel converges. */
const FOCAL = 500;
/**
 * Nearest and furthest z. Fragments recycle to FAR when they pass NEAR.
 * NEAR is held well back deliberately: it caps how large a fragment can ever
 * get, and a line of code rendering bigger than the body copy stops being
 * atmosphere and starts competing with the page.
 */
const NEAR = 300;
const FAR = 900;
/**
 * Type size at z === FOCAL, where scale is exactly 1. Sized so the mid-tunnel
 * median lands near 9px and nothing exceeds about 22px. This is atmosphere:
 * it has to read as code on inspection and disappear when you are reading the
 * headline, which means staying well under the size of the body copy.
 */
const BASE_FONT_DESKTOP = 13;
/**
 * The depth the spread is measured at. Fragments are distributed so that at
 * mid-tunnel they span a little wider than the frame — then diverge past its
 * edges as they approach. Deriving this from the viewport rather than fixing
 * it is what keeps the field populated on a phone; a spread tuned for 1920
 * throws all but a handful of fragments off the sides of a 390px screen.
 */
const SPREAD_DEPTH = 450;
const SPREAD_X_RATIO = 0.85;
const SPREAD_Y_RATIO = 0.9;
/** Base travel, px of depth per second. Slow: this is ambient, not frantic. */
const SPEED = 52;
/** Peak opacity, reached mid-tunnel. The scrim below the copy is what buys
 *  headline contrast, so the stream itself can afford to be clearly present
 *  rather than a suggestion. */
const PEAK_ALPHA = 0.74;

/* Higher than it looks. With the field confined to the right of the frame,
 * most of these are off-screen or faded out at any moment — and a stack name
 * covers about a third the width of the code line it replaced, so the count
 * has to rise for the field to read at the same density. */
const COUNT_DESKTOP = 150;

/**
 * Composition. The copy occupies the left of the frame, so the stream is given
 * the right as its own territory: the vanishing point sits off-centre and the
 * fragments are weighted toward it.
 *
 * The boundary is soft on purpose and sits well inside the copy column: the
 * stream begins fading up under the tail of the headline rather than stopping
 * dead at the column edge, which reads as one composition instead of two
 * panels butted together.
 *
 * The left is held clear in *screen* space rather than by painting a heavier
 * scrim over the top. Fading the fragments themselves means the quiet
 * side stays genuinely quiet instead of being a bright field with a dark sheet
 * pulled over it, and the ramp keeps the boundary soft — a hard cut would draw
 * a visible seam straight down the hero.
 *
 * Below lg none of this can hold: the copy spans the full width, there is no
 * column to give away, and the stream ends up running straight through the
 * headline. So it does not run at all there. The field exists to occupy the
 * space the copy leaves — with no such space, the honest answer is the
 * gradient on its own, which also spares the weakest devices a canvas and a
 * per-frame loop.
 */
const VANISHING_X = 0.72;
const RIGHTWARD_BIAS = 0.76;
const QUIET_UNTIL = 0.44;
const QUIET_RAMP = 0.24;

/**
 * One colour, cooled very slightly toward blue so it sits on the ink rather
 * than glaring off it.
 *
 * Monochrome on purpose. Depth here is carried by size and opacity, which is
 * how distance actually reads — hue variation competes with that cue instead
 * of reinforcing it, and a field that fades from bright to dim in a single
 * colour looks like air between you and the far names.
 *
 * It also gives the cyan back its job. Sprinkled across random stack names it
 * meant nothing; reserved for the beam and the packets on the object beside
 * it, it means one thing — work moving up through the layers.
 */
const INK_WHITE = "228, 239, 255";

function makeFragment(random, spreadX, spreadY) {
  // Skewed toward the vanishing point's own side of the frame, with a mild
  // power curve so the density builds rather than banding.
  const side = random() < RIGHTWARD_BIAS ? 1 : -1;
  return {
    text: STACK[Math.floor(random() * STACK.length)],
    x: Math.pow(random(), 0.85) * spreadX * side,
    y: (random() * 2 - 1) * spreadY,
    z: NEAR + random() * (FAR - NEAR),
    // A little variation in speed stops the field moving as one sheet.
    rate: 0.75 + random() * 0.6,
    colour: INK_WHITE,
  };
}

/** Full strength mid-tunnel; fades in at the far end and out as it passes. */
function depthAlpha(z) {
  if (z > FAR - 180) return (FAR - z) / 180;
  if (z < NEAR + 160) return Math.max(0, (z - NEAR) / 160);
  return 1;
}

/** The layout only splits into two columns at lg; below that there is nothing
 *  for the stream to occupy. */
const MIN_WIDTH = "(min-width: 1024px)";

export function TechStream({ className = "" }) {
  const canvasRef = useRef(null);
  const [isRunning, setRunning] = useState(false);
  const [hasColumn, setHasColumn] = useState(false);

  // Watched rather than read once, so rotating a tablet across the boundary
  // starts or stops the field instead of leaving it in the wrong state.
  useEffect(() => {
    const query = window.matchMedia(MIN_WIDTH);
    const update = () => setHasColumn(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!hasColumn) {
      setRunning(false);
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return; // Leave the gradient in place.

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Seeded so the first frame is stable rather than different every reload.
    let seed = 20260820;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    const count = COUNT_DESKTOP;
    const baseFont = BASE_FONT_DESKTOP;

    let width = 0;
    let height = 0;
    let spreadX = 0;
    let spreadY = 0;
    let fragments = [];
    let fontFamily = "ui-monospace, monospace";

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const perspective = FOCAL / SPREAD_DEPTH;
      const previousX = spreadX;
      const previousY = spreadY;
      spreadX = (width * SPREAD_X_RATIO) / perspective;
      spreadY = (height * SPREAD_Y_RATIO) / perspective;

      /* Fragments already in flight hold coordinates scaled to the old frame.
         Rescaling them here means a rotated phone re-fills correctly at once,
         rather than looking wrong until the whole field has cycled through. */
      if (previousX && previousY && fragments.length) {
        const ratioX = spreadX / previousX;
        const ratioY = spreadY / previousY;
        for (const fragment of fragments) {
          fragment.x *= ratioX;
          fragment.y *= ratioY;
        }
      }
    };
    resize();

    fragments = Array.from({ length: count }, () =>
      makeFragment(random, spreadX, spreadY),
    );

    /* Match the site's own monospace face. Next generates the family name at
       build time, so it has to be read off an element rather than hard-coded. */
    const probe = document.querySelector(".font-mono");
    if (probe) fontFamily = getComputedStyle(probe).fontFamily || fontFamily;

    // Pointer and scroll both move the camera, never the fragments — parallax
    // has to come from the viewpoint or the depth cue falls apart.
    let pointerX = 0;
    let pointerY = 0;
    let cameraX = 0;
    let cameraY = 0;
    let scrollBoost = 0;

    const onPointerMove = (event) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      scrollBoost = Math.min(window.scrollY / window.innerHeight, 1);
    };

    const draw = (elapsed) => {
      context.clearRect(0, 0, width, height);

      // Ease the camera toward the pointer instead of snapping to it.
      cameraX += (pointerX * 55 - cameraX) * 0.045;
      cameraY += (pointerY * 34 - cameraY) * 0.045;

      const centreX = width * VANISHING_X - cameraX;
      const centreY = height / 2 - cameraY;

      // Nearer fragments must paint over further ones.
      fragments.sort((a, b) => b.z - a.z);

      for (const fragment of fragments) {
        if (elapsed > 0) {
          fragment.z -= SPEED * fragment.rate * (1 + scrollBoost) * elapsed;
          if (fragment.z <= NEAR) {
            Object.assign(fragment, makeFragment(random, spreadX, spreadY));
            fragment.z = FAR;
          }
        }

        const scale = FOCAL / fragment.z;
        const size = baseFont * scale;
        // Below about six pixels a monospace line stops reading as anything
        // and just adds grain, so it is cheaper and cleaner to skip it.
        if (size < 6) continue;

        const screenX = centreX + fragment.x * scale;
        const screenY = centreY + fragment.y * scale;
        // Monospace advance is close enough to 0.6em to cull on without
        // paying for a measureText call every fragment every frame.
        const runWidth = fragment.text.length * size * 0.6;
        if (
          screenX > width ||
          screenX + runWidth < 0 ||
          screenY < -size ||
          screenY > height + size
        ) {
          continue;
        }

        /* The quiet zone is measured at the run's midpoint, so a fragment
           reaching into the copy column fades as a whole rather than getting
           clipped part-way along. */
        const midpoint = screenX + Math.min(runWidth, width) / 2;
        const clearance = Math.max(
          0,
          Math.min(1, (midpoint / width - QUIET_UNTIL) / QUIET_RAMP),
        );

        const alpha = depthAlpha(fragment.z) * PEAK_ALPHA * clearance;
        if (alpha <= 0.012) continue;

        context.font = `${size.toFixed(1)}px ${fontFamily}`;
        context.fillStyle = `rgba(${fragment.colour}, ${alpha.toFixed(3)})`;
        context.fillText(fragment.text, screenX, screenY);
      }
    };

    let frame = 0;
    let last = 0;
    let visible = true;
    let onScreen = true;

    const loop = (now) => {
      const elapsed = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      draw(elapsed);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (frame || !visible || !onScreen || reduceMotion) return;
      last = 0;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const begin = () => {
      resize();
      if (reduceMotion) {
        // A still frame: the field is composition as much as movement, so
        // removing the animation should not remove the background.
        draw(0);
      } else {
        start();
      }
      setRunning(true);
    };

    // Waiting on the font stops the first frames rendering in a fallback face
    // and then visibly reflowing once the real one loads.
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (probe)
          fontFamily = getComputedStyle(probe).fontFamily || fontFamily;
        begin();
      });
    } else {
      begin();
    }

    const onResize = () => {
      resize();
      if (reduceMotion) draw(0);
    };
    const onVisibility = () => {
      visible = !document.hidden;
      visible ? start() : stop();
    };

    // No reason to burn frames on a canvas that has scrolled out of the way.
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        onScreen ? start() : stop();
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [hasColumn]);

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      {/* Shown until the canvas is running, and permanently if it never is. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            /* Anchored over the stream's territory on the right. Centred, as
               it was, this washed the copy column in brand blue — which is
               what left a cyan accent sitting on a blue ground with almost no
               separation between them. */
            "radial-gradient(70% 60% at 84% 46%, rgba(14,89,242,0.34) 0%, rgba(10,10,10,0) 68%), radial-gradient(40% 34% at 74% 26%, rgba(77,225,255,0.16) 0%, rgba(10,10,10,0) 72%)",
        }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
          isRunning ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
