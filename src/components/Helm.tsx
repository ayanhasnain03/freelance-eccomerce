import React from "react";
import { Helmet } from "react-helmet";

interface HelmProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const Helm: React.FC<HelmProps> = ({
  title,
  description,
  keywords = "fashion, online shopping, shoes, accessories, fashion trends, women's fashion, men's fashion, latest fashion, stylish clothing, trendy accessories",
  image = "",
  url = "https://freelance-eccomerce.vercel.app",
}) => {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default Helm