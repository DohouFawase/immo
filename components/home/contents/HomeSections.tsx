import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  FileCheck2,
  KeyRound,
  Map,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

const propertyTypes = [
  { id: "acheter", title: "Acheter une maison", text: "Comparez les maisons et appartements selon votre budget et votre quartier.", icon: <Building2 size={23}/>, label: "Maisons & appartements" },
  { id: "louer", title: "Louer un logement", text: "Repérez les logements à louer et leurs équipements essentiels.", icon: <KeyRound size={23}/>, label: "Locations" },
  { id: "chambres", title: "Trouver une chambre", text: "Précisez le type de chambre, les sanitaires, l’entrée et la cuisine.", icon: <BadgeCheck size={23}/>, label: "Chambres" },
  { id: "parcelles", title: "Choisir une parcelle", text: "Consultez la superficie, l’accès, la clôture et les informations foncières disponibles.", icon: <Map size={23}/>, label: "Parcelles" },
];

const steps = [
  { number: "01", title: "Définissez vos critères", text: "Choisissez le type de bien, la zone et votre budget dans les filtres." },
  { number: "02", title: "Comparez les annonces", text: "Consultez les photos, les caractéristiques et les informations disponibles." },
  { number: "03", title: "Contactez l’agent", text: "Ouvrez la fiche du bien pour retrouver les coordonnées publiées par l’agent." },
];

const checks = [
  { title: "Pour un logement", text: "Confirmez le loyer, les charges, l’état des pièces, l’accès à l’eau et à l’électricité." },
  { title: "Pour une chambre", text: "Demandez si les sanitaires et la cuisine sont privés ou partagés, et combien de chambres restent libres." },
  { title: "Pour une parcelle", text: "Vérifiez les documents fonciers auprès des services compétents avant tout paiement." },
];

const faqs = [
  { question: "Comment rechercher une chambre ?", answer: "Choisissez Chambres dans le formulaire de recherche, puis indiquez la zone, le budget et les critères comme le sanitaire ou l’entrée indépendante." },
  { question: "Les annonces affichées sont-elles déjà vérifiées ?", answer: "Les annonces visibles actuellement sont des exemples de démonstration. Vérifiez toujours les informations et les documents auprès de l’agent et des services compétents." },
  { question: "Comment publier un bien ?", answer: "Utilisez le bouton Déposer un bien pour créer un compte professionnel. La publication réelle dépendra de l’activation du service de gestion des annonces." },
  { question: "Où trouver le numéro de l’agent ?", answer: "Ouvrez la fiche détaillée d’une annonce. Le numéro s’affichera lorsqu’il sera fourni avec une annonce réelle." },
];

export function ExploreSection() {
  return (
    <section id="explorer" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#a17b35]">Trouvez selon votre projet</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#193b34] sm:text-4xl">Que recherchez-vous ?</h2>
            <p className="mt-3 text-sm leading-6 text-[#77857c]">Accédez rapidement aux annonces qui correspondent à votre besoin immobilier.</p>
          </div>
          <Link href="/#annonces" className="inline-flex items-center gap-2 text-sm font-bold text-[#28675b] hover:text-[#153a34]">Toutes les annonces <ArrowRight size={16}/></Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {propertyTypes.map((item) => (
            <Link key={item.id} id={item.id} href="/#annonces" className="group rounded-[22px] border border-[#e7ebe5] bg-[#fbfcfa] p-5 transition hover:-translate-y-1 hover:border-[#c8d7cb] hover:bg-white hover:shadow-[0_18px_45px_-30px_rgba(21,58,52,.38)]">
              <span className="grid size-12 place-items-center rounded-2xl bg-[#eaf1e9] text-[#28675b] transition group-hover:bg-[#153a34] group-hover:text-[#f4c66a]">{item.icon}</span>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[.15em] text-[#a17b35]">{item.label}</p>
              <h3 className="mt-2 text-lg font-bold text-[#193b34]">{item.title}</h3>
              <p className="mt-2 min-h-[60px] text-sm leading-6 text-[#77857c]">{item.text}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#28675b]">Explorer <ArrowRight size={14} className="transition group-hover:translate-x-1"/></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section id="comment-ca-marche" className="bg-[#f5f7f3] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#a17b35]">Simple à parcourir</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#193b34] sm:text-4xl">Votre recherche en trois étapes</h2>
          <p className="mt-3 text-sm leading-6 text-[#77857c]">De vos premiers critères à la prise de contact avec l’annonceur.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.number} className="relative rounded-[22px] border border-[#e5eae3] bg-white p-6 sm:p-7">
              <span className="font-[family-name:var(--font-plus-jakarta-sans)] text-4xl font-bold tracking-tight text-[#d9e5d9]">{step.number}</span>
              <h3 className="mt-4 text-lg font-bold text-[#193b34]">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#77857c]">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BuyerGuideSection() {
  return (
    <section id="conseils" className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-10">
        <div>
          <span className="grid size-12 place-items-center rounded-2xl bg-[#f7efd9] text-[#a17b35]"><ShieldCheck size={24}/></span>
          <p className="mt-5 text-[11px] font-bold uppercase tracking-[.2em] text-[#a17b35]">Avant de vous engager</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#193b34] sm:text-4xl">Les bons réflexes pour visiter un bien</h2>
          <p className="mt-4 text-sm leading-6 text-[#77857c]">Prenez le temps de confirmer les détails directement avec l’agent et de visiter le bien avant toute décision.</p>
        </div>
        <div className="space-y-3">
          {checks.map((check, index) => (
            <article key={check.title} className="flex gap-4 rounded-2xl border border-[#e7ebe5] bg-[#fbfcfa] p-5">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#eaf1e9] text-sm font-bold text-[#28675b]">{index + 1}</span>
              <div><h3 className="font-bold text-[#193b34]">{check.title}</h3><p className="mt-1 text-sm leading-6 text-[#77857c]">{check.text}</p></div>
            </article>
          ))}
          <p className="flex items-start gap-2 px-1 pt-1 text-xs leading-5 text-[#87928b]"><FileCheck2 size={15} className="mt-0.5 shrink-0"/>Ces conseils ne remplacent pas la vérification des documents par un professionnel habilité.</p>
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="bg-[#f5f7f3] py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:px-10">
        <div>
          <span className="grid size-12 place-items-center rounded-2xl bg-white text-[#28675b]"><MessageCircle size={23}/></span>
          <p className="mt-5 text-[11px] font-bold uppercase tracking-[.2em] text-[#a17b35]">Besoin d’aide ?</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#193b34]">Questions fréquentes</h2>
          <p className="mt-3 text-sm leading-6 text-[#77857c]">Les réponses aux questions courantes sur la recherche et les annonces.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-[#e5eae3] bg-white p-5 open:shadow-sm">
              <summary className="cursor-pointer list-none pr-7 text-sm font-bold text-[#193b34] marker:hidden">{faq.question}</summary>
              <p className="mt-3 text-sm leading-6 text-[#77857c]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AgentCtaSection() {
  return (
    <section id="vendre" className="bg-[#153a34] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[26px] border border-white/10 bg-[radial-gradient(ellipse_at_top_right,rgba(244,198,106,.16),transparent_45%)] sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#f4c66a]">Vous êtes propriétaire ou agent ?</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Présentez votre bien aux personnes qui le cherchent.</h2>
          <p className="mt-3 text-sm leading-6 text-white/70">Créez votre espace professionnel pour préparer votre annonce et vos informations de contact.</p>
        </div>
        <Link href="/register" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#f4c66a] px-6 py-3.5 text-sm font-bold text-[#193b34] transition hover:bg-[#ffda87]">Créer un compte agent <ArrowRight size={16}/></Link>
      </div>
    </section>
  );
}
