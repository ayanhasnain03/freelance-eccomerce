// LinkSection.js
import React from 'react';
import { Link } from 'react-router-dom';

const LinkSection = ({ footerData }: any) => (
  <div>
    {footerData.map((section: any, index: number) => (
      <div key={index}>
        <h3 className="font-medium text-gray-900 text-lg">{section.title}</h3>
        <ul className="mt-6 space-y-4 text-sm text-gray-700">
          {section.links.map((link: any, idx: number) => (
            <li key={idx}>
              <Link to={link.to} className="transition hover:text-gray-800">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default LinkSection;
