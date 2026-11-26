"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  CirclePlus,
  ClipboardList,
  Coins,
  FileText,
  MessageSquare,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useWorkspaceRole } from "@/components/agents/shared/DashboardShell";
import type { WorkspaceRole } from "@/components/agents/shared/Sidebar";

type SectionInfo = {
  title: string;
  description: string;
  icon: LucideIcon;
  emptyTitle: string;
  emptyText: string;
  action?: string;
};

const content: Record<string, SectionInfo> = {
  biens: {
    title: "Mes biens",
    description: "Consultez et mettez à jour les biens associés à votre espace.",
    icon: Building2,
    emptyTitle: "Aucun bien dans votre espace",
    emptyText: "Ajoutez les informations et les photos d’un bien pour le retrouver ici.",
    action: "Ajouter un bien",
  },
  demandes: {
    title: "Demandes reçues",
    description: "Suivez les demandes des personnes intéressées par vos annonces.",
    icon: ClipboardList,
    emptyTitle: "Aucune demande reçue",
    emptyText: "Les nouvelles demandes apparaîtront ici lorsqu’elles seront reliées à vos annonces.",
  },
  visites: {
    title: "Visites",
    description: "Organisez vos visites et gardez les prochains rendez-vous à portée de main.",
    icon: CalendarDays,
    emptyTitle: "Aucune visite planifiée",
    emptyText: "Les visites confirmées et à venir seront regroupées dans cette rubrique.",
  },
  notifications: {
    title: "Notifications",
    description: "Consultez les alertes concernant vos biens, messages et visites.",
    icon: Bell,
    emptyTitle: "Aucune notification",
    emptyText: "Les nouvelles alertes de votre espace apparaîtront ici.",
  },
  messages: {
    title: "Messages",
    description: "Retrouvez les échanges avec les propriétaires, agents et personnes intéressées.",
    icon: MessageSquare,
    emptyTitle: "Aucun message pour le moment",
    emptyText: "Vos conversations s’afficheront ici dès que la messagerie sera connectée à votre compte.",
  },
  documents: {
    title: "Documents",
    description: "Retrouvez les pièces liées à vos biens et à vos dossiers immobiliers.",
    icon: FileText,
    emptyTitle: "Aucun document ajouté",
    emptyText: "Les documents que vous déposerez seront classés dans cet espace.",
  },
  clients: {
    title: "Mes clients",
    description: "Suivez les clients que vous accompagnez et leurs critères de recherche.",
    icon: Users,
    emptyTitle: "Aucun client enregistré",
    emptyText: "Les contacts associés à votre activité apparaîtront dans cette liste.",
  },
  prospects: {
    title: "Mes prospects",
    description: "Organisez vos contacts et accompagnez-les dans leur recherche immobilière.",
    icon: Users,
    emptyTitle: "Aucun prospect enregistré",
    emptyText: "Ajoutez et suivez les personnes intéressées par les biens qui vous sont confiés.",
    action: "Ajouter un prospect",
  },
  commissions: {
    title: "Mes commissions",
    description: "Consultez le suivi des commissions convenues pour vos transactions.",
    icon: Coins,
    emptyTitle: "Aucune commission à afficher",
    emptyText: "Les commissions et leur état de paiement apparaîtront ici lorsqu’elles seront enregistrées.",
  },
};

const roleAccess: Record<string, WorkspaceRole[]> = {
  biens: ["owner", "agent", "broker"],
  demandes: ["owner", "agent"],
  visites: ["owner", "agent", "broker"],
  messages: ["owner", "agent", "broker"],
  notifications: ["owner", "agent", "broker"],
  documents: ["owner", "agent", "broker"],
  clients: ["agent"],
  prospects: ["broker"],
  commissions: ["broker"],
};

export default function DashboardSectionPage({ section }: { section: string }) {
  const role = useWorkspaceRole();
  const info = content[section];
  const Icon = info.icon;
  const isAllowed = roleAccess[section].includes(role);
  const title = section === "biens" && role === "broker" ? "Biens confiés" : info.title;
  const action = section === "biens" ? "Préparer une annonce" : info.action;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-semibold text-[#6d7d73] transition hover:text-[#153a34]"><ArrowLeft size={15}/>Retour au tableau de bord</Link>
      <header className="flex flex-col justify-between gap-5 rounded-2xl border border-[#e4eae2] bg-white p-5 sm:flex-row sm:items-center sm:p-7">
        <div className="flex items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#eaf1e9] text-[#28675b]"><Icon size={22}/></span>
          <div><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#a17b35]">Espace de gestion</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-[#193b34]">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[#77857c]">{info.description}</p></div>
        </div>
        {action && isAllowed && <Link href="/dashboard/biens/nouveau" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#153a34] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#24584e]"><CirclePlus size={15} className="text-[#f4c66a]"/>{action}</Link>}
      </header>

      {!isAllowed ? (
        <section className="rounded-2xl border border-[#e5eae3] bg-white px-5 py-12 text-center sm:px-8">
          <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#f5f7f3] text-[#85958a]"><BadgeCheck size={22}/></span>
          <h2 className="mt-4 text-base font-bold text-[#193b34]">Rubrique réservée à un autre espace</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#849087]">Changez le type d’espace dans la barre supérieure pour accéder à cette rubrique.</p>
          <Link href="/dashboard" className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#28675b]">Retour à l’accueil <ArrowRight size={14}/></Link>
        </section>
      ) : (
        <>
          {section === "commissions" && (
            <div className="grid gap-4 sm:grid-cols-3">
              <SummaryCard title="En attente" value="0 FCFA" icon={Coins}/>
              <SummaryCard title="Payées" value="0 FCFA" icon={CheckCircle2}/>
              <SummaryCard title="Transactions" value="0" icon={Building2}/>
            </div>
          )}
          <section className="rounded-2xl border border-[#e5eae3] bg-white p-5 sm:p-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="text-lg font-bold text-[#193b34]">{section === "biens" ? "Tous les biens" : section === "commissions" ? "Historique des commissions" : `Liste : ${title.toLowerCase()}`}</h2><p className="mt-1 text-xs text-[#849087]">Les informations sont classées par date de mise à jour.</p></div><label className="relative"><span className="sr-only">Rechercher dans {title.toLowerCase()}</span><input type="search" placeholder="Rechercher…" disabled className="w-full rounded-xl border border-[#e5eae3] bg-[#fbfcfa] px-4 py-2.5 text-xs outline-none placeholder:text-[#a0aaa3] disabled:cursor-not-allowed sm:w-56"/></label></div>
            <div className="mt-6 flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#dce5dc] bg-[#fbfcfa] px-5 text-center">
              <span className="grid size-12 place-items-center rounded-2xl bg-white text-[#8a9b8f]"><Icon size={21}/></span>
              <h3 className="mt-4 text-sm font-bold text-[#52645a]">{info.emptyTitle}</h3>
              <p className="mt-2 max-w-md text-xs leading-5 text-[#929e96]">{info.emptyText}</p>
              <p className="mt-4 rounded-full bg-[#f0f3ee] px-3 py-1.5 text-[10px] font-semibold text-[#819087]">Espace prêt à être relié à vos données</p>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function SummaryCard({ title, value, icon: Icon }: { title: string; value: string; icon: LucideIcon }) {
  return <div className="flex items-center gap-3 rounded-2xl border border-[#e5eae3] bg-white p-4"><span className="grid size-10 place-items-center rounded-xl bg-[#f5f7f3] text-[#a17b35]"><Icon size={18}/></span><span><span className="block text-[11px] text-[#849087]">{title}</span><b className="mt-1 block text-sm text-[#193b34]">{value}</b></span></div>;
}
