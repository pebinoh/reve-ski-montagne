import { MapPin, Phone, Mail } from "lucide-react";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
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
    <footer className="bg-primary py-20 text-[#ecf0f1]">
      <div className="mx-auto max-w-[1100px] px-5">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <h4 className="mb-6 font-title text-lg uppercase tracking-wide text-accent">
              R&apos;Eve Ski Montagne
            </h4>
            <p className="text-sm leading-relaxed text-[#bbb]">
              Avec Évelyne, vivez la montagne autrement. Sécurité, pédagogie
              et bonne humeur sur les sommets de Sainte-Foy.
            </p>
          </div>

          <div>
            <h4 className="mb-6 font-title text-lg uppercase tracking-wide text-accent">
              Suivez mes aventures
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://www.instagram.com/reve_ski_montagne/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#bbb] transition-colors hover:text-white"
                >
                  <InstagramIcon size={18} /> @reve_ski_montagne
                </a>
              </li>
              <li>
                <a
                  href="#presentation"
                  className="text-[#bbb] transition-colors hover:pl-1 hover:text-white"
                >
                  Qui suis-je ?
                </a>
              </li>
              <li>
                <a
                  href="#activites"
                  className="text-[#bbb] transition-colors hover:pl-1 hover:text-white"
                >
                  Mes Activités
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-title text-lg uppercase tracking-wide text-accent">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-[#ecf0f1]">
              <p className="flex items-center gap-2">
                <MapPin size={16} /> Sainte-Foy-Tarentaise, 73640
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} /> +33 6 XX XX XX XX
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} /> contact@reve-ski.com
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/5 pt-8 text-center text-sm text-[#666]">
          <p>© 2026 R&apos;Eve Ski Montagne. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
