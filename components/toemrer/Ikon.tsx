import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  ChevronsLeftRight,
  Clock,
  Hammer,
  Mail,
  MapPin,
  Pause,
  Phone,
  Play,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react";

// Lucide-ikoner samlet ét sted, så navnene i lib/toemrer.ts er danske.
const ikoner: Record<string, LucideIcon> = {
  pris: BadgeCheck,
  svar: Clock,
  oprydning: Sparkles,
  lokal: MapPin,
  telefon: Phone,
  mail: Mail,
  stjerne: Star,
  pil: ArrowRight,
  pilop: ArrowUpRight,
  traek: ChevronsLeftRight,
  pause: Pause,
  afspil: Play,
  hammer: Hammer,
};

export default function Ikon({ navn, size = 20, className }: { navn: string; size?: number; className?: string }) {
  const I = ikoner[navn] ?? Hammer;
  return <I size={size} strokeWidth={1.5} className={className} aria-hidden="true" />;
}
