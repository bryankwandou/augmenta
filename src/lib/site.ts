export const NAV = [
  { id: "modules", label: "Module" },
  { id: "cases", label: "Case Records" },
  { id: "biotech", label: "Biotech" },
  { id: "tiers", label: "Tiers" },
  { id: "demo", label: "Live Demo" },
] as const;

export const MODULES = [
  {
    id: "neural",
    name: "Neural Lace",
    tag: "01",
    line: "Cognitive mapping mesh",
    copy: "A subdermal lattice that reads intent before muscle. Memory palaces, language, and focus become instruments you can tune.",
    image: "/images/neural.jpg",
    specs: [
      { k: "Latency", v: "4.2 ms" },
      { k: "Material", v: "Au-Ti mesh" },
      { k: "Cycle", v: "11 days" },
    ],
  },
  {
    id: "ocular",
    name: "Ocular Array",
    tag: "02",
    line: "Low-light vision lattice",
    copy: "A hexagonal optical overlay for dusk, depth, and distance. The world does not get brighter. You simply see more of it.",
    image: "/images/ocular.jpg",
    specs: [
      { k: "Spectrum", v: "380–1100 nm" },
      { k: "Material", v: "Sapphire lattice" },
      { k: "Cycle", v: "8 days" },
    ],
  },
  {
    id: "kinetic",
    name: "Kinetic Sleeve",
    tag: "03",
    line: "Carbon-fiber tendon overlay",
    copy: "A tendon-following carbon weave that stores and returns force. Climbing, recovery, and long hours without the usual debt.",
    image: "/images/kinetic.jpg",
    specs: [
      { k: "Return", v: "1.8×" },
      { k: "Material", v: "T300 carbon" },
      { k: "Cycle", v: "14 days" },
    ],
  },
  {
    id: "dermal",
    name: "Dermal Shield",
    tag: "04",
    line: "Adaptive thermal skin",
    copy: "An iridescent thermal lattice just under the surface. Heat, cold, and abrasion become weather you can ignore.",
    image: "/images/dermal.jpg",
    specs: [
      { k: "Range", v: "−40 to 58°C" },
      { k: "Material", v: "Graphene film" },
      { k: "Cycle", v: "9 days" },
    ],
  },
] as const;

export const CASES = [
  {
    title: "High-altitude survey",
    place: "Karakoram, 7,140 m",
    image: "/images/case-altitude.jpg",
    module: "Ocular Array",
  },
  {
    title: "Deep-water recovery",
    place: "Celebes Trench",
    image: "/images/case-water.jpg",
    module: "Dermal Shield",
  },
  {
    title: "Night-shift surgery",
    place: "Oslo, 04:12",
    image: "/images/case-surgery.jpg",
    module: "Neural Lace",
  },
  {
    title: "Endurance crossing",
    place: "Salar de Uyuni",
    image: "/images/case-endurance.jpg",
    module: "Kinetic Sleeve",
  },
] as const;

export const STEPS = [
  {
    n: "01",
    title: "Cartography",
    copy: "A full-body neural map. Forty-eight hours of quiet scanning so the commission knows your system before a filament is grown.",
  },
  {
    n: "02",
    title: "Fabrication",
    copy: "Grown, not assembled. Each module is cultured to your scan — a private object that will not fit another body.",
  },
  {
    n: "03",
    title: "Integration",
    copy: "A week of supervised fusion in the atelier. Sleep, calibration, and the first morning you forget it was ever added.",
  },
] as const;

export const TIERS = [
  {
    name: "Observe",
    kicker: "Complimentary",
    price: "Consult",
    copy: "A private hour with the cartography team. No obligation. A reading of whether the Line is even for you.",
    points: ["Neural baseline", "Material samples", "Written brief"],
    featured: false,
  },
  {
    name: "Commission",
    kicker: "Seasonal",
    price: "Full Line",
    copy: "One module, grown to your map. Atelier lodging, integration week, and a decade of quiet aftercare.",
    points: ["Single module", "Atelier residency", "Lifetime service"],
    featured: true,
  },
  {
    name: "Legacy",
    kicker: "By invitation",
    price: "Archive",
    copy: "A multi-generational record. Your map is held, updated, and — if you choose — passed to the next of kin.",
    points: ["Full Adaptive Line", "Family archive", "Priority cohort"],
    featured: false,
  },
] as const;

export const STATS = [
  { value: 10, suffix: "+", label: "Years in clinic" },
  { value: 40, suffix: "+", label: "Use forms" },
  { value: 12, suffix: "", label: "Countries" },
  { value: 95, suffix: "%", label: "Repeat members" },
] as const;
