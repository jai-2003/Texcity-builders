import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Award,
  Building,
  Building2,
  CalendarCheck,
  Check,
  ClipboardCheck,
  Clock,
  Download,
  FileCheck2,
  FileText,
  Gem,
  HardHat,
  Headset,
  Home,
  Info,
  KeyRound,
  Landmark,
  Layers,
  LayoutGrid,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Minus,
  Paintbrush,
  PencilRuler,
  Plus,
  Phone,
  Quote,
  Receipt,
  Scale,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Wrench,
  X,
} from 'lucide-react';

// Short, content-friendly names (used in data/content.js) mapped to lucide icons.
// Lucide 1.x no longer ships brand logos, so these two are drawn here in the same outline style
// (paths from Lucide's earlier Facebook / Instagram icons, ISC licence).
const brand = (children) => ({ size, strokeWidth, className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...rest}
  >
    {children}
  </svg>
);

const Facebook = brand(<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />);

const Instagram = brand(
  <>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </>,
);

const icons = {
  facebook: Facebook,
  instagram: Instagram,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  award: Award,
  building: Building,
  building2: Building2,
  calendar: CalendarCheck,
  chat: MessageSquare,
  check: Check,
  clipboard: ClipboardCheck,
  clock: Clock,
  download: Download,
  filecheck: FileCheck2,
  filetext: FileText,
  gem: Gem,
  hardhat: HardHat,
  headset: Headset,
  home: Home,
  info: Info,
  key: KeyRound,
  landmark: Landmark,
  layers: Layers,
  layout: LayoutGrid,
  mail: Mail,
  map: MapPin,
  minus: Minus,
  paintbrush: Paintbrush,
  pencil: PencilRuler,
  phone: Phone,
  plus: Plus,
  quote: Quote,
  receipt: Receipt,
  scale: Scale,
  send: Send,
  shield: ShieldCheck,
  sparkles: Sparkles,
  star: Star,
  users: Users,
  whatsapp: MessageCircle,
  wrench: Wrench,
  x: X,
};

const Icon = ({ name, size = 22, strokeWidth = 1.8, className }) => {
  const Component = icons[name];
  if (!Component) return null;
  return <Component size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />;
};

export default Icon;
