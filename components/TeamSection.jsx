// components/TeamSection.jsx
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faXTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function TeamSection() {
  return (
    <section className="bg-[#faf8f5] py-20">
      <div className="container-lute text-center">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-600">
          The People Behind It
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900 mt-3 mb-14">
          Our Team
        </h2>

        <div className="flex justify-center">
          <div className="group flex flex-col items-center w-full max-w-xs">
            {/* Image */}
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
              <img
                src="/mrlute.jpg"
                alt="Mark Jance"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Social icons - slide up on hover */}
              <div className="absolute left-0 right-0 -bottom-14 group-hover:bottom-5 flex justify-center gap-2.5 transition-all duration-300 ease-out">
                <a
                  href="https://www.facebook.com/people/Lute-Diamonds/61592089116019/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-amber-500 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faFacebookF} className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.instagram.com/lutediamonds/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-amber-500 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faInstagram} className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/lutediamonds/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-amber-500 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Name + role */}
            <h3 className="text-amber-600 text-lg font-semibold mt-5">Itumeleng Lute</h3>
            <p className="text-gray-600 text-sm mt-1">CEO - Founder</p>
          </div>
        </div>
      </div>
    </section>
  );
}