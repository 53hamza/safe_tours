// components/Footer.js
"use client";

import React from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  const companyName = "Safe Tours And Travels";
  const logoSrc = "/images/safe-logo.svg"; 
  const mapUrl = "https://share.google/6IwcxE51mRJIqsOSf";
  const phone= "+91-9156205253";
  const phone2 = "+91-9028475253";
  const email = "safe@tours.com";

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Our Cars", href: "/services" },
    // { label: "Contact / Map", href: mapUrl, external: true },
  ];

  const socialLinks = [
    {
      icon: <FaInstagram />,
      href: "https://www.instagram.com/safe.toursandtravels?igsh=MWVibHV3am1jM3F1cw==",
      label: "Instagram",
    },
    // {
    //   icon: <FaFacebookF />,
    //   href: "https://www.facebook.com",
    //   label: "Facebook",
    // },
  ];

  return (
    <footer className="site-footer bg-dark">
      <div className="side-space section-space">
        <div className="row g-3">
          {/* Logo & description */}
          <div className="col-12 col-md-4">
            <div className="d-flex flex-column align-items-start gap-3">
              <img
                src={logoSrc}
                alt={`${companyName} logo`}
                className="footer-logo"
                loading="lazy"
              />
              <div>
                {/* <h5 className="footer-company mb-1">{companyName}</h5> */}
                <p className="footer-desc mb-0">
                  Reliable airport transfers, outstation trips and local rides —
                  comfortable vehicles and experienced drivers. Book with
                  confidence.
                </p>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="col-6 col-md-2">
            <h6 className="footer-title text-uppercase">Quick Links</h6>
            <ul className="list-unstyled footer-links mt-3">
              {quickLinks.map((link, idx) => (
                <li key={idx} className="mb-2">
                  <a
                    href={link.href}
                    className="footer-link"
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-6 col-md-3">
            <h6 className="footer-title text-uppercase">Contact</h6>
            <ul className="list-unstyled mt-3 footer-contact">
              <li>
                <span>Phone:</span>{" "}
                <a className="footer-link" href={`tel:${phone}`}>
                  {phone},
                </a>
                <a className="footer-link" href={`tel:${phone2}`}>
                  {phone2}
                </a>
              </li>
              <li className="mt-2">
                <span>Email:</span>{" "}
                <a className="footer-link" href={`mailto:${email}`}>
                  {email}
                </a>
              </li>
              <li className="mt-2">
                <span>Location:</span>{" "}
                <a
                  className="footer-link"
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View map
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-12 col-md-3">
            <h6 className="footer-title text-uppercase">Follow Us</h6>
            <p className="text-white mt-3">
              Stay connected for offers and updates
            </p>

            <div className="d-flex gap-3">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* bottom row */}
      <div className="row safe-rights pt-2 pb-2">
        <div className="col-12 text-center text-white small">
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
