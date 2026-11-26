"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bath,
  BedDouble,
  DoorOpen,
  MapPin,
  MoveUpRight,
  Ruler,
  ShieldCheck,
  Zap,
  Droplets,
} from "lucide-react";

import { demoListings } from "@/data/listings";

type Category = "Tous" | "Maisons" | "Appartements" | "Chambres" | "Parcelles";

const categories: Category[] = ["Tous", "Maisons", "Appartements", "Chambres", "Parcelles"];
const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-FR").format(price);

export default function PropertySection() {
  const [active, setActive] = useState<Category>("Tous");
  const filtered =
    active === "Tous"
      ? demoListings
      : demoListings.filter((listing) => listing.category === active);

  return (
    <section id="annonces" className="bg-[#f5f7f3] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#a17b35]">
              Le marché immobilier, simplement
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-plus-jakarta-sans)] text-3xl font-bold tracking-tight text-[#193b34] sm:text-4xl">
              Biens à découvrir
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#77857c]">
              Maisons, appartements, chambres et terrains avec les informations
              importantes pour comparer.
            </p>
          </div>
          <div
            className="flex max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none]"
            role="tablist"
            aria-label="Filtrer les annonces"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active === category}
                onClick={() => setActive(category)}
                className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-bold transition ${active === category ? "bg-[#153a34] text-white shadow-sm" : "border border-[#e2e8e1] bg-white text-[#64736a] hover:border-[#a9b9ad] hover:text-[#153a34]"}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((listing) => (
            <article
              key={listing.id}
              className="group overflow-hidden rounded-[22px] border border-[#e7ebe5] bg-white shadow-[0_12px_35px_-28px_rgba(21,58,52,.35)] transition hover:-translate-y-1 hover:shadow-[0_22px_50px_-28px_rgba(21,58,52,.38)]"
            >
              <div
                className="relative h-56 bg-[#e5e9e2] bg-cover bg-center"
                style={{ backgroundImage: `url('${listing.image}')` }}
              >
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold text-[#153a34]">
                  Exemple d’annonce
                </span>
                <span className="absolute right-4 top-4 rounded-full bg-[#153a34]/90 px-3 py-1.5 text-[10px] font-bold text-white">
                  {listing.category === "Chambres" || listing.period
                    ? "À louer"
                    : listing.category === "Parcelles" ||
                        listing.category === "Maisons"
                      ? "À vendre"
                      : "Bien"}
                </span>
                {listing.furnished && (
                  <span className="absolute bottom-4 left-4 rounded-full bg-[#f4c66a] px-3 py-1.5 text-[10px] font-bold text-[#24382f]">
                    Meublé
                  </span>
                )}
              </div>
              <div className="p-5">
                <p className="flex items-center gap-1.5 text-[11px] font-medium text-[#89958d]">
                  <MapPin size={13} />
                  {listing.location}
                </p>
                <h3 className="mt-2 min-h-12 text-[16px] font-bold leading-6 text-[#193b34]">
                  {listing.title}
                </h3>
                <p className="mt-3 text-xl font-bold tracking-tight text-[#153a34]">
                  {formatPrice(listing.price)}{" "}
                  <span className="text-xs font-semibold text-[#78867e]">
                    FCFA{listing.period}
                  </span>
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#edf0eb] pt-4 text-[11px] font-semibold text-[#64736a]">
                  {listing.bedrooms !== undefined && (
                    <span className="inline-flex items-center gap-1.5">
                      <BedDouble size={15} className="text-[#a17b35]" />
                      {listing.bedrooms} ch.
                    </span>
                  )}
                  {listing.livingRooms !== undefined && (
                    <span>{listing.livingRooms} salon{listing.livingRooms > 1 ? "s" : ""}</span>
                  )}
                  {listing.bathrooms !== undefined && (
                    <span className="inline-flex items-center gap-1.5">
                      <Bath size={15} className="text-[#a17b35]" />
                      {listing.bathrooms} douche{listing.bathrooms > 1 ? "s" : ""}
                    </span>
                  )}
                  {listing.toilets !== undefined && <span>{listing.toilets} WC</span>}
                  <span className="inline-flex items-center gap-1.5">
                    <Ruler size={14} className="text-[#a17b35]" />
                    {listing.area} m²
                  </span>
                </div>
                {(listing.independentEntry !== undefined || listing.fenced !== undefined) && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {listing.independentEntry !== undefined && <Tag>{listing.independentEntry ? "Entrée individuelle" : "Entrée commune"}</Tag>}
                    {listing.fenced !== undefined && <Tag>{listing.fenced ? (listing.category === "Parcelles" ? "Terrain clôturé" : "Bien clôturé") : (listing.category === "Parcelles" ? "Terrain non clôturé" : "Bien non clôturé")}</Tag>}
                  </div>
                )}
                {listing.category === "Chambres" && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {listing.roomKind && <Tag>{listing.roomKind}</Tag>}
                    {listing.sanitary && <Tag>{listing.sanitary}</Tag>}
                    {listing.entrance && <Tag>{listing.entrance}</Tag>}
                    {listing.kitchen && <Tag>{listing.kitchen}</Tag>}
                  </div>
                )}
                {(listing.access || listing.utilities?.length) && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {listing.access && <Tag>{listing.access}</Tag>}
                    {listing.utilities?.map((utility) => (
                      <Tag key={utility}>{utility}</Tag>
                    ))}
                  </div>
                )}
                <Link
                  href={`/biens/${listing.id}`}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#dce5dc] py-3 text-xs font-bold text-[#28675b] transition group-hover:border-[#153a34] group-hover:bg-[#153a34] group-hover:text-white"
                >
                  Voir le bien <MoveUpRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      
      </div>
    </section>
  );
}

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#f1f5f0] px-2.5 py-1.5 text-[10px] font-semibold text-[#617168]">
      {children.startsWith("Entrée") ? (
        <DoorOpen size={12} />
      ) : children.toLowerCase().includes("clôturé") ? (
        <ShieldCheck size={12} />
      ) : children === "Eau" || children === "Eau à proximité" ? (
        <Droplets size={12} />
      ) : children === "Électricité" || children === "Électricité à proximité" ? (
        <Zap size={12} />
      ) : null}
      {children}
    </span>
  );
}
