// import { memo } from "react";
// import LogoSection from "./LogoSection";
// import LinkSection from "./LinkSection";
// import SocialLinksSection from "./SocialLinksSection";
// import PaymentSection from "./PaymentSection";
// import FooterBottom from "./FooterBottom";

// // Define the type for footerData
// interface FooterLink {
//   name: string;
//   to: string;
// }

// interface FooterSection {
//   title: string;
//   links: FooterLink[];
// }

// const Footer = memo(() => {
//   const footerData: FooterSection[] = [
//     {
//       title: "Quick Links",
//       links: [
//         { name: "Home", to: "/" },
//         { name: "Shop", to: "/shop" },
//         { name: "About Us", to: "/about" },
//         { name: "Contact", to: "/contact" },
//         { name: "FAQs", to: "/faq" },
//       ],
//     },
//     {
//       title: "Legal",
//       links: [
//         { name: "Terms & Conditions", to: "/terms" },
//         { name: "Privacy Policy", to: "/privacy" },
//       ],
//     },
//   ];

// const socialLinks = [
//   { icon: "facebook", label: "Facebook", href: "https://facebook.com" },
//   { icon: "instagram", label: "Instagram", href: "https://instagram.com" },
//   { icon: "email", label: "Email", href: "mailto:example@example.com" },
//   { icon: "whatsapp", label: "WhatsApp", href: "https://wa.me/your-phone-number" },
// ];


//   return (
//     <footer className="bg-white py-12 relative">
//       <div className="mx-auto max-w-screen-xl px-6">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
//           <LogoSection />
//           <LinkSection footerData={footerData} />
//           <PaymentSection />
//           <SocialLinksSection  socialLinks={socialLinks} /> {/* Pass socialLinks prop here */}
//         </div>
//         <FooterBottom />
//       </div>
//     </footer>
//   );
// });

// export default Footer;
