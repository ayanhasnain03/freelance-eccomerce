// SocialLinksSection.js

import { FaFacebookF, FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const SocialLinksSection = ({ socialLinks }: any) => (
  <div>
    <h3 className="font-medium text-gray-900 text-lg">Follow Us</h3>
    <ul className="flex gap-4 mt-6">
      {socialLinks.map((social: any, idx: number) => (
        <li key={idx}>
          <a
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className="text-gray-700 transition hover:text-gray-800"
          >
            {social.icon === "facebook" && <FaFacebookF className="w-6 h-6" />}
            {social.icon === "instagram" && <FaInstagram className="w-6 h-6" />}
            {social.icon === "email" && <FaEnvelope className="w-6 h-6" />}
            {social.icon === "whatsapp" && <FaWhatsapp className="w-6 h-6" />}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default SocialLinksSection;
