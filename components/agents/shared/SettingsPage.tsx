"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, BellRing, Check, Globe2, ShieldCheck, UserRound } from "lucide-react";
import type { WorkspaceRole } from "@/components/agents/shared/Sidebar";
import { useWorkspaceRole } from "@/components/agents/shared/DashboardShell";

type Preferences = { emailMessages: boolean; visitReminders: boolean; listingUpdates: boolean; language: string };
const defaultPreferences: Preferences = { emailMessages: true, visitReminders: true, listingUpdates: true, language: "fr" };

export default function SettingsPage() {
  const role = useWorkspaceRole();
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [saved, setSaved] = useState(false);
  const roleKey = `immogest-dashboard-settings-${role}`;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(roleKey);
      setPreferences(stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences);
    } catch {
      setPreferences(defaultPreferences);
    }
    setSaved(false);
  }, [roleKey]);

  const toggle = (field: "emailMessages" | "visitReminders" | "listingUpdates") => {
    setPreferences((current) => ({ ...current, [field]: !current[field] }));
    setSaved(false);
  };

  const save = () => {
    try {
      localStorage.setItem(roleKey, JSON.stringify(preferences));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  };

  const roleName: Record<WorkspaceRole, string> = { owner: "propriétaire", agent: "agent immobilier", broker: "démarcheur immobilier" };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-semibold text-[#6d7d73] hover:text-[#153a34]"><ArrowLeft size={15}/>Retour au tableau de bord</Link>
      <header><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#a17b35]">Préférences de votre espace</p><h1 className="mt-1 text-2xl font-bold text-[#193b34] sm:text-3xl">Paramètres</h1><p className="mt-2 text-sm text-[#77857c]">Personnalisez les notifications et les préférences de votre espace {roleName[role]}.</p></header>

      <section className="rounded-2xl border border-[#e5eae3] bg-white p-5 sm:p-7">
        <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#f2f5f1] text-[#497365]"><BellRing size={18}/></span><div><h2 className="font-bold text-[#193b34]">Notifications</h2><p className="mt-1 text-xs text-[#849087]">Choisissez les alertes que vous souhaitez recevoir.</p></div></div>
        <div className="mt-5 divide-y divide-[#edf0eb]">
          <PreferenceRow title="Nouveaux messages" description="Recevoir une alerte lorsqu’un message arrive." checked={preferences.emailMessages} onChange={() => toggle("emailMessages")}/>
          <PreferenceRow title="Rappels de visite" description="Être averti avant une visite planifiée." checked={preferences.visitReminders} onChange={() => toggle("visitReminders")}/>
          <PreferenceRow title="Mises à jour des annonces" description="Recevoir les changements liés aux biens suivis." checked={preferences.listingUpdates} onChange={() => toggle("listingUpdates")}/>
        </div>
      </section>

      <section className="rounded-2xl border border-[#e5eae3] bg-white p-5 sm:p-7">
        <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#f2f5f1] text-[#497365]"><Globe2 size={18}/></span><div><h2 className="font-bold text-[#193b34]">Langue et affichage</h2><p className="mt-1 text-xs text-[#849087]">Préférences générales de l’espace.</p></div></div>
        <label className="mt-5 block max-w-sm text-xs font-bold text-[#52645a]">Langue de l’interface<select value={preferences.language} onChange={(event) => { setPreferences((current) => ({ ...current, language: event.target.value })); setSaved(false); }} className="mt-2 w-full rounded-xl border border-[#e2e9e1] bg-[#fbfcfa] px-3.5 py-3 text-sm font-medium text-[#193b34] outline-none focus:border-[#8eac9a]"><option value="fr">Français</option></select></label>
      </section>

      <section className="flex items-start gap-3 rounded-2xl border border-[#e5eae3] bg-white p-5 sm:p-6"><ShieldCheck size={19} className="mt-0.5 shrink-0 text-[#a17b35]"/><div><h2 className="text-sm font-bold text-[#193b34]">Compte et sécurité</h2><p className="mt-1 text-xs leading-5 text-[#849087]">Consultez ou modifiez vos coordonnées depuis votre profil.</p><Link href="/dashboard/profil" className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-[#28675b] hover:text-[#153a34]"><UserRound size={14}/>Ouvrir mon profil</Link></div></section>

      <div className="flex flex-col items-end gap-3 border-t border-[#e5eae3] pt-5">
        {saved && <p role="status" className="text-xs font-semibold text-[#356749]">Paramètres enregistrés sur cet appareil.</p>}
        <button type="button" onClick={save} className="inline-flex items-center gap-2 rounded-xl bg-[#153a34] px-5 py-3 text-xs font-bold text-white hover:bg-[#24584e]"><Check size={15} className="text-[#f4c66a]"/>Enregistrer les paramètres</button>
        <p className="text-[10px] text-[#98a39b]">Les préférences sont conservées localement dans ce navigateur.</p>
      </div>
    </div>
  );
}

function PreferenceRow({ title, description, checked, onChange }: { title: string; description: string; checked: boolean; onChange: () => void }) {
  return <label className="flex cursor-pointer items-center justify-between gap-5 py-4"><span><span className="block text-sm font-semibold text-[#30453b]">{title}</span><span className="mt-1 block text-xs text-[#849087]">{description}</span></span><input type="checkbox" checked={checked} onChange={onChange} className="size-4 shrink-0 accent-[#28675b]"/></label>;
}
