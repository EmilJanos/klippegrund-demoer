import { ArrowRight, Calendar, Check, Clock, Crown, Droplet, Heart, Leaf, Menu, MessageCircle, Paintbrush, Pause, Phone, Play, Scissors, Sparkles, Star, Users, X, type LucideIcon } from "lucide-react";

const ikoner = {
  pil: ArrowRight,
  kalender: Calendar,
  flueben: Check,
  tid: Clock,
  krone: Crown,
  draabe: Droplet,
  hjerte: Heart,
  blad: Leaf,
  menu: Menu,
  samtale: MessageCircle,
  pensel: Paintbrush,
  pause: Pause,
  telefon: Phone,
  afspil: Play,
  saks: Scissors,
  skaeg: Sparkles,
  stjerne: Star,
  kunder: Users,
  luk: X,
} satisfies Record<string, LucideIcon>;

export type IkonNavn = keyof typeof ikoner;

// Alle ikoner er pynt ved siden af tekst, så de skjules for skærmlæsere.
export default function Ikon({ navn, size = 20, fyld }: { navn: IkonNavn; size?: number; fyld?: boolean }) {
  const I = ikoner[navn];
  return <I size={size} strokeWidth={1.5} fill={fyld ? "currentColor" : "none"} aria-hidden="true" />;
}
