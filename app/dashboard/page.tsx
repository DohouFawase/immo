"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  CirclePlus,
  Coins,
  ClipboardList,
  FileText,
  MessageSquare,
  Users,
} from "lucide-react";
import { useWorkspaceRole } from "@/components/agents/shared/DashboardShell";
import type { WorkspaceRole } from "@/components/agents/shared/Sidebar";

const ownerStats = [
  {
    label: "Mes biens",
    value: "0",
    icon: Building2,
    href: "/dashboard/biens",
    note: "biens publiés",
  },
  {
    label: "Demandes",
    value: "0",
    icon: ClipboardList,
    href: "/dashboard/demandes",
    note: "en attente",
  },
  {
    label: "Visites",
    value: "0",
    icon: CalendarDays,
    href: "/dashboard/visites",
    note: "à venir",
  },
];
const agentStats = [
  {
    label: "Portefeuille",
    value: "0",
    icon: Building2,
    href: "/dashboard/biens",
    note: "biens suivis",
  },
  {
    label: "Clients",
    value: "0",
    icon: Users,
    href: "/dashboard/clients",
    note: "dans votre espace",
  },
  {
    label: "Demandes",
    value: "0",
    icon: ClipboardList,
    href: "/dashboard/demandes",
    note: "à traiter",
  },
];
const brokerStats = [
  {
    label: "Biens confiés",
    value: "0",
    icon: Building2,
    href: "/dashboard/biens",
    note: "à proposer",
  },
  {
    label: "Prospects",
    value: "0",
    icon: Users,
    href: "/dashboard/prospects",
    note: "à accompagner",
  },
  {
    label: "Commissions",
    value: "0 FCFA",
    icon: Coins,
    href: "/dashboard/commissions",
    note: "en suivi",
  },
];

const sections = [
  {
    id: "biens",
    title: "Mes biens",
    icon: Building2,
    description: "Retrouvez les annonces et les informations de vos biens.",
    action: "Ajouter un bien",
  },
  {
    id: "demandes",
    title: "Demandes",
    icon: ClipboardList,
    description: "Les demandes reçues et leur suivi apparaîtront ici.",
  },
  {
    id: "visites",
    title: "Visites",
    icon: CalendarDays,
    description:
      "Consultez vos visites planifiées et les prochains rendez-vous.",
  },
  {
    id: "messages",
    title: "Messages",
    icon: MessageSquare,
    description:
      "Vos échanges avec les personnes intéressées seront regroupés ici.",
  },
  {
    id: "documents",
    title: "Documents",
    icon: FileText,
    description:
      "Centralisez les documents liés à vos biens et à vos dossiers.",
  },
  {
    id: "clients",
    title: "Mes clients",
    icon: Users,
    description: "Suivez les contacts et les recherches de vos clients.",
  },
  {
    id: "prospects",
    title: "Mes prospects",
    icon: Users,
    description:
      "Retrouvez les personnes que vous accompagnez dans leur recherche de logement ou de terrain.",
  },
  {
    id: "commissions",
    title: "Mes commissions",
    icon: Coins,
    description:
      "Consultez le suivi de vos commissions et les biens concernés.",
  },
];

export default function DashboardPage() {
  const role = useWorkspaceRole();
  const stats =
    role === "agent"
      ? agentStats
      : role === "broker"
        ? brokerStats
        : ownerStats;
  const roleName =
    role === "agent"
      ? "agent immobilier"
      : role === "broker"
        ? "démarcheur immobilier"
        : "propriétaire";
  const visibleSections = sections.filter((section) => {
    if (role === "broker")
      return section.id !== "clients" && section.id !== "demandes";
    if (role === "agent")
      return section.id !== "prospects" && section.id !== "commissions";
    return (
      section.id !== "clients" &&
      section.id !== "prospects" &&
      section.id !== "commissions"
    );
  });

  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <Welcome role={role} roleName={roleName} />
      {role === "broker" && (
        <section className="flex items-start gap-3 rounded-2xl border border-[#e9dfc9] bg-[#fffaf0] p-4 text-sm text-[#6f5c36]">
          <Coins size={18} className="mt-0.5 shrink-0 text-[#a17b35]" />
          <p>
            <b>Espace démarcheur.</b> Suivez les biens qui vous sont confiés,
            vos prospects et vos commissions. Les montants seront affichés
            lorsqu’ils seront reliés à votre compte.
          </p>
        </section>
      )}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, href, note }) => (
          <a
            key={label}
            href={href}
            className="flex items-center gap-4 rounded-2xl border border-[#e5eae3] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-[#eaf1e9] text-[#28675b]">
              <Icon size={21} />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold text-[#7b8980]">
                {label}
              </span>
              <span className="mt-1 block text-2xl font-bold text-[#193b34]">
                {value}
              </span>
              <span className="text-[11px] text-[#95a098]">{note}</span>
            </span>
            <ArrowRight size={16} className="ml-auto text-[#aab5ad]" />
          </a>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
        <section
          id="activite"
          className="rounded-2xl border border-[#e5eae3] bg-white p-5 sm:p-6"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[#193b34]">
                Vue d’ensemble
              </h2>
              <p className="mt-1 text-xs text-[#849087]">
                Votre activité récente
              </p>
            </div>
            <span className="rounded-full bg-[#f5f7f3] px-3 py-1.5 text-[10px] font-semibold text-[#728178]">
              Espace de démonstration
            </span>
          </div>
          <div className="mt-6 flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#dce5dc] bg-[#fbfcfa] px-5 text-center">
            <span className="grid size-11 place-items-center rounded-full bg-white text-[#8a9b8f]">
              <CheckCircle2 size={20} />
            </span>
            <p className="mt-3 text-sm font-semibold text-[#52645a]">
              Aucune activité pour le moment
            </p>
            <p className="mt-1 max-w-sm text-xs leading-5 text-[#929e96]">
              Les annonces, demandes et rendez-vous liés à votre compte
              s’afficheront ici.
            </p>
          </div>
        </section>
        <section className="rounded-2xl bg-[#153a34] p-5 text-white sm:p-6">
          <span className="grid size-11 place-items-center rounded-xl bg-white/10 text-[#f4c66a]">
            <CirclePlus size={21} />
          </span>
          <h2 className="mt-5 text-lg font-bold">Prêt à commencer ?</h2>
          <p className="mt-2 text-sm leading-6 text-white/70">
            Ajoutez un bien avec ses photos et ses informations pour préparer sa
            présentation.
          </p>
          <Link
            href="/dashboard/biens/nouveau"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#f4c66a] px-4 py-3 text-xs font-bold text-[#193b34] hover:bg-[#ffda87]"
          >
            Ajouter un bien <ArrowRight size={15} />
          </Link>
        </section>
      </div>
      <section
        aria-label="Rubriques de gestion"
        className="grid gap-4 sm:grid-cols-2"
      >
        {visibleSections.map(
          ({ id, title, icon: Icon, description, action }) => (
            <article
              id={id}
              key={id}
              className="scroll-mt-24 rounded-2xl border border-[#e5eae3] bg-white p-5 sm:p-6"
            >
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#f2f5f1] text-[#497365]">
                  <Icon size={18} />
                </span>
                <div>
                  <h2 className="font-bold text-[#193b34]">{title}</h2>
                  <p className="mt-1 text-xs leading-5 text-[#849087]">
                    {description}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-[#edf0eb] pt-4">
                <span className="text-[11px] text-[#9aa69f]">
                  Aucun élément pour le moment
                </span>
                {action && (
                  <Link
                    href="/dashboard/biens/nouveau"
                    className="text-xs font-bold text-[#28675b] hover:text-[#153a34]"
                  >
                    {action} <ArrowRight size={13} className="inline" />
                  </Link>
                )}
              </div>
            </article>
          ),
        )}
      </section>
      <p className="text-center text-[11px] leading-5 text-[#98a39b]">
        Les indicateurs sont à zéro tant qu’aucune annonce ou activité n’est
        associée à votre compte.
      </p>
    </div>
  );
}

function Welcome({
  role,
  roleName,
}: {
  role: WorkspaceRole;
  roleName: string;
}) {
  return (
    <section className="flex flex-col justify-between gap-5 rounded-2xl border border-[#e4eae2] bg-white p-5 sm:flex-row sm:items-center sm:p-7">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[.17em] text-[#a17b35]">
          Espace{" "}
          {role === "agent"
            ? "agent immobilier"
            : role === "broker"
              ? "démarcheur immobilier"
              : "propriétaire"}
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#193b34] sm:text-3xl">
          Bienvenue dans votre tableau de bord
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#77857c]">
          Gérez votre activité en tant que {roleName} et retrouvez vos biens,
          demandes et rendez-vous au même endroit.
        </p>
      </div>
      <Link
        href="/dashboard/biens/nouveau"
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#153a34] px-4 py-3 text-xs font-bold text-white hover:bg-[#24584e]"
      >
        <CirclePlus size={15} className="text-[#f4c66a]" />
        Déposer un bien
      </Link>
    </section>
  );
}
