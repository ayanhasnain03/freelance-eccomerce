import React from "react";

interface CollectionLayoutProps {
  children: React.ReactNode;
}

const CollectionLayout: React.FC<CollectionLayoutProps> = ({ children }) => {
  return (
    <section className="flex flex-col md:flex-row h-full w-full">
      <div className="md:w-[200px] flex-shrink-0">
        {React.Children.toArray(children)[0]}
      </div>
      <div className="flex-1 overflow-x-hidden">
        {React.Children.toArray(children)[1]}
      </div>
    </section>
  );
};

export default CollectionLayout;
