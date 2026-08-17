"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      router.push("/account");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container-lute max-w-md py-20">
      <h1 className="font-serif text-3xl mb-2 text-center">Create an Account</h1>
      <p className="text-muted text-sm text-center mb-8">
        Registration only requires your name, email address and a password.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4 border border-border rounded-lg p-6">
        <div>
          <label className="block text-sm mb-1">Full Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-border rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Email Address</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-border rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            required
            minLength={8}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-border rounded px-3 py-2 text-sm"
          />
          <p className="text-xs text-muted mt-1">At least 8 characters.</p>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button type="submit" disabled={submitting} className="btn-gold w-full py-3 rounded text-sm">
          {submitting ? "Creating account..." : "Create Account"}
        </button>
        <p className="text-sm text-muted text-center">
          Already have an account?{" "}
          <Link href="/account/login" className="text-gold hover:text-gold-dark">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
