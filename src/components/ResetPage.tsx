import { useEffect } from 'react';

const ScrollToTopOnReload: React.FC = () => {
  useEffect(() => {
   
    window.scrollTo(0, 0);
  }, []);

  return null; 
};

export default ScrollToTopOnReload;
