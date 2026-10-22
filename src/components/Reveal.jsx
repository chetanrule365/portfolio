import { useEffect, useRef, useState } from "react";

const presets = {
  fade: {
    hidden: { opacity: 0, transform: "translateY(16px)" },
    visible: { opacity: 1, transform: "translateY(0)" },
  },
  bounce: {
    hidden: { opacity: 0, transform: "translateY(28px) scale(0.96)" },
    visible: { opacity: 1, transform: "translateY(0) scale(1)" },
  },
  zoom: {
    hidden: { opacity: 0, transform: "scale(0.9)" },
    visible: { opacity: 1, transform: "scale(1)" },
  },
};

function Reveal({ children, delay = 0, effect = "fade", className }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const preset = presets[effect] || presets.fade;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(visible ? preset.visible : preset.hidden),
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

export function Fade({ children, delay = 0, className }) {
  return (
    <Reveal effect="fade" delay={delay} className={className}>
      {children}
    </Reveal>
  );
}

export function Bounce({ children, delay = 0, className }) {
  return (
    <Reveal effect="bounce" delay={delay} className={className}>
      {children}
    </Reveal>
  );
}

export function Zoom({ children, delay = 0, className }) {
  return (
    <Reveal effect="zoom" delay={delay} className={className}>
      {children}
    </Reveal>
  );
}

export default Reveal;
