import { Mail, MapPin, Phone } from 'lucide-react';
import UPFLogo from '../ui/UPFLogo';

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const socials = [
  { icon: <FacebookIcon />,  href: '#' },
  { icon: <TwitterIcon />,   href: '#' },
  { icon: <InstagramIcon />, href: '#' },
  { icon: <LinkedinIcon />,  href: '#' },
];

const footerLinks = [
  { heading: 'Navigation',    links: ['Accueil', 'Clubs', 'Calendrier', 'Créer un Club', 'FAQ'] },
  { heading: 'Ressources',    links: ['Guide étudiant', 'Règlement intérieur', 'Presse', 'Partenaires'] },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy-900 text-slate-300 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <UPFLogo className="h-12 w-auto brightness-0 invert opacity-90" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              La plateforme officielle des clubs et associations de l'Université pour promouvoir la vie étudiante.
            </p>
            <div className="flex gap-2">
              {socials.map(({ icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-slate-400 hover:bg-brand-500 hover:text-white transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {footerLinks.map(col => (
            <div key={col.heading}>
              <h5 className="text-white font-bold text-sm mb-5 uppercase tracking-wide">{col.heading}</h5>
              <ul className="space-y-3">
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-slate-400 hover:text-brand-400 text-sm font-medium transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h5 className="text-white font-bold text-sm mb-5 uppercase tracking-wide">Contact</h5>
            <div className="space-y-4">
              {[
                { icon: <MapPin size={16} />, text: 'Campus UPF, Bâtiment Vie Étudiante, B102' },
                { icon: <Mail size={16} />,   text: 'contact-clubs@upf.edu' },
                { icon: <Phone size={16} />,  text: '+212 5 00 00 00 00' },
              ].map(({ icon, text }, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-slate-400">
                  <span className="text-brand-400 mt-0.5 shrink-0">{icon}</span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>&copy; {new Date().getFullYear()} UPF Clubs. Tous droits réservés.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Mentions légales</span>
            <span className="hover:text-white cursor-pointer transition-colors">Confidentialité</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
