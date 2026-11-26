"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Building2, Menu, X } from "lucide-react";

const navigation = [
  { label: "Tous les biens", href: "/biens" },
  { label: "Acheter", href: "/#acheter" },
  { label: "Louer", href: "/#louer" },
  { label: "Vendre", href: "/#vendre" },
  { label: "Parcelles", href: "/#parcelles" },
  { label: "Chambres", href: "/#chambres" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8e9e4] bg-[#fbfcfa]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-19 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label="ImmoGest, accueil">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-[#153a34] text-[#f4c66a] shadow-sm transition-transform group-hover:-rotate-3">
            <Building2 size={22} strokeWidth={2.1} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-(family-name:--font-plus-jakarta-sans) text-[19px] font-bold tracking-[-0.04em] text-[#153a34]">ImmoGest</span>
            <span className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.19em] text-[#87928b]">L’immobilier simplifié</span>
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-0 lg:flex">
          {navigation.map((item) => (
            <Link key={item.label} href={item.href} className="rounded-full px-2 py-2.5 text-xs font-semibold text-[#53615a] transition hover:bg-[#eef2ed] hover:text-[#153a34] xl:px-3">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className="rounded-full px-4 py-2.5 text-[13px] font-semibold text-[#153a34] transition hover:bg-[#eef2ed]">Connectez-vous</Link>
          <Link href="/register" className="group inline-flex items-center gap-2 rounded-full bg-[#153a34] px-5 py-3 text-[13px] font-bold text-white shadow-[0_8px_20px_-10px_rgba(21,58,52,0.8)] transition hover:-translate-y-0.5 hover:bg-[#1d4b42]">
            Déposer un bien <ArrowUpRight size={15} className="text-[#f4c66a] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
          className="flex size-11 items-center justify-center rounded-full border border-[#e4e8e2] text-[#153a34] transition hover:bg-[#eef2ed] lg:hidden"
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {mobileOpen && (
        <nav aria-label="Navigation mobile" className="border-t border-[#e8e9e4] bg-[#fbfcfa] px-5 pb-6 pt-3 shadow-lg lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col">
            {[
              ...navigation,
            ].map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className="border-b border-[#edf0eb] py-4 text-[15px] font-semibold text-[#30453b]">
                {item.label}
              </Link>
            ))}
            <Link href="/login" onClick={() => setMobileOpen(false)} className="mt-4 flex items-center justify-center rounded-full border border-[#dce4dc] px-5 py-3.5 text-sm font-bold text-[#153a34]">
              Connectez-vous
            </Link>
            <Link href="/register" onClick={() => setMobileOpen(false)} className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#153a34] px-5 py-3.5 text-sm font-bold text-white">
              Déposer un bien <ArrowUpRight size={16} className="text-[#f4c66a]" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
