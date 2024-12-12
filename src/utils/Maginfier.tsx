import React, { useState } from "react";

interface MagnifierProps {
  imgSrc: string;
  imgWidth?: number;
  imgHeight?: number;
  magnifierRadius: number;
}

const Magnifier: React.FC<MagnifierProps> = ({
  imgSrc,
  imgWidth = 300,
  imgHeight = 300,
  magnifierRadius,
}) => {
  const [magnifierState, setMagnifierState] = useState({
    top: 0,
    left: 0,
    offsetX: 0,
    offsetY: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ position: "relative" }}>
        {/* Main Image */}
        <img
          src={imgSrc}
          width={imgWidth}
          height={imgHeight}
          style={{
            maxHeight: "50vh",
            maxWidth: "50vw",
            height: "auto",
            width: "auto",
            cursor: "pointer",
          }}
          onMouseMove={(e) => {
            setIsVisible(true);
            const smallImage = e.currentTarget;
            const x = e.nativeEvent.offsetX;
            const y = e.nativeEvent.offsetY;
            setMagnifierState({
              top: y - magnifierRadius,
              left: x - magnifierRadius,
              offsetX:
                (x / smallImage.width) * smallImage.naturalWidth -
                magnifierRadius,
              offsetY:
                (y / smallImage.height) * smallImage.naturalHeight -
                magnifierRadius,
            });
          }}
          onMouseLeave={() => setIsVisible(false)}
        />
        {/* Magnifying Glass */}
        <div
          style={{
            position: "absolute",
            pointerEvents: "none",
            border: "4px solid #efefef",
            zIndex: 99,
            display: isVisible ? "block" : "none",
            background: `url("${imgSrc}") no-repeat`,
            backgroundSize: "cover",
            width: 2 * magnifierRadius,
            height: 2 * magnifierRadius,
            borderRadius: "50%",
            top: `${magnifierState.top}px`,
            left: `${magnifierState.left}px`,
            backgroundPositionX: `-${magnifierState.offsetX}px`,
            backgroundPositionY: `-${magnifierState.offsetY}px`,
            boxShadow: "0 5px 10px -2px rgba(0, 0, 0, 0.3)",
            transition: "opacity 0.2s",
            opacity: isVisible ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
};

export default Magnifier;
