import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bath,
  BedDouble,
  DoorOpen,
  MapPin,
  MoveLeft,
  Phone,
  Ruler,
  ShieldCheck,
} from "lucide-react";
import { demoListings } from "@/data/listings";
import PropertyGallery from "@/components/home/contents/PropertyGallery";

const formatPrice = (price: number) => new Intl.NumberFormat("fr-FR").format(price);

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = demoListings.find((item) => item.id === Number(id));
  if (!listing) notFound();

  return (
    <main className="min-h-screen bg-[#f5f7f3] px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Link href="/#annonces" className="inline-flex items-center gap-2 text-sm font-semibold text-[#426156] hover:text-[#153a34]"><MoveLeft size={17}/>Retour aux annonces</Link>
        <div className="mt-6 grid gap-7 lg:grid-cols-[1.45fr_.8fr]">
          <div>
            <PropertyGallery images={listing.photos?.length ? listing.photos : [listing.image]} title={listing.title} category={listing.category} />
            <section className="mt-6 rounded-[24px] border border-[#e4eae2] bg-white p-5 sm:p-7">
              <p className="flex items-center gap-2 text-sm text-[#76847b]"><MapPin size={16}/>{listing.location}</p>
              <h1 className="mt-3 text-2xl font-bold leading-tight text-[#193b34] sm:text-3xl">{listing.title}</h1>
              <p className="mt-4 text-2xl font-bold text-[#153a34]">{formatPrice(listing.price)} <span className="text-sm font-semibold text-[#78867e]">FCFA{listing.period}</span></p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <DetailStat icon={<Ruler size={17}/>} label="Superficie" value={`${listing.area} m²`}/>
                {listing.bedrooms !== undefined && <DetailStat icon={<BedDouble size={17}/>} label="Chambres" value={String(listing.bedrooms)}/>}
                {listing.livingRooms !== undefined && <DetailStat icon={<span className="text-sm font-bold">S</span>} label="Salons" value={String(listing.livingRooms)}/>}
                {listing.bathrooms !== undefined && <DetailStat icon={<Bath size={17}/>} label="Douches" value={String(listing.bathrooms)}/>}
                {listing.toilets !== undefined && <DetailStat icon={<span className="text-xs font-bold">WC</span>} label="Toilettes" value={String(listing.toilets)}/>}
              </div>
              {listing.category === "Chambres" && (
                <div className="mt-7 border-t border-[#edf0eb] pt-6">
                  <h2 className="font-bold text-[#193b34]">Détails de la chambre</h2>
                  {listing.roomDescription && <p className="mt-2 text-sm leading-6 text-[#718077]">{listing.roomDescription}</p>}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {listing.roomKind && <Pill>{listing.roomKind}</Pill>}
                    {listing.sanitary && <Pill>{listing.sanitary}</Pill>}
                    {listing.entrance && <Pill>{listing.entrance}</Pill>}
                    {listing.kitchen && <Pill>{listing.kitchen}</Pill>}
                    {listing.furnished !== undefined && <Pill>{listing.furnished ? "Meublée" : "Non meublée"}</Pill>}
                  </div>
                  {(listing.availableRooms !== undefined || listing.floor || listing.security) && (
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {listing.availableRooms !== undefined && <DetailStat icon={<BedDouble size={17}/>} label="Chambres disponibles" value={String(listing.availableRooms)}/>}
                      {listing.floor && <DetailStat icon={<span className="text-sm font-bold">⌂</span>} label="Étage" value={listing.floor}/>}
                      {listing.security && <DetailStat icon={<ShieldCheck size={17}/>} label="Sécurité" value={listing.security}/>}
                    </div>
                  )}
                </div>
              )}
              <div className="mt-7 border-t border-[#edf0eb] pt-6">
                <h2 className="font-bold text-[#193b34]">Accès et équipements</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {listing.independentEntry !== undefined && <Pill><DoorOpen size={14}/>{listing.independentEntry ? "Entrée individuelle" : "Entrée commune"}</Pill>}
                  {listing.fenced !== undefined && <Pill><ShieldCheck size={14}/>{listing.fenced ? "Clôturé" : "Non clôturé"}</Pill>}
                  {listing.access && <Pill>{listing.access}</Pill>}
                  {listing.utilities?.map((item) => <Pill key={item}>{item}</Pill>)}
                </div>
              </div>
              <p className="mt-7 border-t border-[#edf0eb] pt-4 text-xs leading-5 text-[#87928b]">Annonce de démonstration : les informations et les photos sont illustratives. La plateforme ne dispose pas encore d’un catalogue connecté.</p>
            </section>
          </div>
          <aside className="h-fit rounded-[24px] border border-[#e4eae2] bg-white p-5 sm:p-7 lg:sticky lg:top-24">
            <p className="text-[11px] font-bold uppercase tracking-[.16em] text-[#a17b35]">Contact</p>
            <h2 className="mt-2 text-xl font-bold text-[#193b34]">Agent ImmoGest (démo)</h2>
            <p className="mt-2 text-sm leading-6 text-[#78867e]">Un agent pourra répondre à vos questions sur le bien lorsque les comptes professionnels seront activés.</p>
            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#f4f7f2] p-4"><Phone size={18} className="text-[#337165]"/><div><p className="text-xs font-semibold text-[#748178]">Téléphone de démonstration</p><p className="mt-1 text-sm font-bold text-[#193b34]">Non renseigné</p></div></div>
            <p className="mt-4 text-[11px] leading-5 text-[#8a958e]">Le nom et le numéro réels de l’agent apparaîtront avec les annonces du catalogue.</p>
          </aside>
        </div>
      </div>
    </main>
  );
}

function DetailStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="rounded-2xl bg-[#f4f7f2] p-3"><span className="flex items-center gap-2 text-[#a17b35]">{icon}<span className="text-[10px] font-semibold text-[#819087]">{label}</span></span><p className="mt-2 text-sm font-bold text-[#193b34]">{value}</p></div>;
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eff4ee] px-3 py-2 text-xs font-semibold text-[#52685d]">{children}</span>;
}
