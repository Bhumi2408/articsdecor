"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton({ endpoint, redirectTo, className }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch(endpoint, { method: "POST" });
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <button onClick={handleLogout} className={className}>
      Log Out
    </button>
  );
}
