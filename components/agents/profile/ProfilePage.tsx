"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Check,
  MapPin,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import {
  readDashboardProfile,
  saveDashboardProfile,
  type DashboardProfile,
} from "@/data/dashboardProfiles";
import { useWorkspaceRole } from "@/components/agents/shared/DashboardShell";

const inputClass =
  "mt-2 w-full rounded-xl border border-[#e2e9e1] bg-[#fbfcfa] px-3.5 py-3 text-sm text-[#193b34] outline-none transition placeholder:text-[#a0aaa3] focus:border-[#8eac9a] focus:bg-white";

const roleDetails = {
  owner: {
    title: "Profil propriétaire",
    description:
      "Mettez à jour vos coordonnées et les informations de gestion de vos biens.",
    extraLabel: "Quartiers où se trouvent vos biens",
    extraPlaceholder: "Ex. Fidjrossè, Akpakpa",
    extraIcon: MapPin,
  },
  agent: {
    title: "Profil agent immobilier",
    description:
      "Présentez votre agence et renseignez les informations professionnelles utiles.",
    extraLabel: "Nom de l’agence",
    extraPlaceholder: "Nom de votre agence",
    extraIcon: BriefcaseBusiness,
  },
  broker: {
    title: "Profil démarcheur immobilier",
    description:
      "Indiquez vos zones d’activité et votre numéro de paiement pour le suivi des commissions.",
    extraLabel: "Zones de prospection",
    extraPlaceholder: "Ex. Cotonou, Abomey-Calavi",
    extraIcon: MapPin,
  },
};

export default function ProfilePage() {
  const role = useWorkspaceRole();
  const details = roleDetails[role];
  const ExtraIcon = details.extraIcon;
  const [profile, setProfile] = useState<DashboardProfile>(() =>
    readDashboardProfile(role),
  );
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setProfile(readDashboardProfile(role));
    setSaved(false);
    setError("");
  }, [role]);

  const update = (field: keyof DashboardProfile, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
    setSaved(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      saveDashboardProfile(role, profile);
      window.dispatchEvent(new Event("immogest:profile-updated"));
      setSaved(true);
    } catch {
      setError("Impossible d’enregistrer le profil dans ce navigateur.");
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#6d7d73] hover:text-[#153a34]"
      >
        <ArrowLeft size={15} />
        Retour au tableau de bord
      </Link>
      <header className="flex items-start gap-4 rounded-2xl border border-[#e4eae2] bg-white p-5 sm:p-7">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#eaf1e9] text-[#28675b]">
          <UserRound size={22} />
        </span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#a17b35]">
            Espace personnel
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#193b34]">
            {details.title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#77857c]">
            {details.description}
          </p>
        </div>
      </header>
      <form onSubmit={submit} className="space-y-6">
        <section className="rounded-2xl border border-[#e5eae3] bg-white p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-[#f2f5f1] text-[#497365]">
              <UserRound size={18} />
            </span>
            <div>
              <h2 className="font-bold text-[#193b34]">Coordonnées</h2>
              <p className="mt-1 text-xs text-[#849087]">
                Informations de contact de votre compte.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Nom et prénom">
              <input
                className={inputClass}
                autoComplete="name"
                value={profile.fullName}
                onChange={(event) => update("fullName", event.target.value)}
                placeholder="Votre nom complet"
              />
            </Field>
            <Field label="Téléphone">
              <input
                className={inputClass}
                type="tel"
                autoComplete="tel"
                value={profile.phone}
                onChange={(event) => update("phone", event.target.value)}
                placeholder="+229 …"
              />
            </Field>
            <Field label="Adresse e-mail">
              <input
                className={inputClass}
                type="email"
                autoComplete="email"
                value={profile.email}
                onChange={(event) => update("email", event.target.value)}
                placeholder="nom@exemple.com"
              />
            </Field>
            <Field label="Commune principale">
              <input
                className={inputClass}
                value={profile.commune}
                onChange={(event) => update("commune", event.target.value)}
                placeholder="Ex. Cotonou"
              />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl border border-[#e5eae3] bg-white p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-[#f2f5f1] text-[#497365]">
              <ExtraIcon size={18} />
            </span>
            <div>
              <h2 className="font-bold text-[#193b34]">
                Informations{" "}
                {role === "owner" ? "sur vos biens" : "professionnelles"}
              </h2>
              <p className="mt-1 text-xs text-[#849087]">
                Ces champs s’adaptent à votre type d’espace.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label={details.extraLabel}>
              <input
                className={inputClass}
                value={role === "agent" ? profile.agency : profile.searchZones}
                onChange={(event) =>
                  update(
                    role === "agent" ? "agency" : "searchZones",
                    event.target.value,
                  )
                }
                placeholder={details.extraPlaceholder}
              />
            </Field>
            {role === "agent" && (
              <Field label="Identifiant professionnel (facultatif)">
                <input
                  className={inputClass}
                  value={profile.businessId}
                  onChange={(event) => update("businessId", event.target.value)}
                  placeholder="Référence professionnelle"
                />
              </Field>
            )}
            {role === "owner" && (
              <Field label="Note sur votre portefeuille">
                <input
                  className={inputClass}
                  value={profile.portfolioDescription}
                  onChange={(event) =>
                    update("portfolioDescription", event.target.value)
                  }
                  placeholder="Ex. Maison à louer, parcelle à vendre"
                />
              </Field>
            )}
            {role === "broker" && (
              <Field label="Téléphone de paiement des commissions">
                <input
                  className={inputClass}
                  type="tel"
                  value={profile.paymentPhone}
                  onChange={(event) =>
                    update("paymentPhone", event.target.value)
                  }
                  placeholder="Numéro Mobile Money"
                />
              </Field>
            )}
          </div>
        </section>

        <div className="rounded-xl border border-[#e9dfc9] bg-[#fffaf0] p-4">
          <div className="flex gap-3">
            <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#a17b35]" />
            <p className="text-xs leading-5 text-[#78653e]">
              Le profil est enregistré dans le navigateur sur cet appareil. Il
              n’est pas encore synchronisé avec un serveur.
            </p>
          </div>
        </div>
        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}
        {saved && (
          <p
            role="status"
            className="rounded-xl border border-[#cfe3d4] bg-[#eff8f0] px-4 py-3 text-sm font-semibold text-[#356749]"
          >
            Profil enregistré.
          </p>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-[#153a34] px-5 py-3 text-xs font-bold text-white hover:bg-[#24584e]"
          >
            <Check size={15} className="text-[#f4c66a]" />
            Enregistrer le profil
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-xs font-bold text-[#52645a]">
      {label}
      {children}
    </label>
  );
}
