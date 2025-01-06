import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";

interface HighlighterProps {
  text: string;
  lineColor?: string;
  strokeWidth?: number;
  fontSize?: string;
  lineStyle?: "underline" | "strikethrough" | "overline";
  opacity?: number;
  animationDuration?: number;
  className?: string;
}

const Highlighter: React.FC<HighlighterProps> = ({
  text,
  lineColor = "#FFD700",
  strokeWidth = 4,
  fontSize = "text-lg",
  lineStyle = "underline",
  opacity = 0.8,
  animationDuration = 2,
  className,
}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasRun, setHasRun] = useState(false); 
  const ref = useRef<HTMLSpanElement>(null);

  
  const validLineStyles = ["underline", "strikethrough", "overline"];
  if (!validLineStyles.includes(lineStyle)) {
    console.warn(`Invalid lineStyle prop value "${lineStyle}". Defaulting to "underline".`);
  }

  
  const observerCallback = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting && !hasRun) { 
      setIsInView(true);
      setHasRun(true); 
    }
  }, [hasRun]);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, { threshold: 0.5 });
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, [observerCallback]);

  
  const linePosition = useMemo(() => {
    const positions = {
      underline: { x1: "0%", y1: "100%", x2: "100%", y2: "100%" },
      strikethrough: { x1: "0%", y1: "50%", x2: "100%", y2: "50%" },
      overline: { x1: "0%", y1: "0%", x2: "100%", y2: "0%" },
    };
    return positions[lineStyle];
  }, [lineStyle]);

  return (
    <span ref={ref} className="relative inline-block">

      <span className={`relative z-10 ${fontSize} font-semibold ${className}`}>{text}</span>


      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
      >
        <line
          {...linePosition}
          stroke={lineColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          opacity={opacity}
          className={`transition-all ease-in-out ${
            isInView ? "stroke-dashoffset-0" : "stroke-dashoffset-100"
          }`}
          style={{
            strokeDasharray: "100",
            strokeDashoffset: isInView ? "0" : "100",
            transition: `stroke-dashoffset ${animationDuration}s ease-in-out`,
          }}
        />
      </svg>
    </span>
  );
};

export default Highlighter;
