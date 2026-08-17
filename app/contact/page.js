"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Website enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`);
    window.location.href = `mailto:luteig@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <div className="container-lute max-w-4xl pb-20">
      <Breadcrumbs items={[{ label: "Contact Us" }]} />
      <h1 className="font-serif text-3xl mb-8">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="text-muted leading-relaxed space-y-2">
          <h2 className="font-serif text-xl text-foreground mb-2">Head Office</h2>
          <p>25 Villiers Street, Kimberley 8301, South Africa</p>
          <p>+27 72 252 9457</p>
          <p>luteig@gmail.com</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-border rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-border rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border border-border rounded px-3 py-2 text-sm"
            />
          </div>
          <button type="submit" className="btn-gold px-6 py-3 rounded text-sm">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
