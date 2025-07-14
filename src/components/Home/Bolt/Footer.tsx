"use client";

import { FileText, Mail, Phone, MapPin, Globe, Shield, Linkedin, Twitter, Github } from "lucide-react";

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "API Documentation", href: "#" },
    { name: "Integrations", href: "#" },
    { name: "Security", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
    { name: "Contact", href: "#" },
  ],
  resources: [
    { name: "Documentation", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "Community", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Webinars", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "GDPR Compliance", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Data Processing", href: "#" },
  ],
};

const offices = [
  {
    region: "Europe",
    address: "Prinsengracht 263, 1016 GV Amsterdam, Netherlands",
    phone: "+31 20 123 4567",
    email: "eu@documind.ai",
  },
  {
    region: "North America",
    address: "123 Tech Street, San Francisco, CA 94105, USA",
    phone: "+1 (555) 123-4567",
    email: "us@documind.ai",
  },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">DocuMind AI</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transform your document processing with AI-powered OCR. Trusted by finance teams across Europe and North America.
            </p>
            <div className="flex gap-4">
              <button className="inline-flex items-center justify-center rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm font-medium text-gray-300 shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors">
                <Linkedin className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center justify-center rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm font-medium text-gray-300 shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors">
                <Twitter className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center justify-center rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm font-medium text-gray-300 shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors">
                <Github className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="my-8 border-t border-gray-800"></div>

        {/* Office Information */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-8">
          {offices.map((office) => (
            <div key={office.region} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-blue-400" />
                <h3 className="font-semibold text-white">{office.region}</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <p>{office.address}</p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{office.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{office.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="my-8 border-t border-gray-800"></div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>© 2024 DocuMind AI. All rights reserved.</span>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>SOC 2 Type II Certified</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center rounded-full border border-gray-600 px-3 py-1 text-xs font-medium text-gray-300">
              <Globe className="mr-1 h-3 w-3" />
              GDPR Compliant
            </span>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Available in:</span>
              <span className="text-white">🇺🇸 EN</span>
              <span className="text-white">🇩🇪 DE</span>
              <span className="text-white">🇳🇱 NL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
