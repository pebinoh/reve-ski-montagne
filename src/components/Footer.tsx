import { MapPin, Phone, Mail } from "lucide-react";
import Logo from "./Logo";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-ink px-6 py-20 text-cream md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/55">
              Avec Évelyne, vivez la montagne autrement. Sécurité, pédagogie
              et bonne humeur sur les sommets de Sainte-Foy.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-cream/50">
              Suivez mes aventures
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://www.instagram.com/reve_ski_montagne/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cream/75 transition-colors hover:text-cream"
                >
                  <InstagramIcon size={16} /> @reve_ski_montagne
                </a>
              </li>
              <li>
                <a href="#presentation" className="text-cream/75 transition-colors hover:text-cream">
                  Qui suis-je
                </a>
              </li>
              <li>
                <a href="#activites" className="text-cream/75 transition-colors hover:text-cream">
                  Mes activités
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-cream/50">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-cream/75">
              <p className="flex items-center gap-2">
                <MapPin size={15} /> Sainte-Foy-Tarentaise, 73640
              </p>
              <p className="flex items-center gap-2">
                <Phone size={15} /> +33 6 XX XX XX XX
              </p>
              <p className="flex items-center gap-2">
                <Mail size={15} /> contact@reve-ski.com
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-cream/10 pt-8 text-center text-xs text-cream/40">
          <p>© 2026 R&apos;Eve Ski Montagne. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
