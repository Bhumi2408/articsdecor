"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const ABOUT =
  "ARTICS DECORR brings to you the topmost niche quality and unmatched styles for your outdoors. It has provided its customers profound satisfaction and comfort when it comes to outdoor wicker furniture.";

const SOCIALS = [
  {
    icon: faFacebookF,
    label: "Facebook",
    href: "https://www.facebook.com/people/Artics-Decor/100086429426276/",
  },
  {
    icon: faYoutube,
    label: "YouTube",
    href: "https://www.youtube.com/@articsdecor",
  },
  {
    icon: faInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/articsdecor8/",
  },
];

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Products", href: "/products" },
  { label: "Shop", href: "/shop" },
  { label: "Materials", href: "/materials" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Return & Refund", href: "/delivery-returns" },
];

const HEADING = "text-[21px] font-bold leading-tight text-white";

const LINK =
  "leading-[1.3] text-white transition-colors duration-200 hover:text-[#E0A63F]";

function LinkList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className={LINK}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();

        if (!cancelled) {
          setCategories(Array.isArray(data?.items) ? data.items : []);
        }
      } catch (error) {
        console.error("FOOTER CATEGORY MENU ERROR:", error);

        if (!cancelled) {
          setCategories([]);
        }
      }
    };

    fetchCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * Categories database se aa rahi hain.
   * Har category ka name + slug automatically use hoga.
   */
  const dynamicCategories = categories.map((category) => ({
    label: category.name,
    href: `/product-category/${category.slug}`,
  }));

  /*
   * Footer mein 2 columns maintain karne ke liye
   * categories ko half-half divide kar rahe hain.
   */
  const middle = Math.ceil(dynamicCategories.length / 2);

  const categoriesA = dynamicCategories.slice(0, middle);
  const categoriesB = dynamicCategories.slice(middle);

  return (
    <footer className="w-full bg-black text-white">
      <div className="grid grid-cols-1 lg:grid-cols-[33%_1fr]">
        {/* ==================== LEFT — image panel ==================== */}
        <div className="relative overflow-hidden px-8 py-14 sm:px-12 lg:px-14 lg:py-14">
          <Image
            src="/home/footer.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/70" />

          <div className="relative z-10">
            <h2 className="text-[26px] font-bold tracking-[0.5px] text-white">
              ARTICS DECORR
            </h2>

            <p className="mt-6 max-w-[510px] text-[17px] leading-[1.5] text-white">
              {ABOUT}
            </p>

            <div className="mt-10 flex gap-3.5">
              {SOCIALS.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border-2 border-white text-[18px] text-white transition-colors duration-300 hover:border-[#E0A63F] hover:text-[#E0A63F]"
                >
                  <FontAwesomeIcon icon={icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ==================== RIGHT — links panel ==================== */}
        <div className="flex flex-col px-8 py-14 sm:px-12 lg:px-14 lg:pb-12 lg:pt-[70px]">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-[0.9fr_0.9fr_1.2fr_1fr]">
            {/* Quick Link */}
            <div>
              <h3 className={HEADING}>Quick Link</h3>

              <div className="mt-7">
                <LinkList items={QUICK_LINKS} />
              </div>
            </div>

            {/* Top Categories — column 1 */}
            <div>
              <h3 className={HEADING}>Top Categories</h3>

              <div className="mt-7">
                {categoriesA.length > 0 ? (
                  <LinkList items={categoriesA} />
                ) : (
                  <p className="text-sm text-white/60">
                    No categories available.
                  </p>
                )}
              </div>
            </div>

            {/* Top Categories — column 2 */}
            <div className="xl:pt-[52px]">
              {categoriesB.length > 0 && <LinkList items={categoriesB} />}
            </div>

            {/* Locations */}
            <div>
              <h3 className={HEADING}>Locations</h3>

              <address className="mt-7 max-w-[290px] text-[17px] not-italic leading-[1.5] text-white">
                A4/3/15, South Side, G.T. Road, Industrial Area, Vijay Nagar,
                Ghaziabad &ndash; 201009, Uttar Pradesh, India
              </address>

              <div className="mt-8 space-y-3">
                <p className="text-[16px] leading-[1.3] text-white">
                  <span className="font-bold">Phone:</span>{" "}
                  <a
                    href="tel:+918860166301"
                    className="transition-colors hover:text-[#E0A63F]"
                  >
                    +91 8860166301
                  </a>
                </p>

                <p className="text-[16px] leading-[1.3] text-white">
                  <span className="font-bold">Email:</span>{" "}
                  <a
                    href="mailto:articsdecorr@gmail.com"
                    className="text-[15px] text-[#E0A63F] transition-opacity hover:opacity-80"
                  >
                    articsdecorr@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* ==================== COPYRIGHT ==================== */}
          <p className="mt-auto pt-14 text-[17px] text-white lg:text-right">
            Copyright &copy; {new Date().getFullYear()} ARTICS DECORR |
            Powered by{" "}
            <Link
              href="https://www.cybertricksmedia.com/"
              className="text-[#E0A63F]"
              target="_blank"
            >
              Cybertricksmedia Pvt Ltd
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}