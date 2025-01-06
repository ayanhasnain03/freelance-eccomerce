import React from "react";

interface CollectionLayoutProps {
  children: React.ReactNode;
}

const CollectionLayout: React.FC<CollectionLayoutProps> = ({ children }) => {
  return (
    <section className="flex flex-col md:flex-row h-full overflow-x-hidden w-full">
      {children}
    </section>
  );
};

export default CollectionLayout;
