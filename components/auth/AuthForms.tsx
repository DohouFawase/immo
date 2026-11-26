"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Eye,
  EyeOff,
  Fingerprint,
  LockKeyhole,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";

const input =
  "mt-2 w-full rounded-xl border border-[#dfe6df] bg-white px-4 py-3.5 text-sm text-[#193b34] outline-none transition placeholder:text-[#9aa69f] focus:border-[#337165] focus:ring-4 focus:ring-[#337165]/10";
const label = "text-[13px] font-semibold text-[#334b42]";

function TextField({
  title,
  value,
  onChange,
  type = "text",
  placeholder = "",
  optional = false,
}: {
  title: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  optional?: boolean;
}) {
  return (
    <label className={label}>
      {title}
      {optional && (
        <span className="font-normal text-[#8a978f]"> · facultatif</span>
      )}
      <input
        className={input}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={!optional}
      />
    </label>
  );
}

function Shell({
  children,
  title,
  subtitle,
  register = false,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
  register?: boolean;
}) {
  return (
    <main className="relative flex min-h-[calc(100vh-76px)] items-center justify-center overflow-hidden bg-[#f4f6f1] px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute -left-28 top-12 size-80 rounded-full bg-[#dfe9dc] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 size-96 rounded-full bg-[#efe5d1] blur-3xl" />
      <section
        className={`relative grid w-full overflow-hidden rounded-[30px] border border-white/80 bg-white shadow-[0_30px_100px_-45px_rgba(21,58,52,0.35)] ${register ? "max-w-6xl lg:grid-cols-[0.72fr_1.28fr]" : "max-w-5xl lg:grid-cols-2"}`}
      >
        <aside className="relative hidden min-h-[630px] flex-col justify-between overflow-hidden bg-[#153a34] p-10 text-white lg:flex">
          <div className="absolute -right-20 top-24 size-72 rounded-full border border-white/10" />
          <Link href="/" className="relative flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-[#f3c66e]">
              <Building2 size={23} />
            </span>
            <span>
              <b className="block text-lg">ImmoGest</b>
              <small className="text-[10px] uppercase tracking-[.2em] text-white/60">
                L’immobilier simplifié
              </small>
            </span>
          </Link>
          <div className="relative max-w-sm pb-8">
            <ShieldCheck size={26} className="mb-5 text-[#f3c66e]" />
            <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-[#f3c66e]">
              Un espace de confiance
            </p>
            <h2 className="text-3xl font-bold leading-tight">
              Chaque bien mérite une histoire claire.
            </h2>
            <p className="mt-4 text-sm leading-6 text-white/70">
              Retrouvez biens, propriétaires et professionnels dans un espace
              immobilier plus transparent.
            </p>
          </div>
          <p className="relative text-xs text-white/45">
            © 2026 ImmoGest · Bénin
          </p>
        </aside>
        <div className="p-6 sm:p-10 lg:p-12">
          <Link
            href="/"
            className="mb-7 inline-flex items-center gap-2 text-xs font-semibold text-[#6e7d74] hover:text-[#153a34]"
          >
            <ArrowLeft size={15} />
            Accueil
          </Link>
          <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#a17b35]">
            {register ? "Créer un compte" : "Bon retour"}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#193b34]">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#77857c]">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </section>
    </main>
  );
}

export function LoginForm() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  return (
    <Shell
      title="Connectez-vous"
      subtitle="Accédez à votre espace immobilier en toute sécurité."
    >
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          setMessage(
            "La connexion n’est pas encore activée : le service d’authentification doit être relié au backend.",
          );
        }}
      >
        <TextField
          title="Adresse e-mail"
          type="email"
          placeholder="vous@exemple.com"
          onChange={(value) => { setEmail(value); setMessage(""); }}
          value={email}
        />
        <label className={label}>
          Mot de passe
          <span className="relative block">
            <LockKeyhole
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#87958d]"
            />
            <input
              className={`${input} pl-11 pr-12`}
              type={show ? "text" : "password"}
              placeholder="Votre mot de passe"
              required
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#87958d]"
              aria-label="Afficher/masquer le mot de passe"
            >
              {show ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </span>
        </label>
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-[#718078]">
            <input type="checkbox" className="size-4 accent-[#153a34]" />
            Se souvenir de moi
          </label>
          <button
            type="button"
            onClick={() =>
              setMessage(
                "La récupération sera disponible lorsque le backend sera relié.",
              )
            }
            className="font-semibold text-[#28675b]"
          >
            Mot de passe oublié ?
          </button>
        </div>
        {message && (
          <p
            role="status"
            className="rounded-xl border border-[#ead9b4] bg-[#fff9e9] p-3 text-xs leading-5 text-[#775a20]"
          >
            {message}
          </p>
        )}
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#153a34] px-5 py-4 text-sm font-bold text-white hover:bg-[#1d4b42]">
          Se connecter <ArrowRight size={17} />
        </button>
      </form>
      <p className="mt-7 text-center text-sm text-[#738078]">
        Pas encore de compte ?{" "}
        <Link href="/register" className="font-bold text-[#28675b]">
          Créer un compte
        </Link>
      </p>
      <div className="mt-8 flex gap-3 rounded-2xl bg-[#f3f6f2] p-4 text-xs leading-5 text-[#718078]">
        <ShieldCheck size={17} className="shrink-0 text-[#337165]" />
        Vos identifiants restent confidentiels.
      </div>
    </Shell>
  );
}

const steps = ["Profil", "Identité", "Bien & parcelle", "Sécurité"];
const roles = [
  "Propriétaire",
  "Agent immobilier",
  "Promoteur / constructeur",
  "Acheteur ou locataire",
];

export function RegisterWizard() {
  const [step, setStep] = useState(0);
  const [notice, setNotice] = useState("");
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    role: "",
    id: "",
    idDoc: "",
    city: "",
    district: "",
    parcel: "",
    propertyDoc: "",
    password: "",
    confirm: "",
    consent: false,
  });
  const update = (key: keyof typeof form, value: string | boolean) =>
    setForm((old) => ({ ...old, [key]: value }));
  const next = () => {
    setNotice("");
    if (
      step === 0 &&
      (!form.first || !form.last || !form.email || !form.phone || !form.role)
    )
      return setNotice("Complétez les champs obligatoires pour continuer.");
    if (step === 1 && (!form.id || !form.idDoc))
      return setNotice(
        "Ajoutez le numéro et une copie lisible de votre pièce d’identité.",
      );
    if (
      step === 3 &&
      (form.password.length < 8 ||
        form.password !== form.confirm ||
        !form.consent)
    )
      return setNotice(
        "Vérifiez le mot de passe, sa confirmation et votre consentement.",
      );
    setStep((old) => Math.min(old + 1, 3));
  };
  return (
    <Shell
      register
      title="Créons votre espace"
      subtitle="Quatre étapes pour créer un profil et préparer la vérification des informations immobilières."
    >
      <div className="mb-7">
        <div className="mb-3 flex justify-between text-[11px] font-bold text-[#748178]">
          <span>Étape {step + 1} sur 4</span>
          <span>{steps[step]}</span>
        </div>
        <div className="flex gap-1.5">
          {steps.map((title, index) => (
            <div
              key={title}
              className={`h-1.5 flex-1 rounded-full ${index <= step ? "bg-[#2b6b5e]" : "bg-[#e6ebe5]"}`}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[9px] font-semibold text-[#8b978f]">
          {steps.map((title) => (
            <span key={title}>{title}</span>
          ))}
        </div>
      </div>
      <div className="min-h-[330px] space-y-4">
        {step === 0 && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                title="Prénom"
                value={form.first}
                onChange={(v) => update("first", v)}
                placeholder="Votre prénom"
              />
              <TextField
                title="Nom"
                value={form.last}
                onChange={(v) => update("last", v)}
                placeholder="Votre nom"
              />
            </div>
            <TextField
              title="Adresse e-mail"
              type="email"
              value={form.email}
              onChange={(v) => update("email", v)}
              placeholder="vous@exemple.com"
            />
            <TextField
              title="Téléphone avec indicatif"
              type="tel"
              value={form.phone}
              onChange={(v) => update("phone", v)}
              placeholder="+229 00 00 00 00"
            />
            <label className={label}>
              Votre profil
              <select
                className={input}
                value={form.role}
                onChange={(e) => update("role", e.target.value)}
              >
                <option value="">Choisir un profil</option>
                {roles.map((role) => (
                  <option key={role}>{role}</option>
                ))}
              </select>
            </label>
          </>
        )}
        {step === 1 && (
          <>
            <div className="rounded-2xl border border-[#dce8df] bg-[#f5f8f4] p-4">
              <div className="flex gap-3">
                <Fingerprint size={20} className="shrink-0 text-[#337165]" />
                <p className="text-xs leading-5 text-[#748178]">
                  La vérification d’identité réduit les faux profils. Les
                  documents devront être contrôlés avant toute publication.
                </p>
              </div>
            </div>
            <TextField
              title="Numéro de pièce d’identité"
              value={form.id}
              onChange={(v) => update("id", v)}
              placeholder="CIP, carte nationale ou passeport"
            />
            <label className={label}>
              Justificatif d’identité
              <input
                className={`${input} file:mr-3 file:rounded-lg file:border-0 file:bg-[#edf3ed] file:px-3 file:py-2 file:text-xs file:font-bold file:text-[#285a4d]`}
                type="file"
                accept="image/*,.pdf"
                onChange={(e) =>
                  update("idDoc", e.target.files?.[0]?.name ?? "")
                }
              />
              {form.idDoc && (
                <small className="mt-2 block text-[#337165]">
                  {form.idDoc}
                </small>
              )}
            </label>
            <p className="text-[11px] text-[#87928b]">
              Les fichiers ne sont pas envoyés tant que le canal sécurisé n’est
              pas connecté.
            </p>
          </>
        )}
        {step === 2 && (
          <>
            <div className="rounded-2xl border border-[#eadfc8] bg-[#fffaf0] p-4">
              <div className="flex gap-3">
                <MapPin size={19} className="shrink-0 text-[#a17b35]" />
                <p className="text-xs leading-5 text-[#74674e]">
                  Les pièces requises varient selon le bien et la démarche. La
                  plateforme ne remplace pas la vérification par le cadastre, un
                  notaire ou la mairie.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                title="Commune"
                value={form.city}
                onChange={(v) => update("city", v)}
                placeholder="Ex. Cotonou"
                optional
              />
              <TextField
                title="Arrondissement / quartier"
                value={form.district}
                onChange={(v) => update("district", v)}
                placeholder="Votre quartier"
                optional
              />
            </div>
            <TextField
              title="Numéro unique parcellaire"
              value={form.parcel}
              onChange={(v) => update("parcel", v)}
              placeholder="NUP / référence cadastrale"
              optional
            />
            <label className={label}>
              Justificatif du bien · facultatif
              <input
                className={`${input} file:mr-3 file:rounded-lg file:border-0 file:bg-[#edf3ed] file:px-3 file:py-2 file:text-xs file:font-bold file:text-[#285a4d]`}
                type="file"
                accept="image/*,.pdf"
                onChange={(e) =>
                  update("propertyDoc", e.target.files?.[0]?.name ?? "")
                }
              />
              {form.propertyDoc && (
                <small className="mt-2 block text-[#337165]">
                  {form.propertyDoc}
                </small>
              )}
            </label>
            <p className="text-[11px] leading-5 text-[#87928b]">
              Selon le cas : titre de propriété, mandat notarié, certificat
              d’urbanisme ou documents techniques du projet.
            </p>
          </>
        )}
        {step === 3 && (
          <>
            <TextField
              title="Mot de passe"
              type={show ? "text" : "password"}
              value={form.password}
              onChange={(v) => update("password", v)}
              placeholder="8 caractères minimum"
            />
            <TextField
              title="Confirmer le mot de passe"
              type={show ? "text" : "password"}
              value={form.confirm}
              onChange={(v) => update("confirm", v)}
              placeholder="Retapez le mot de passe"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#337165]"
            >
              {show ? <EyeOff size={15} /> : <Eye size={15} />}Afficher/masquer
            </button>
            <label className="flex items-start gap-3 rounded-2xl bg-[#f3f6f2] p-4 text-xs leading-5 text-[#67766d]">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
                className="mt-1 size-4 accent-[#153a34]"
              />
              <span>
                J’accepte la vérification de mon identité et des pièces liées au
                bien. Je comprends que la plateforme ne certifie pas
                juridiquement un titre foncier.
              </span>
            </label>
          </>
        )}
      </div>
      {notice && (
        <p
          role="status"
          className="mt-4 rounded-xl border border-[#ead9b4] bg-[#fff9e9] p-3 text-xs leading-5 text-[#775a20]"
        >
          {notice}
        </p>
      )}
      <div className="mt-6 flex gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => {
              setNotice("");
              setStep(step - 1);
            }}
            className="flex items-center gap-2 rounded-xl border border-[#dfe6df] px-5 py-3.5 text-sm font-bold text-[#456056]"
          >
            <ArrowLeft size={16} />
            Retour
          </button>
        )}
        <button
          type="button"
          onClick={
            step < 3
              ? next
              : () => {
                  if (form.password.length < 8 || form.password !== form.confirm || !form.consent) {
                    setNotice("Choisissez un mot de passe d’au moins 8 caractères, confirmez-le et acceptez la vérification d’identité.");
                    return;
                  }
                  setNotice("Votre dossier est prêt. Le backend d’inscription et l’envoi sécurisé des pièces doivent être connectés avant toute création de compte. Aucun document n’a été transmis.");
                }
          }
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#153a34] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#1d4b42]"
        >
          {step < 3 ? (
            <>
              Continuer <ArrowRight size={16} />
            </>
          ) : (
            <>
              Créer mon compte <Check size={17} />
            </>
          )}
        </button>
      </div>
      <p className="mt-6 text-center text-sm text-[#738078]">
        Déjà inscrit ?{" "}
        <Link href="/login" className="font-bold text-[#28675b]">
          Se connecter
        </Link>
      </p>
    </Shell>
  );
}
