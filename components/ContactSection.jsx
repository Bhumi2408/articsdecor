"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faArrowRight,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp,
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

export default function ContactSection() {
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setSending(true);

    try {
      // Yahan apni API laga sakte ho
      await new Promise((resolve) => setTimeout(resolve, 700));

      e.target.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#f7f8fa]">

      {/* =====================================================
          CONTACT INFO
      ====================================================== */}
      <div className="mx-auto max-w-[1450px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">

        <div className="mb-12 flex flex-col justify-between gap-5 md:mb-16 md:flex-row md:items-end">
          <div>
            <span className="mb-4 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#770800]">
              <span className="h-px w-8 bg-[#770800]" />
              Get In Touch
            </span>

            <h2 className="max-w-[650px] text-[36px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#123452] sm:text-[46px] lg:text-[56px]">
              Let&apos;s create something
              <span className="block text-[#770800]">
                beautiful together.
              </span>
            </h2>
          </div>

          <p className="max-w-[390px] text-[14px] leading-7 text-[#637386] md:pb-1">
            Whether you are planning an outdoor space, hospitality project,
            commercial setup or simply looking for the right piece of
            furniture, our team is here to help.
          </p>
        </div>

        {/* =====================================================
            INFO CARDS
        ====================================================== */}
        <div className="grid gap-4 border-y border-[#dce2e8] py-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* ADDRESS */}
          <div className="group flex items-start gap-5 border-b border-[#dce2e8] pb-5 sm:border-b-0 sm:border-r sm:pr-8 lg:pb-0">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#123452] text-white transition-all duration-300 group-hover:bg-[#770800] group-hover:text-white">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-[17px]"
              />
            </div>

            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a96a3]">
                Our Address
              </p>

              <p className="max-w-[330px] text-[14px] leading-6 text-[#183957]">
                A4/3/15, South Side, G.T. Road,
                <br />
                Industrial Area, Vijay Nagar,
                <br />
                Ghaziabad – 201009, Uttar Pradesh, India
              </p>
            </div>
          </div>

          {/* PHONE */}
          <a
            href="tel:+918860166301"
            className="group flex items-start gap-5 border-b border-[#dce2e8] pb-5 transition-colors duration-300 hover:text-[#770800] sm:border-b-0 sm:border-r sm:px-8 lg:pb-0"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#123452] text-white transition-all duration-300 group-hover:bg-[#770800] group-hover:text-white">
              <FontAwesomeIcon icon={faPhone} className="text-[16px]" />
            </div>

            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a96a3]">
                Phone Number
              </p>

              <p className="text-[15px] font-medium text-[#183957] transition-colors group-hover:text-[#770800]">
                +91 8860166301
              </p>

              <span className="mt-1 block text-[12px] text-[#8793a0]">
                Mon – Sat · 10:00 AM – 6:00 PM
              </span>
            </div>
          </a>

          {/* EMAIL */}
          <a
            href="mailto:articsdecor@gmail.com"
            className="group flex items-start gap-5 sm:px-0 lg:pl-8"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#123452] text-white transition-all duration-300 group-hover:bg-[#770800] group-hover:text-white">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-[16px]"
              />
            </div>

            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a96a3]">
                Email
              </p>

              <p className="text-[15px] font-medium text-[#183957] transition-colors group-hover:text-[#770800]">
                articsdecor@gmail.com
              </p>

              <span className="mt-1 block text-[12px] text-[#8793a0]">
                We&apos;ll reply as soon as possible
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTACT AREA
      ====================================================== */}
      <div className="mx-auto max-w-[1450px] px-5 pb-16 sm:px-8 lg:px-12 lg:pb-24">

        <div className="grid overflow-hidden rounded-[28px] bg-[#123452] shadow-[0_25px_70px_rgba(18,52,82,0.14)] lg:grid-cols-[0.9fr_1.1fr]">

          {/* =================================================
              LEFT — MAP
          ================================================== */}
          <div className="relative min-h-[430px] overflow-hidden lg:min-h-[680px]">

            {/* map */}
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.662318004458!2d77.440612!3d28.639881100000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef376265285f%3A0x30c37dfcde11a4f1!2sArtics%20Decor!5e0!3m2!1sen!2sin!4v1788269532250!5m2!1sen!2sin" className="absolute inset-0 h-full w-full border-0 grayscale-[0.15]"
              loading="lazy" ></iframe>

            {/* map overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#123452]/80 via-transparent to-transparent" />

            {/* Location label */}
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
              <div className="flex items-center gap-4 rounded-2xl border border-white/20 bg-[#123452]/90 p-4 text-white backdrop-blur-md">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#c88a20]">
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>

                <div>
                  <p className="text-[12px] font-semibold">
                    Artics Decorr
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-white/65">
                    Vijay Nagar, Ghaziabad
                    <br />
                    Uttar Pradesh, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT — FORM
          ================================================== */}
          <div className="relative px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-16">

            {/* decorative line */}
            <div className="absolute right-0 top-0 h-full w-[3px] bg-white" />

            <div className="max-w-[600px]">

              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#d9a441]">
                Send A Message
              </span>

              <h3 className="mt-4 text-[32px] font-semibold leading-tight text-white sm:text-[40px]">
                Tell us what
                <span className="block text-[#d9a441]">
                  you have in mind.
                </span>
              </h3>

              <p className="mt-4 max-w-[470px] text-[13px] leading-6 text-white/55">
                Have a question about our products, materials or a custom
                requirement? Drop us a message and our team will get back to
                you.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-10"
              >

                {/* NAME */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div className="group">
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55"
                    >
                      First Name
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      placeholder="Your first name"
                      className="h-14 w-full border-b border-white/20 bg-transparent px-0 text-[14px] text-white outline-none placeholder:text-white/25 transition-colors focus:border-[#d9a441]"
                    />
                  </div>

                  <div className="group">
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55"
                    >
                      Last Name
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      placeholder="Your last name"
                      className="h-14 w-full border-b border-white/20 bg-transparent px-0 text-[14px] text-white outline-none placeholder:text-white/25 transition-colors focus:border-[#d9a441]"
                    />
                  </div>

                </div>

                {/* EMAIL */}
                <div className="mt-7">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="h-14 w-full border-b border-white/20 bg-transparent px-0 text-[14px] text-white outline-none placeholder:text-white/25 transition-colors focus:border-[#d9a441]"
                  />
                </div>

                {/* PHONE */}
                <div className="mt-7">
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91"
                    className="h-14 w-full border-b border-white/20 bg-transparent px-0 text-[14px] text-white outline-none placeholder:text-white/25 transition-colors focus:border-[#d9a441]"
                  />
                </div>

                {/* MESSAGE */}
                <div className="mt-7">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55"
                  >
                    Your Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us a little about your requirement..."
                    className="w-full resize-none border-b border-white/20 bg-transparent px-0 py-3 text-[14px] leading-6 text-white outline-none placeholder:text-white/25 transition-colors focus:border-[#d9a441]"
                  />
                </div>

                {/* SUBMIT */}
                <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <button
                    type="submit"
                    disabled={sending}
                    className="group relative inline-flex w-fit items-center gap-4 overflow-hidden border border-[#d9a441] px-7 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:text-[#123452] disabled:opacity-60"
                  >
                    {/* center fill effect */}
                    <span className="absolute inset-0 scale-0 rounded-full bg-[#d9a441] transition-transform duration-500 ease-out group-hover:scale-[2.5]" />

                    <span className="relative z-10">
                      {sending ? "Sending..." : "Send Message"}
                    </span>

                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      className="relative z-10 text-[12px] transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>

                  <p className="text-[11px] leading-5 text-white/35">
                    Usually responds within
                    <br />
                    one business day.
                  </p>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}