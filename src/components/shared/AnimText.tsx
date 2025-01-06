import { useState, useEffect, useRef } from "react";

interface AnimTextProps {
  text: string;
  fontSize?: string; 
  fontWeight?: string;
  color?: string;
  underlinePosition?: { top?: string; bottom?: string; left?: string; right?: string }; 
  svgStrokeWidth?: number; 
  svgCurveHeight?: number; 
  fontFamily?: string
}

const AnimText = ({
  text,
  fontSize = "2xl", 
  fontWeight = "bold", 
  color = "text-gray-900", 
  underlinePosition = { bottom: "-4px", left: "0%" },
  svgStrokeWidth = 3, 
  svgCurveHeight = 6, 

}: AnimTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); 
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {

    const resizeObserver = new ResizeObserver(() => {
      if (textRef.current) {
        setTextWidth(textRef.current.getBoundingClientRect().width);
      }
    });

    if (textRef.current) {
      resizeObserver.observe(textRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [text]);

  return (
    <p
      className={`relative inline-block ${isVisible ? 'animate-visible' : ''}`}
      //@ts-ignore
      ref={textRef}
    >
      <span
        className={`font-${fontWeight} ${color} text-${fontSize} font-bebas ${isVisible ? 'animate-fade-in' : ''}`}
      >
        {text}
      </span>

      {isVisible && (
        <svg
          className="absolute"
          width={textWidth} 
          height={svgStrokeWidth + svgCurveHeight}
          viewBox={`0 0 ${textWidth} ${svgStrokeWidth + svgCurveHeight}`} 
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            top: underlinePosition.top,
            bottom: underlinePosition.bottom,
            left: underlinePosition.left,
            right: underlinePosition.right,
          }}
        >

          <path
            d={`M0,${svgCurveHeight} C${textWidth / 4},${svgCurveHeight + 4} ${textWidth / 2},${svgCurveHeight - 4} ${textWidth},${svgCurveHeight}`} 
            stroke="#F39EA2" 
            strokeWidth={svgStrokeWidth}
            strokeLinecap="round"
            className="animate-draw"
            style={{ animationDelay: '0s' }}
          />
          
        
          <path
            d={`M${textWidth},${svgCurveHeight} C${textWidth / 4 * 3},${svgCurveHeight + 4} ${textWidth / 2},${svgCurveHeight - 4} 0,${svgCurveHeight}`} 
            stroke="#F39EA2"
            strokeWidth={svgStrokeWidth}
            strokeLinecap="round"
            className="animate-draw"
            style={{ animationDelay: '1s' }}
          />


          <path
            d={`M0,${svgCurveHeight} C${textWidth / 4},${svgCurveHeight + 4} ${textWidth / 2},${svgCurveHeight - 4} ${textWidth},${svgCurveHeight}`} 
            stroke="#F39EA2"
            strokeWidth={svgStrokeWidth}
            strokeLinecap="round"
            className="animate-draw"
            style={{ animationDelay: '2s' }}
          />
        </svg>
      )}
    </p>
  );
};

export default AnimText;
