import React from "react";

interface CollectionLayoutProps {
  children: React.ReactNode;
}

const CollectionLayout: React.FC<CollectionLayoutProps> = ({ children }) => {
  return (
    <section className="flex  justify-between overflow-x-hidden w-full">
      {children}
    </section>
  );
};

export default CollectionLayout;
