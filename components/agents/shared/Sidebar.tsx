"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  ClipboardList,
  Coins,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Users,
  UserRound,
  Settings,
  X,
} from "lucide-react";

export type WorkspaceRole = "owner" | "agent" | "broker";

type SidebarProps = {
  role: WorkspaceRole;
  mobileOpen: boolean;
  onClose: () => void;
};

const sharedLinks = [
  { label: "Vue d’ensemble", href: "/dashboard", icon: LayoutDashboard },
  { label: "Mes biens", href: "/dashboard/biens", icon: Building2 },
  { label: "Visites", href: "/dashboard/visites", icon: CalendarDays },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Documents", href: "/dashboard/documents", icon: FileText },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Mon profil", href: "/dashboard/profil", icon: UserRound },
  { label: "Paramètres", href: "/dashboard/parametres", icon: Settings },
];

export default function Sidebar({ role, mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const roleLinks =
    role === "agent"
      ? [
          { label: "Mes clients", href: "/dashboard/clients", icon: Users },
          { label: "Demandes reçues", href: "/dashboard/demandes", icon: ClipboardList },
        ]
      : role === "broker"
        ? [
            { label: "Mes prospects", href: "/dashboard/prospects", icon: Users },
            { label: "Mes commissions", href: "/dashboard/commissions", icon: Coins },
          ]
        : [{ label: "Demandes", href: "/dashboard/demandes", icon: ClipboardList }];
  const links = sharedLinks.map((item) =>
    role === "broker" && item.label === "Mes biens"
      ? { ...item, label: "Biens confiés" }
      : item,
  ).concat(roleLinks);

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#102c27]/50 lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-[#e8ede7] bg-white transition-transform lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:w-[250px] lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-[#edf0eb] px-5">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-[#153a34] text-[#f4c66a]">
              <Building2 size={20} />
            </span>
            <span>
              <b className="block text-[17px] tracking-tight text-[#153a34]">
                ImmoGest
              </b>
              <small className="text-[9px] font-semibold uppercase tracking-[.17em] text-[#8b978f]">
                Espace gestion
              </small>
            </span>
          </Link>
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={onClose}
            className="grid size-9 place-items-center rounded-full text-[#718077] hover:bg-[#f2f5f1] lg:hidden"
          >
            <X size={19} />
          </button>
        </div>
        <div className="px-4 pt-5">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#9aa69f]">
            Menu principal
          </p>
          <nav
            aria-label="Navigation du tableau de bord"
            className="mt-3 space-y-1"
          >
            {links.map(({ label, href, icon: Icon }) => {
              const active = href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-semibold transition ${active ? "bg-[#eaf1e9] text-[#153a34]" : "text-[#64736a] hover:bg-[#f5f7f3] hover:text-[#153a34]"}`}
                >
                  <Icon size={18} strokeWidth={1.9} />
                  {label}
                  {active && (
                    <span className="ml-auto size-1.5 rounded-full bg-[#a17b35]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <div className="rounded-2xl bg-[#f5f7f3] p-4">
            <span className="grid size-9 place-items-center rounded-xl bg-white text-[#a17b35]">
              <BarChart3 size={17} />
            </span>
            <p className="mt-3 text-xs font-bold text-[#193b34]">
              Votre activité immobilière
            </p>
            <p className="mt-1 text-[11px] leading-5 text-[#78867e]">
              Retrouvez vos biens et vos échanges dans un seul espace.
            </p>
          </div>
          <Link
            href="/login"
            onClick={onClose}
            className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#8b655d] transition hover:bg-[#fbefec] hover:text-[#7d4034]"
          >
            <LogOut size={15} /> Déconnexion
          </Link>
          <Link
            href="/"
            className="mt-1 flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#7c8981] hover:text-[#153a34]"
          >
            ← Retour au site
          </Link>
        </div>
      </aside>
    </>
  );
}
