import React, { memo } from "react";
import { FaFacebookF, FaInstagram, FaEnvelope, FaWhatsapp } from "react-icons/fa";

// Type definition for social links
interface SocialLink {
  icon: "facebook" | "instagram" | "email" | "whatsapp";
  label: string;
  href: string;
}

// Helper function to return the appropriate social icon based on the icon name
const getSocialIcon = (icon: "facebook" | "instagram" | "email" | "whatsapp") => {
  switch (icon) {
    case "facebook":
      return <FaFacebookF className="w-6 h-6" />;
    case "instagram":
      return <FaInstagram className="w-6 h-6" />;
    case "email":
      return <FaEnvelope className="w-6 h-6" />;
    case "whatsapp":
      return <FaWhatsapp className="w-6 h-6" />;
    default:
      return null;
  }
};

// SocialLinksSection component with proper types
interface SocialLinksSectionProps {
  socialLinks: SocialLink[];
}

const SocialLinksSection: React.FC<SocialLinksSectionProps> = memo(({ socialLinks }) => (
  <div>
    <h3 className="font-medium text-gray-900 mt-8 text-lg">Follow Us</h3>
    <ul className="flex gap-4 mt-6">
      {socialLinks.map((social, idx) => (
        <li key={idx}>
          <a
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Follow us on ${social.label}`}
            className="text-gray-700 transition hover:text-gray-800"
          >
            {getSocialIcon(social.icon)}
          </a>
        </li>
      ))}
    </ul>
  </div>
));

export default SocialLinksSection;
