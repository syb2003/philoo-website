"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function logout() {
    setPending(true);
    try {
      await fetch("/cv-studio/api/session", { method: "DELETE" });
    } finally {
      router.replace("/cv-studio");
      router.refresh();
    }
  }

  return (
    <button className={className} disabled={pending} onClick={logout} type="button">
      {pending ? "Uitloggen..." : "Uitloggen"}
    </button>
  );
}
