"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    const subject = encodeURIComponent(
      form.subject || `Website enquiry from ${form.name}`
    );

    const body = encodeURIComponent(
      `${form.message}\n\nFrom: ${form.name} (${form.email})`
    );

    window.location.href =
      `mailto:luteig@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <section className="px-5 pb-10 pt-24 md:px-10 md:pt-28 lg:px-16">
      <div className="mx-auto max-w-[1200px]">

        <div className="text-center">
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#777]">
            HAVE A QUESTION?
          </p>

          <h2 className="text-[40px] font-medium tracking-[-0.035em] text-[#171717] sm:text-[50px]">
            Send a Message
          </h2>

          <p className="mx-auto mt-5 max-w-[700px] text-[15px] leading-7 text-[#666]">
            Whether you have a question about our jewellery, a custom
            design, or simply want to get in touch, we would love to hear
            from you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-12"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* NAME */}
            <div>
              <label className="mb-2 block text-[13px] font-medium text-[#333]">
                Name
              </label>

              <input
                required
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                placeholder="Enter your name"
                className="
                  h-[58px]
                  w-full
                  rounded-[10px]
                  border border-[#dedede]
                  bg-[#fafafa]
                  px-5
                  text-[15px]
                  text-[#222]
                  outline-none
                  transition-all duration-300
                  placeholder:text-[#999]
                  focus:border-[#DBAF36]
                  focus:bg-white
                  focus:ring-1
                  focus:ring-[#DBAF36]
                "
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-[13px] font-medium text-[#333]">
                Email
              </label>

              <input
                required
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                placeholder="Enter your email"
                className="
                  h-[58px]
                  w-full
                  rounded-[10px]
                  border border-[#dedede]
                  bg-[#fafafa]
                  px-5
                  text-[15px]
                  text-[#222]
                  outline-none
                  transition-all duration-300
                  placeholder:text-[#999]
                  focus:border-[#DBAF36]
                  focus:bg-white
                  focus:ring-1
                  focus:ring-[#DBAF36]
                "
              />
            </div>
          </div>

          {/* SUBJECT */}
          <div className="mt-4">
            <label className="mb-2 block text-[13px] font-medium text-[#333]">
              Subject
            </label>

            <input
              required
              type="text"
              value={form.subject}
              onChange={(e) =>
                setForm({
                  ...form,
                  subject: e.target.value,
                })
              }
              placeholder="What would you like to discuss?"
              className="
                h-[58px]
                w-full
                rounded-[10px]
                border border-[#dedede]
                bg-[#fafafa]
                px-5
                text-[15px]
                text-[#222]
                outline-none
                transition-all duration-300
                placeholder:text-[#999]
                focus:border-[#DBAF36]
                focus:bg-white
                focus:ring-1
                focus:ring-[#DBAF36]
              "
            />
          </div>

          {/* MESSAGE */}
          <div className="mt-4">
            <label className="mb-2 block text-[13px] font-medium text-[#333]">
              Message
            </label>

            <textarea
              required
              rows={7}
              value={form.message}
              onChange={(e) =>
                setForm({
                  ...form,
                  message: e.target.value,
                })
              }
              placeholder="Write your message here..."
              className="
                min-h-[190px]
                w-full
                resize-y
                rounded-[10px]
                border border-[#dedede]
                bg-[#fafafa]
                px-5
                py-4
                text-[15px]
                leading-7
                text-[#222]
                outline-none
                transition-all duration-300
                placeholder:text-[#999]
                focus:border-[#DBAF36]
                focus:bg-white
                focus:ring-1
                focus:ring-[#DBAF36]
              "
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="
              group
              relative
              mt-5
              flex
              h-[60px]
              w-full
              items-center
              justify-center
              overflow-hidden
              rounded-[10px]
              bg-[#24211e]
              text-[15px]
              font-semibold
              text-white
              transition-all duration-300
            "
          >
            <span
              className="
                absolute
                inset-y-0
                left-0
                w-0
                bg-[#DBAF36]
                transition-all
                duration-500
                ease-out
                group-hover:w-full
              "
            />

            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#171717]">
              Send Message
            </span>
          </button>
        </form>
      </div>
    </section>
  );
}