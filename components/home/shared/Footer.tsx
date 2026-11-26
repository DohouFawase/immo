import Link from "next/link";
import { Building2, MapPin } from "lucide-react";

const links = [
  { label: "Acheter", href: "/#acheter" },
  { label: "Louer", href: "/#louer" },
  { label: "Chambres", href: "/#chambres" },
  { label: "Parcelles", href: "/#parcelles" },
];

export default function Footer() {
  return (
    <footer className="bg-[#102c27] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.3fr_.7fr_.8fr] lg:px-10 lg:py-14">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-white/10 text-[#f4c66a]"><Building2 size={22}/></span>
            <span><b className="block text-lg tracking-tight">ImmoGest</b><small className="mt-1 block text-[9px] font-semibold uppercase tracking-[.18em] text-white/55">L’immobilier simplifié</small></span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">Explorez les maisons, appartements, chambres et parcelles disponibles au Bénin.</p>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[.16em] text-[#f4c66a]">Explorer</h2>
          <ul className="mt-4 space-y-3">{links.map((link) => <li key={link.label}><Link className="text-sm text-white/70 transition hover:text-white" href={link.href}>{link.label}</Link></li>)}</ul>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[.16em] text-[#f4c66a]">Votre espace</h2>
          <ul className="mt-4 space-y-3">
            <li><Link className="text-sm text-white/70 transition hover:text-white" href="/login">Connectez-vous</Link></li>
            <li><Link className="text-sm text-white/70 transition hover:text-white" href="/register">Créer un compte</Link></li>
            <li><Link className="text-sm text-white/70 transition hover:text-white" href="/#faq">Questions fréquentes</Link></li>
          </ul>
          <p className="mt-5 flex items-center gap-2 text-xs text-white/50"><MapPin size={14}/> Bénin</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-[11px] text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <span>© 2026 ImmoGest. Tous droits réservés.</span>
          <span>Les annonces de démonstration sont indicatives.</span>
        </div>
      </div>
    </footer>
  );
}
