"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell, Menu, Plus } from "lucide-react";
import { readDashboardProfile } from "@/data/dashboardProfiles";
import type { WorkspaceRole } from "@/components/agents/shared/Sidebar";

type NavigationProps = {
  role: WorkspaceRole;
  onRoleChange: (role: WorkspaceRole) => void;
  onMenuClick: () => void;
};

export default function Navigation({
  role,
  onRoleChange,
  onMenuClick,
}: NavigationProps) {
  const [connectedName, setConnectedName] = useState("");

  useEffect(() => {
    const updateName = () => setConnectedName(readDashboardProfile(role).fullName.trim());
    updateName();
    window.addEventListener("immogest:profile-updated", updateName);
    return () => window.removeEventListener("immogest:profile-updated", updateName);
  }, [role]);

  const initials = connectedName
    ? connectedName.split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("")
    : "IM";

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-[#e8ede7] bg-white/95 px-4 backdrop-blur sm:px-7">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Ouvrir le menu"
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-[#e7ebe5] text-[#36584d] hover:bg-[#f5f7f3] lg:hidden"
        >
          <Menu size={19} />
        </button>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[.15em] text-[#9aa69f]">
            Tableau de bord
          </p>
          <h1 className="truncate text-sm font-bold text-[#193b34] sm:text-base">
            Espace professionnel
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <label className="sr-only" htmlFor="workspace-role">
          Type d’espace
        </label>
        <select
          id="workspace-role"
          value={role}
          onChange={(event) =>
            onRoleChange(event.target.value as WorkspaceRole)
          }
          className="max-w-[145px] rounded-xl border border-[#e4eae2] bg-white px-2.5 py-2.5 text-[11px] font-semibold text-[#36584d] outline-none focus:border-[#9cb7a5] sm:max-w-none sm:px-3 sm:text-xs"
        >
          <option value="owner">Propriétaire</option>
          <option value="agent">Agent immobilier</option>
          <option value="broker">Démarcheur immobilier</option>
        </select>
        <Link
          href="/dashboard/notifications"
          aria-label="Notifications"
          className="relative grid size-10 shrink-0 place-items-center rounded-xl text-[#64736a] hover:bg-[#f5f7f3]"
        >
          <Bell size={18} />
        </Link>
        <Link
          href="/dashboard/biens/nouveau"
          className="hidden items-center gap-2 rounded-xl bg-[#153a34] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#24584e] sm:inline-flex"
        >
          <Plus size={15} className="text-[#f4c66a]" />
          Ajouter un bien
        </Link>
        <Link href="/dashboard/profil" className="flex min-w-0 items-center gap-2 rounded-xl p-1.5 transition hover:bg-[#f5f7f3]" aria-label={`Profil de ${connectedName || "la personne connectée"}`}>
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#eaf1e9] text-xs font-bold text-[#28675b]">{initials}</span>
          <span className="hidden min-w-0 text-left md:block"><span className="block max-w-28 truncate text-[11px] font-bold text-[#193b34]">{connectedName || "Mon profil"}</span><span className="block text-[9px] text-[#849087]">{role === "owner" ? "Propriétaire" : role === "broker" ? "Démarcheur" : "Agent immobilier"}</span></span>
        </Link>
      </div>
    </header>
  );
}
