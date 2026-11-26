"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { ArrowLeft, Check, ImagePlus, UploadCloud, X } from "lucide-react";
import { saveDashboardProperty, type DashboardProperty } from "@/data/dashboardProperties";

const inputClass = "mt-2 w-full rounded-xl border border-[#e2e9e1] bg-[#fbfcfa] px-3.5 py-3 text-sm text-[#193b34] outline-none transition placeholder:text-[#a0aaa3] focus:border-[#8eac9a] focus:bg-white";
const labelClass = "block text-xs font-bold text-[#52645a]";

export default function PropertyForm() {
  const router = useRouter();
  const [category, setCategory] = useState<DashboardProperty["category"]>("Maison");
  const [operation, setOperation] = useState<DashboardProperty["operation"]>("Vente");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<{ name: string; url: string }[]>([]);
  const [isDraggingPhotos, setIsDraggingPhotos] = useState(false);

  useEffect(() => {
    const previews = selectedPhotos.map((file) => ({ name: file.name, url: URL.createObjectURL(file) }));
    setPhotoPreviews(previews);
    return () => previews.forEach((preview) => URL.revokeObjectURL(preview.url));
  }, [selectedPhotos]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSaving(true);
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") || "").trim();
    const location = String(form.get("location") || "").trim();
    const neighborhood = String(form.get("neighborhood") || "").trim();
    const price = Number(form.get("price"));
    const area = Number(form.get("area"));
    if (!title || !location || !neighborhood || !price || !area) {
      setError("Remplissez le titre, la commune, le quartier, le prix et la superficie.");
      setSaving(false);
      return;
    }

    const optionalNumber = (name: string) => {
      const value = String(form.get(name) || "");
      return value ? Number(value) : undefined;
    };
    const photos = String(form.get("photos") || "")
      .split(/\n|,/)
      .map((url) => url.trim())
      .filter((url) => /^https?:\/\//i.test(url));
    const uploadedFiles = selectedPhotos.filter((file) => file.size > 0);
    if (uploadedFiles.length + photos.length > 6) {
      setError("Ajoutez au maximum 6 photos au total.");
      setSaving(false);
      return;
    }

    let uploadedPhotos: string[];
    try {
      uploadedPhotos = await Promise.all(uploadedFiles.map(compressImage));
    } catch {
      setError("Une des photos ne peut pas être lue. Essayez un autre fichier image.");
      setSaving(false);
      return;
    }

    const property: DashboardProperty = {
      id: crypto.randomUUID(),
      title,
      category,
      operation,
      location,
      neighborhood,
      price,
      period: operation === "Location" ? String(form.get("period") || "mois") : undefined,
      area,
      bedrooms: optionalNumber("bedrooms"),
      availableRooms: category === "Chambre" ? optionalNumber("availableRooms") : undefined,
      livingRooms: optionalNumber("livingRooms"),
      bathrooms: optionalNumber("bathrooms"),
      toilets: optionalNumber("toilets"),
      roomKind: category === "Chambre" ? String(form.get("roomKind") || "") : undefined,
      sanitary: category === "Chambre" ? String(form.get("sanitary") || "") : undefined,
      entrance: category === "Chambre" ? String(form.get("entrance") || "") : undefined,
      kitchen: category === "Chambre" ? String(form.get("kitchen") || "") : undefined,
      furnished: category === "Chambre" ? form.get("furnished") === "Oui" : undefined,
      fenced: form.get("fenced") === "Oui",
      landTitle: category === "Parcelle" ? String(form.get("landTitle") || "") : undefined,
      subdivision: category === "Parcelle" ? String(form.get("subdivision") || "") : undefined,
      access: String(form.get("access") || ""),
      utilities: String(form.get("utilities") || "").split(",").map((value) => value.trim()).filter(Boolean),
      description: String(form.get("description") || "").trim(),
      photos: [...photos, ...uploadedPhotos],
      agentName: String(form.get("agentName") || "").trim(),
      agentPhone: String(form.get("agentPhone") || "").trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      saveDashboardProperty(property);
      router.push("/dashboard/biens");
    } catch {
      setError("Impossible d’enregistrer ce bien dans le navigateur. Vérifiez les photos et l’espace disponible.");
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link href="/dashboard/biens" className="inline-flex items-center gap-2 text-xs font-semibold text-[#6d7d73] hover:text-[#153a34]"><ArrowLeft size={15}/>Retour à mes biens</Link>
      <header><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#a17b35]">Nouvelle annonce</p><h1 className="mt-1 text-2xl font-bold text-[#193b34] sm:text-3xl">Ajouter un bien</h1><p className="mt-2 text-sm leading-6 text-[#77857c]">Décrivez le bien et indiquez les informations qui aideront les personnes intéressées.</p></header>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormSection title="Informations générales" description="Le type de bien, sa localisation et son prix.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Type de bien"><select className={inputClass} value={category} onChange={(event) => setCategory(event.target.value as DashboardProperty["category"])}><option>Maison</option><option>Appartement</option><option>Chambre</option><option>Parcelle</option></select></Field>
            <Field label="Opération"><select className={inputClass} value={operation} onChange={(event) => setOperation(event.target.value as DashboardProperty["operation"])}><option>Vente</option><option>Location</option></select></Field>
            <Field label="Titre de l’annonce"><input className={inputClass} name="title" required placeholder="Ex. Maison familiale avec cour"/></Field>
            <Field label="Commune"><input className={inputClass} name="location" required placeholder="Ex. Cotonou"/></Field>
            <Field label="Quartier"><input className={inputClass} name="neighborhood" required placeholder="Ex. Fidjrossè"/></Field>
            <div className="grid grid-cols-2 gap-3"><Field label="Prix (FCFA)"><input className={inputClass} name="price" type="number" min="1" required placeholder="Ex. 250000"/></Field>{operation === "Location" && <Field label="Période"><select className={inputClass} name="period"><option value="mois">Par mois</option><option value="jour">Par jour</option><option value="an">Par an</option></select></Field>}</div>
            <Field label="Superficie (m²)"><input className={inputClass} name="area" type="number" min="1" required placeholder="Ex. 120"/></Field>
          </div>
        </FormSection>

        {category !== "Parcelle" && <FormSection title={category === "Chambre" ? "Détails de la chambre" : "Pièces et équipements"} description="Précisez le nombre de pièces et les équipements disponibles.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category === "Chambre" && <Field label="Type de chambre"><select className={inputClass} name="roomKind"><option>Chambre ordinaire</option><option>Chambre-salon ordinaire</option><option>Chambre-salon sanitaire</option><option>Studio</option><option>Chambre en colocation</option></select></Field>}
            {category === "Chambre" && <Field label="Nombre de chambres disponibles"><input className={inputClass} name="availableRooms" type="number" min="1" placeholder="Ex. 2"/></Field>}
            {category !== "Chambre" && <Field label="Nombre de chambres"><input className={inputClass} name="bedrooms" type="number" min="0" placeholder="Ex. 3"/></Field>}
            {category === "Chambre" && <Field label="Chambre meublée ?"><select className={inputClass} name="furnished"><option>Non</option><option>Oui</option></select></Field>}
            <Field label="Salons"><input className={inputClass} name="livingRooms" type="number" min="0" placeholder="Ex. 1"/></Field>
            <Field label="Douches / sanitaires"><input className={inputClass} name="bathrooms" type="number" min="0" placeholder="Ex. 2"/></Field>
            <Field label="Toilettes (WC)"><input className={inputClass} name="toilets" type="number" min="0" placeholder="Ex. 2"/></Field>
            {category === "Chambre" && <Field label="Sanitaire"><select className={inputClass} name="sanitary"><option>Sanitaire privé</option><option>Sanitaire partagé</option><option>Sans sanitaire</option></select></Field>}
            {category === "Chambre" && <Field label="Entrée"><select className={inputClass} name="entrance"><option>Entrée indépendante</option><option>Entrée commune</option></select></Field>}
            {category === "Chambre" && <Field label="Cuisine"><select className={inputClass} name="kitchen"><option>Cuisine privée</option><option>Cuisine partagée</option><option>Sans cuisine</option></select></Field>}
          </div>
        </FormSection>}

        {category === "Parcelle" && <FormSection title="Informations foncières" description="Ajoutez les détails utiles sur le terrain.">
          <div className="grid gap-4 sm:grid-cols-2"><Field label="Titre foncier"><select className={inputClass} name="landTitle"><option>Non renseigné</option><option>Disponible</option><option>En cours</option><option>Non disponible</option></select></Field><Field label="Lotissement"><select className={inputClass} name="subdivision"><option>Non renseigné</option><option>Lotie</option><option>En cours</option><option>Non lotie</option></select></Field><Field label="Accès à la voie"><input className={inputClass} name="access" placeholder="Ex. Voie accessible en voiture"/></Field></div>
        </FormSection>}

        <FormSection title="État et services" description="Donnez des précisions sur l’accès, la clôture et les services proches.">
          <div className="grid gap-4 sm:grid-cols-2"><Field label="Bien clôturé ?"><select className={inputClass} name="fenced"><option>Non</option><option>Oui</option></select></Field>{category !== "Parcelle" && <Field label="Accès / voie"><input className={inputClass} name="access" placeholder="Ex. Voie bitumée"/></Field>}<Field label="Services / équipements"><input className={inputClass} name="utilities" placeholder="Séparez par des virgules : Eau, électricité, parking"/></Field></div>
        </FormSection>

        <FormSection title="Photos et description" description="Ajoutez des photos hébergées en ligne et décrivez le bien.">
          <div>
            <p className={labelClass}>Photos du bien <span className="font-normal text-[#89958d]">· 6 maximum</span></p>
            <label
              htmlFor="property-photos"
              onDragOver={(event) => { event.preventDefault(); setIsDraggingPhotos(true); }}
              onDragLeave={() => setIsDraggingPhotos(false)}
              onDrop={(event) => { event.preventDefault(); setIsDraggingPhotos(false); setSelectedPhotos(Array.from(event.dataTransfer.files).filter((file) => file.type.startsWith("image/"))); }}
              className={`mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-8 text-center transition sm:py-10 ${isDraggingPhotos ? "border-[#28675b] bg-[#eaf3ec]" : "border-[#cedbd0] bg-[linear-gradient(135deg,#fbfdf9,#f1f6f0)] hover:border-[#86a996] hover:bg-[#f2f7f1]"}`}
            >
              <input id="property-photos" className="sr-only" type="file" accept="image/*" multiple onChange={(event) => setSelectedPhotos(Array.from(event.target.files ?? []))}/>
              <span className="grid size-14 place-items-center rounded-2xl bg-white text-[#28675b] shadow-sm ring-1 ring-[#e1eae1]"><UploadCloud size={25}/></span>
              <span className="mt-4 text-sm font-bold text-[#24483d]">Glissez vos images ici</span>
              <span className="mt-1 text-xs text-[#7f8e84]">ou <span className="font-bold text-[#28675b] underline underline-offset-2">parcourez vos fichiers</span></span>
              <span className="mt-3 rounded-full bg-white/80 px-3 py-1.5 text-[10px] font-medium text-[#8a978e]">JPG, PNG ou WEBP · photos compressées automatiquement</span>
            </label>
            <div className="mt-2 flex items-center justify-between text-[10px] text-[#89958d]"><span>Les images restent dans le stockage local de ce navigateur.</span><span className="font-bold text-[#52645a]">{selectedPhotos.length} / 6</span></div>
          </div>
          {photoPreviews.length > 0 && <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{photoPreviews.map((photo, index) => <div key={`${photo.name}-${photo.url}`} className="group relative overflow-hidden rounded-2xl border border-[#e5eae3] bg-white shadow-sm"><div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url('${photo.url}')` }}/><p className="truncate px-3 py-2 text-[10px] font-semibold text-[#64736a]">{photo.name}</p><button type="button" aria-label={`Retirer ${photo.name}`} onClick={() => setSelectedPhotos((current) => current.filter((_, currentIndex) => currentIndex !== index))} className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-white/95 text-[#75584f] shadow transition hover:bg-[#fff0ed]"><X size={15}/></button></div>)}</div>}
          <Field label="Ou coller des liens de photos (un par ligne)"><textarea className={`${inputClass} min-h-24 resize-y`} name="photos" placeholder="https://exemple.com/photo-1.jpg\nhttps://exemple.com/photo-2.jpg"/></Field>
          <Field label="Description"><textarea className={`${inputClass} min-h-32 resize-y`} name="description" placeholder="Décrivez les pièces, l’état du bien et les éléments importants…"/></Field>
        </FormSection>

        <FormSection title="Contact de l’annonce" description="Ces informations seront affichées avec le bien dans votre espace.">
          <div className="grid gap-4 sm:grid-cols-2"><Field label="Nom de l’agent / contact"><input className={inputClass} name="agentName" placeholder="Nom et prénom"/></Field><Field label="Téléphone"><input className={inputClass} name="agentPhone" type="tel" placeholder="Ex. +229 01 00 00 00 00"/></Field></div>
        </FormSection>

        {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        <div className="flex flex-col-reverse justify-end gap-3 border-t border-[#e5eae3] pt-5 sm:flex-row"><Link href="/dashboard/biens" className="rounded-xl border border-[#dce5dc] px-5 py-3 text-center text-xs font-bold text-[#53645a]">Annuler</Link><button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#153a34] px-6 py-3 text-xs font-bold text-white hover:bg-[#24584e] disabled:cursor-wait disabled:opacity-70"><Check size={15} className="text-[#f4c66a]"/>{saving ? "Enregistrement…" : "Enregistrer le bien"}</button></div>
        <p className="flex items-center gap-2 text-[11px] leading-5 text-[#8b978f]"><ImagePlus size={15}/>Vous pouvez importer des fichiers ou coller des liens publics. Les photos importées sont enregistrées dans ce navigateur.</p>
      </form>
    </div>
  );
}

function FormSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <section className="space-y-5 rounded-2xl border border-[#e5eae3] bg-white p-5 sm:p-7"><div><h2 className="font-bold text-[#193b34]">{title}</h2><p className="mt-1 text-xs text-[#849087]">{description}</p></div>{children}</section>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className={labelClass}>{label}{children}</label>;
}

async function compressImage(file: File): Promise<string> {
  const image = await createImageBitmap(file);
  const scale = Math.min(1, 1440 / image.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(image.width * scale);
  canvas.height = Math.round(image.height * scale);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas indisponible");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  image.close();
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => result ? resolve(result) : reject(new Error("Image invalide")), "image/jpeg", 0.76);
  });
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("Lecture photo impossible"));
    reader.onerror = () => reject(new Error("Lecture photo impossible"));
    reader.readAsDataURL(blob);
  });
}
