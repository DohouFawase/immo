"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Building2, MapPin, Plus, Ruler, Trash2 } from "lucide-react";
import {
  deleteDashboardProperty,
  readDashboardProperties,
  type DashboardProperty,
} from "@/data/dashboardProperties";
import { useWorkspaceRole } from "@/components/agents/shared/DashboardShell";

const formatPrice = (price: number) => new Intl.NumberFormat("fr-FR").format(price);

export default function PropertiesPage() {
  const role = useWorkspaceRole();
  const [properties, setProperties] = useState<DashboardProperty[]>([]);

  useEffect(() => setProperties(readDashboardProperties()), []);

  const removeProperty = (id: string) => {
    deleteDashboardProperty(id);
    setProperties(readDashboardProperties());
  };

  const title = role === "broker" ? "Biens confiés" : "Mes biens";

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-col justify-between gap-4 rounded-2xl border border-[#e4eae2] bg-white p-5 sm:flex-row sm:items-center sm:p-7">
        <div><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#a17b35]">Gestion du portefeuille</p><h1 className="mt-1 text-2xl font-bold text-[#193b34]">{title}</h1><p className="mt-2 text-sm text-[#77857c]">{properties.length} bien{properties.length > 1 ? "s" : ""} enregistré{properties.length > 1 ? "s" : ""} sur cet appareil</p></div>
        <Link href="/dashboard/biens/nouveau" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#153a34] px-4 py-3 text-xs font-bold text-white hover:bg-[#24584e]"><Plus size={16} className="text-[#f4c66a]"/>Ajouter un bien</Link>
      </header>
      <p className="rounded-xl border border-[#e9dfc9] bg-[#fffaf0] px-4 py-3 text-xs leading-5 text-[#78653e]">Les annonces sont enregistrées localement dans ce navigateur. Elles ne sont pas encore synchronisées avec un serveur.</p>
      {properties.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-[#d9e2d9] bg-white px-5 py-14 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#f2f5f1] text-[#50796b]"><Building2 size={24}/></span>
          <h2 className="mt-4 text-lg font-bold text-[#193b34]">Aucun bien ajouté</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#849087]">Créez votre première annonce pour la voir apparaître dans cette liste.</p>
          <Link href="/dashboard/biens/nouveau" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#153a34] px-4 py-3 text-xs font-bold text-white">Créer une annonce <ArrowRight size={15}/></Link>
        </section>
      ) : (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <article key={property.id} className="overflow-hidden rounded-2xl border border-[#e5eae3] bg-white shadow-sm">
              <div className="relative h-48 bg-[#e9eee8] bg-cover bg-center" style={{ backgroundImage: property.photos[0] ? `url('${property.photos[0]}')` : undefined }}>
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold text-[#315c4f]">{property.operation} · {property.category}</span>
                <span className="absolute right-3 top-3 rounded-full bg-[#153a34]/90 px-3 py-1.5 text-[10px] font-bold text-white">{property.photos.length} photo{property.photos.length > 1 ? "s" : ""}</span>
              </div>
              <div className="p-5">
                <p className="flex items-center gap-1.5 text-xs text-[#829087]"><MapPin size={14}/>{property.neighborhood}, {property.location}</p>
                <h2 className="mt-2 text-base font-bold text-[#193b34]">{property.title}</h2>
                <p className="mt-3 text-lg font-bold text-[#153a34]">{formatPrice(property.price)} <span className="text-xs font-semibold text-[#78867e]">FCFA{property.period ? ` / ${property.period}` : ""}</span></p>
                <div className="mt-4 flex flex-wrap gap-3 border-t border-[#edf0eb] pt-4 text-[11px] font-medium text-[#64736a]">
                  <span className="inline-flex items-center gap-1"><Ruler size={14}/>{property.area} m²</span>
                  {property.bedrooms !== undefined && <span>{property.bedrooms} chambre{property.bedrooms > 1 ? "s" : ""}</span>}
                  {property.availableRooms !== undefined && <span>{property.availableRooms} disponible{property.availableRooms > 1 ? "s" : ""}</span>}
                  {property.bathrooms !== undefined && <span>{property.bathrooms} douche{property.bathrooms > 1 ? "s" : ""}</span>}
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {property.roomKind && <DetailTag>{property.roomKind}</DetailTag>}
                  {property.sanitary && <DetailTag>{property.sanitary}</DetailTag>}
                  {property.entrance && <DetailTag>{property.entrance}</DetailTag>}
                  {property.kitchen && <DetailTag>{property.kitchen}</DetailTag>}
                  {property.furnished && <DetailTag>Meublée</DetailTag>}
                  {property.fenced && <DetailTag>Clôturé</DetailTag>}
                  {property.landTitle && <DetailTag>Titre : {property.landTitle}</DetailTag>}
                  {property.subdivision && <DetailTag>{property.subdivision}</DetailTag>}
                  {property.access && <DetailTag>{property.access}</DetailTag>}
                  {property.utilities.map((utility) => <DetailTag key={utility}>{utility}</DetailTag>)}
                </div>
                <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#edf0eb] pt-4">
                  <span className="min-w-0 text-[11px] text-[#87928b]">{property.agentName || "Contact non renseigné"}{property.agentPhone && <a href={`tel:${property.agentPhone}`} className="ml-2 font-semibold text-[#28675b]">{property.agentPhone}</a>}</span>
                  <button type="button" onClick={() => removeProperty(property.id)} aria-label={`Supprimer ${property.title}`} className="grid size-9 shrink-0 place-items-center rounded-lg text-[#a37164] hover:bg-[#fbefec]"><Trash2 size={16}/></button>
                </div>
                {property.description && <p className="mt-3 line-clamp-3 text-xs leading-5 text-[#77857c]">{property.description}</p>}
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

function DetailTag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-[#f1f5f0] px-2.5 py-1 text-[10px] font-semibold text-[#617168]">{children}</span>;
}
