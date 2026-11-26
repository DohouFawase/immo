"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Images, Play, RotateCcw } from "lucide-react";

type PropertyGalleryProps = {
  images: string[];
  title: string;
  category: string;
};

export default function PropertyGallery({ images, title, category }: PropertyGalleryProps) {
  const [active, setActive] = useState(0);
  const [tourActive, setTourActive] = useState(false);
  const safeImages = images.length ? images : [];

  useEffect(() => {
    if (!tourActive || safeImages.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % safeImages.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [tourActive, safeImages.length]);

  const showImage = (index: number) => {
    setActive((index + safeImages.length) % safeImages.length);
  };

  return (
    <section aria-label={`Photos : ${title}`}>
      <div
        className="relative h-[300px] overflow-hidden rounded-[26px] bg-[#e5e9e2] bg-cover bg-center transition-[background-image] sm:h-[430px]"
        style={{ backgroundImage: safeImages[active] ? `url('${safeImages[active]}')` : undefined }}
        role="img"
        aria-label={`${title}, photo ${active + 1} sur ${safeImages.length}`}
      >
        <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-2 text-xs font-bold text-[#153a34]">
          {category} · {active + 1}/{safeImages.length}
        </span>
        {safeImages.length > 1 && (
          <>
            <button type="button" aria-label="Photo précédente" onClick={() => showImage(active - 1)} className="absolute left-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#153a34] shadow hover:bg-white"><ChevronLeft size={21}/></button>
            <button type="button" aria-label="Photo suivante" onClick={() => showImage(active + 1)} className="absolute right-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#153a34] shadow hover:bg-white"><ChevronRight size={21}/></button>
          </>
        )}
        {safeImages.length > 1 && (
          <button
            type="button"
            onClick={() => setTourActive((running) => !running)}
            className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-[#153a34]/95 px-4 py-2.5 text-xs font-bold text-white shadow-lg transition hover:bg-[#24584e]"
          >
            {tourActive ? <RotateCcw size={15}/> : <Play size={15}/>} {tourActive ? "Arrêter la visite" : "Lancer la visite guidée"}
          </button>
        )}
      </div>
      {safeImages.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Toutes les photos">
          {safeImages.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => { setActive(index); setTourActive(false); }}
              aria-label={`Afficher la photo ${index + 1}`}
              aria-pressed={active === index}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-cover bg-center ${active === index ? "ring-2 ring-[#28675b] ring-offset-2" : "opacity-75 hover:opacity-100"}`}
              style={{ backgroundImage: `url('${image}')` }}
            />
          ))}
          <span className="inline-flex shrink-0 items-center gap-1.5 px-2 text-[11px] text-[#7b8980]"><Images size={14}/>{safeImages.length} photos</span>
        </div>
      )}
      <p className="mt-2 text-[11px] leading-5 text-[#87928b]">Aperçu de visite guidée : les images défilent automatiquement. Ce n’est pas une visite 360°.</p>
    </section>
  );
}
