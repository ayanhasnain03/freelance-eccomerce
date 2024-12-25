import React from 'react';

interface SkeletonProps {
  height?: string | number;
  width?: string | number;
  quantity?: number;
  borderRadius?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  height = '20px',
  width = '100%',
  quantity = 1,
  borderRadius = '4px',
  className = '',
}) => {
  const skeletons = Array.from({ length: quantity }, (_, index) => index);

  return (
    <div className={`space-y-4 ${className}`}>
      {skeletons.map((_, index) => (
        <div
          key={index}
          style={{
            height,
            width,
            borderRadius,
          }}
          className="bg-gray-300 animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default Skeleton;
