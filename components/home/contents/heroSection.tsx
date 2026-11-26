"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  ChevronDown,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";

const operations = ["Acheter", "Louer", "Chambres", "Parcelles"] as const;
type Operation = (typeof operations)[number];
const propertyTypes: Record<Operation, string[]> = {
  Acheter: ["Tous les biens", "Maison", "Appartement", "Studio", "Villa"],
  Louer: ["Tous les biens", "Maison", "Appartement", "Studio", "Villa"],
  Chambres: [
    "Chambre simple",
    "Chambre dans une colocation",
    "Chambre en appartement",
    "Studio meublé",
  ],
  Parcelles: [
    "Parcelle à bâtir",
    "Terrain agricole",
    "Terrain commercial",
    "Terrain viabilisé",
  ],
};
export default function HeroSection() {
  const [operation, setOperation] = useState<Operation>("Acheter");
  const [type, setType] = useState(propertyTypes.Acheter[0]);
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [furnished, setFurnished] = useState("Sans préférence");
  const [sanitary, setSanitary] = useState("Sans préférence");
  const [independentEntry, setIndependentEntry] = useState(false);
  const [sharedKitchen, setSharedKitchen] = useState(false);
  const [utilities, setUtilities] = useState<string[]>([]);
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [landSettlement, setLandSettlement] = useState("Sans préférence");
  const [landTitle, setLandTitle] = useState("Sans préférence");
  const [roadAccess, setRoadAccess] = useState("Sans préférence");
  const [searchSummary, setSearchSummary] = useState("");
  const [searchError, setSearchError] = useState("");
  const isRoom = operation === "Chambres";
  const isParcel = operation === "Parcelles";

  const changeOperation = (next: Operation) => {
    setOperation(next);
    setType(propertyTypes[next][0]);
    setSearchSummary("");
  };

  const toggleUtility = (value: string) => {
    setUtilities((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchError("");
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      setSearchError("Le prix minimum doit être inférieur ou égal au prix maximum.");
      return;
    }
    if (isParcel && minArea && maxArea && Number(minArea) > Number(maxArea)) {
      setSearchError("La superficie minimum doit être inférieure ou égale à la superficie maximum.");
      return;
    }
    const params = new URLSearchParams({ operation, type });
    if (location.trim()) params.set("commune", location.trim());
    if (minPrice) params.set("prix_min", minPrice);
    if (maxPrice) params.set("prix_max", maxPrice);
    if (isParcel) {
      if (minArea) params.set("superficie_min", minArea);
      if (maxArea) params.set("superficie_max", maxArea);
      params.set("lotissement", landSettlement);
      params.set("titre_foncier", landTitle);
      params.set("acces_route", roadAccess);
    } else {
      if (bedrooms) params.set("chambres", bedrooms);
      if (bathrooms) params.set("sanitaires", bathrooms);
      if (isRoom) {
        params.set("meuble", furnished);
        params.set("sanitaire_prive", sanitary);
        params.set("entree_independante", String(independentEntry));
        params.set("cuisine_partagee", String(sharedKitchen));
      }
    }
    utilities.forEach((item) => params.append("equipement", item));
    window.history.replaceState(null, "", `/?${params.toString()}#recherche`);
    setSearchSummary(
      `${operation} · ${type}${location.trim() ? ` · ${location.trim()}` : ""}${minPrice || maxPrice ? ` · ${minPrice || "0"}–${maxPrice || "sans limite"} FCFA` : ""}`,
    );
  };

  return (
    <section
      id="recherche"
      className="relative isolate overflow-hidden bg-[#132f2a]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85')",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(13,39,34,.88)_0%,rgba(13,39,34,.68)_48%,rgba(13,39,34,.24)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#102a25]/80 via-transparent to-[#102a25]/20"
      />

      <div className="mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-20 lg:px-10 lg:pb-20 lg:pt-24">
        <div className="max-w-3xl text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-[11px] font-semibold tracking-wide text-white/90 backdrop-blur-sm">
            <Sparkles size={14} className="text-[#f4c66a]" /> Votre prochain
            projet immobilier commence ici
          </div>
          <h1 className="mt-6 max-w-2xl font-[family-name:var(--font-plus-jakarta-sans)] text-4xl font-bold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Trouvez le lieu{" "}
            <span className="text-[#f4c66a]">qui vous ressemble.</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
            Maisons, appartements, chambres et parcelles : explorez les
            possibilités et précisez votre recherche selon vos besoins.
          </p>
        </div>

        <div className="mt-10 max-w-5xl rounded-[26px] border border-white/70 bg-[#fffefa] p-3 shadow-[0_28px_90px_-35px_rgba(0,0,0,.55)] sm:mt-12 sm:p-5">
          <div
            className="flex gap-1 overflow-x-auto border-b border-[#e8ece6] px-1 pb-3 [scrollbar-width:none]"
            role="tablist"
            aria-label="Type de recherche"
          >
            {operations.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={operation === item}
                onClick={() => changeOperation(item)}
                className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-bold transition sm:px-5 ${operation === item ? "bg-[#153a34] text-white shadow-sm" : "text-[#738078] hover:bg-[#edf2ed] hover:text-[#153a34]"}`}
              >
                {item}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="space-y-4 pt-4">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <label className="block rounded-2xl bg-[#f5f7f3] px-4 py-3.5">
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.13em] text-[#849087]">
                  <MapPin size={14} />
                  Commune / quartier
                </span>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Où recherchez-vous ?"
                  className="mt-2 w-full bg-transparent text-sm font-semibold text-[#193b34] outline-none placeholder:font-normal placeholder:text-[#9aa69f]"
                />
              </label>
              <label className="block rounded-2xl bg-[#f5f7f3] px-4 py-3.5">
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.13em] text-[#849087]">
                  <Building2 size={14} />
                  {isParcel
                    ? "Type de terrain"
                    : isRoom
                      ? "Type de chambre"
                      : "Type de bien"}
                </span>
                <span className="relative mt-2 block">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full appearance-none bg-transparent pr-6 text-sm font-semibold text-[#193b34] outline-none"
                  >
                    {propertyTypes[operation].map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#849087]"
                  />
                </span>
              </label>
              <NumberField
                title="Prix minimum"
                value={minPrice}
                onChange={setMinPrice}
                placeholder="0"
              />
              <NumberField
                title="Prix maximum"
                value={maxPrice}
                onChange={setMaxPrice}
                placeholder="Sans limite"
              />
            </div>

            {isParcel ? (
              <div className="rounded-2xl border border-[#e8ece6] p-4 sm:p-5">
                <h2 className="text-sm font-bold text-[#193b34]">
                  Critères de parcelle
                </h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <NumberField
                    title="Superficie min. (m²)"
                    value={minArea}
                    onChange={setMinArea}
                    placeholder="Ex. 300"
                    unit="m²"
                  />
                  <NumberField
                    title="Superficie max. (m²)"
                    value={maxArea}
                    onChange={setMaxArea}
                    placeholder="Sans limite"
                    unit="m²"
                  />
                  <SelectField
                    title="Lotissement"
                    value={landSettlement}
                    onChange={setLandSettlement}
                    options={[
                      "Sans préférence",
                      "Loti",
                      "Lotissement en cours",
                      "Non loti",
                    ]}
                  />
                  <SelectField
                    title="Titre foncier"
                    value={landTitle}
                    onChange={setLandTitle}
                    options={["Sans préférence", "Déjà obtenu", "En cours", "Pas encore obtenu"]}
                  />
                  <SelectField
                    title="Accès à la parcelle"
                    value={roadAccess}
                    onChange={setRoadAccess}
                    options={[
                      "Sans préférence",
                      "Voie bitumée",
                      "Voie praticable",
                      "Accès à aménager",
                    ]}
                  />
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <CheckOption
                    label="Eau disponible à proximité"
                    checked={utilities.includes("Eau disponible")}
                    onChange={() => toggleUtility("Eau disponible")}
                  />
                  <CheckOption
                    label="Électricité disponible à proximité"
                    checked={utilities.includes("Électricité disponible")}
                    onChange={() => toggleUtility("Électricité disponible")}
                  />
                </div>
              </div>
            ) : isRoom ? (
              <div className="rounded-2xl border border-[#e8ece6] p-4 sm:p-5">
                <h2 className="text-sm font-bold text-[#193b34]">
                  Détails de la chambre
                </h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <SelectField
                    title="Meublée"
                    value={furnished}
                    onChange={setFurnished}
                    options={["Sans préférence", "Meublée", "Non meublée"]}
                  />
                  <SelectField
                    title="Sanitaire / douche"
                    value={sanitary}
                    onChange={setSanitary}
                    options={[
                      "Sans préférence",
                      "Sanitaire privé",
                      "Sanitaire partagé",
                      "Douche privée",
                      "Douche partagée",
                    ]}
                  />
                  <SelectField
                    title="Cuisine"
                    value={sharedKitchen ? "Partagée" : "Sans préférence"}
                    onChange={(value) => setSharedKitchen(value === "Partagée")}
                    options={["Sans préférence", "Partagée"]}
                  />
                  <CheckOption
                    label="Entrée indépendante"
                    checked={independentEntry}
                    onChange={() => setIndependentEntry((value) => !value)}
                  />
                  <CheckOption
                    label="Chambre climatisée"
                    checked={utilities.includes("Climatisation")}
                    onChange={() => toggleUtility("Climatisation")}
                  />
                  <CheckOption
                    label="Eau et électricité incluses"
                    checked={utilities.includes("Charges incluses")}
                    onChange={() => toggleUtility("Charges incluses")}
                  />
                  <CheckOption
                    label="Wi-Fi disponible"
                    checked={utilities.includes("Wi-Fi")}
                    onChange={() => toggleUtility("Wi-Fi")}
                  />
                  <CheckOption
                    label="Placard / rangement"
                    checked={utilities.includes("Rangement")}
                    onChange={() => toggleUtility("Rangement")}
                  />
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-[#e8ece6] p-4 sm:p-5">
                <h2 className="text-sm font-bold text-[#193b34]">
                  Capacité et équipements
                </h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <SelectField
                    title="Chambres"
                    value={bedrooms}
                    onChange={setBedrooms}
                    options={[
                      "Sans préférence",
                      "1 ou plus",
                      "2 ou plus",
                      "3 ou plus",
                      "4 ou plus",
                    ]}
                  />
                  <SelectField
                    title="Douches / salles d’eau"
                    value={bathrooms}
                    onChange={setBathrooms}
                    options={[
                      "Sans préférence",
                      "1 ou plus",
                      "2 ou plus",
                      "3 ou plus",
                    ]}
                  />
                  <CheckOption
                    label="Meublé"
                    checked={furnished === "Meublée"}
                    onChange={() =>
                      setFurnished(
                        furnished === "Meublée" ? "Sans préférence" : "Meublée",
                      )
                    }
                  />
                  <CheckOption
                    label="Parking"
                    checked={utilities.includes("Parking")}
                    onChange={() => toggleUtility("Parking")}
                  />
                  <CheckOption
                    label="Cour ou jardin"
                    checked={utilities.includes("Cour / jardin")}
                    onChange={() => toggleUtility("Cour / jardin")}
                  />
                  <CheckOption
                    label="Eau et électricité"
                    checked={utilities.includes("Eau et électricité")}
                    onChange={() => toggleUtility("Eau et électricité")}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 border-t border-[#e8ece6] pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] leading-5 text-[#89958d]">
                Affinez les critères pour obtenir une recherche adaptée à votre
                besoin.
              </p>
              <button
                type="submit"
                className="flex min-h-[54px] shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#c89a48] px-7 text-sm font-bold text-[#1d332c] shadow-md shadow-[#a77b31]/15 transition hover:-translate-y-0.5 hover:bg-[#d6aa5b]"
              >
                <Search size={17} />
                Rechercher
              </button>
            </div>
            {searchError && (
              <p role="alert" className="rounded-xl bg-[#fff0ed] px-4 py-3 text-xs font-medium text-[#a53e32]">
                {searchError}
              </p>
            )}
            {searchSummary && (
              <p
                role="status"
                className="rounded-xl bg-[#edf4ed] px-4 py-3 text-xs font-medium text-[#28675b]"
              >
                Filtres sélectionnés : {searchSummary}. Le catalogue doit être
                connecté pour afficher les annonces correspondantes.
              </p>
            )}
          </form>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-white sm:mt-10">
          <Benefit
            icon={<Building2 size={18} />}
            title="Ventes & locations"
            text="Des options pour chaque projet"
          />
          <span className="hidden h-8 w-px bg-white/20 sm:block" />
          <Benefit
            icon={<BedDouble size={18} />}
            title="Chambres & parcelles"
            text="Affinez selon vos critères"
          />
          <span className="hidden h-8 w-px bg-white/20 sm:block" />
          <Benefit
            icon={<Bath size={18} />}
            title="Équipements détaillés"
            text="Chambres, douches et plus"
          />
        </div>
        <a
          href="#annonces"
          className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-white/80 transition hover:text-[#f4c66a]"
        >
          Découvrir les annonces <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}

function NumberField({
  title,
  value,
  onChange,
  placeholder,
  unit = "FCFA",
}: {
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  unit?: string;
}) {
  return (
    <label className="block rounded-xl border border-[#e2e9e1] bg-[#f7f8f5] px-3.5 py-3 text-[10px] font-bold uppercase tracking-[.1em] text-[#849087]">
      {title}
      <span className="mt-2 flex items-center gap-2">
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm font-semibold normal-case tracking-normal text-[#193b34] outline-none placeholder:font-normal placeholder:text-[#9aa69f]"
        />
        <span className="text-[10px] font-medium normal-case tracking-normal">
          {unit}
        </span>
      </span>
    </label>
  );
}

function SelectField({
  title,
  value,
  onChange,
  options,
}: {
  title: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block rounded-xl border border-[#e2e9e1] bg-[#f7f8f5] px-3.5 py-3 text-[10px] font-bold uppercase tracking-[.1em] text-[#849087]">
      {title}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 block w-full bg-transparent text-sm font-semibold normal-case tracking-normal text-[#193b34] outline-none"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function CheckOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex min-h-[52px] cursor-pointer items-center gap-2.5 rounded-xl border border-[#e2e9e1] bg-[#f7f8f5] px-3.5 py-3 text-xs font-semibold text-[#53645a]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-4 accent-[#28675b]"
      />
      {label}
    </label>
  );
}

function Benefit({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-[#f4c66a]">
        {icon}
      </span>
      <span>
        <b className="block text-sm">{title}</b>
        <small className="text-[11px] text-white/65">{text}</small>
      </span>
    </div>
  );
}
