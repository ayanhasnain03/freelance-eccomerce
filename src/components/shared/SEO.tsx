
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, keywords, image, url }: any) => {
  const defaultTitle = "Fash Alt";
  const defaultDescription = "Fash Alt - Your go-to online store for the latest fashion trends. Shop now for the best deals on clothing, shoes, and accessories.";
  const defaultImage = "/fashalt.svg"; 
  const defaultUrl = "http://localhost:5173/";

  return (
    <Helmet>
 
      <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>

     
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || "ecommerce, products, online shopping"} />


      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || defaultUrl} />
      <meta property="og:type" content="website" />


      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
};

export default SEO;
