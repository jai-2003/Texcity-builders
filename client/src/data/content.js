// All site copy lives here so it can be edited without touching the layout.
// The address, stats, milestones, team, project figures and testimonials are sample
// placeholders — replace them with real company data before going live.

const img = (id, w = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

// Public address of the live site, used for canonical links and social-share URLs (see
// components/Seo.jsx). Change it here, in index.html, public/robots.txt and public/sitemap.xml
// once the real domain is known.
export const site = {
  url: 'https://www.texcitybuilders.com',
  image: '/og-image.jpg',
};

export const company = {
  name: 'Texcity Builders',
  tagline: 'Architecture, Construction & Building Design',
  industry: 'Architecture, Construction, and Building Design',
  experience: '8+ Years',
  phone: '+91 99620 75075',
  phoneHref: 'tel:+919962075075',
  // WhatsApp number in international format, digits only (used for wa.me links).
  whatsapp: '919962075075',
  email: 'info@texcitybuilders.com',
  address: 'Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu 641004',
  mapQuery: 'Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu 641004',
  hours: 'Mon – Sat: 9:30 AM – 6:30 PM',
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'YouTube', href: 'https://www.youtube.com/' },
  ],
};

// Main navigation — each entry is its own page.
// "Contact" isn't listed separately — the "Get a Quote" button in the navbar already goes
// there, and listing both was two links to the same page sitting side by side.
export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/packages', label: 'Packages' },
  // { to: '/projects', label: 'Projects' },
];

// Captions that appear over the hero video as the visitor scrolls (from/to = scroll progress 0–1).
export const heroStages = [
  { from: 0.08, to: 0.18, step: '01', title: 'Strong foundations', text: 'Concrete frame, brick infill and scaffolding — engineered and inspected at every level.' },
  { from: 0.2, to: 0.42, step: '02', title: 'Elegant exteriors', text: 'Clean elevations, warm wall lights and a landscaped entrance that welcomes you home.' },
  { from: 0.45, to: 0.66, step: '03', title: 'Thoughtful interiors', text: 'Warm lighting, polished floors and fitted wardrobes, planned around how you live.' },
  { from: 0.69, to: 0.84, step: '04', title: 'Premium finishes', text: 'Marble, glass and fittings chosen to last for decades, not years.' },
  { from: 0.86, to: 1.01, step: '05', title: 'Ready to move in', text: 'From footing to finish, we hand over homes that are ready to live in from day one.' },
];

// Sample figures.
export const stats = [
  { value: '8+', label: 'Years of experience' },
  { value: '120+', label: 'Projects delivered' },
  { value: '850+', label: 'Happy families' },
  { value: '2.5M', label: 'Sq. ft. constructed' },
];

// Credentials strip that scrolls under the hero video.
export const marqueeItems = [
  'DTCP approved layouts',
  'RERA registered projects',
  '8+ years in Coimbatore',
  '120+ projects delivered',
  'In-house architects & engineers',
  'Fixed-price contracts',
  '1-year structural warranty',
];

export const about = {
  title: 'Building Communities With Purpose',
  paragraphs: [
    'At Texcity Builders, we create high-quality residential, commercial and construction spaces that inspire better living, stronger communities and lasting value.',
    'Founded in Coimbatore, our team of architects, structural engineers and site supervisors manages every project in-house — from land evaluation and design to approvals, construction and handover. That single point of responsibility is how we keep quality high and timelines honest.',
  ],
  highlights: [
    'DTCP and RERA approved projects',
    'In-house architects and structural engineers',
    'Transparent pricing with no hidden costs',
    'Quality checks at every construction stage',
  ],
  image: img('1600596542815-ffad4c1539a9'),
  pillars: [
    { title: 'Our Vision', icon: 'sparkles', text: 'To be a trusted real estate and construction company known for quality, innovation and customer satisfaction.' },
    { title: 'Our Mission', icon: 'landmark', text: 'To create sustainable and well-planned spaces that enhance lives and build stronger communities.' },
    {
      title: 'Our Values',
      icon: 'shield',
      text: 'Quality, integrity, innovation, customer focus and sustainability guide every decision we make on site and off.',
      values: ['Quality', 'Integrity', 'Innovation', 'Customer focus', 'Sustainability'],
    },
  ],

  // Full story, told on the About page.
  story: {
    title: '8+ Years of Building Coimbatore',
    image: img('1521737604893-d14cc237f11d', 1000),
    paragraphs: [
      'Texcity Builders started in 2015 with a single villa project in Saravanampatti and a simple idea: the people who design a building should be the same people who build it.',
      'That idea grew into an in-house team of architects, structural engineers, approval coordinators and site supervisors. Today we deliver villas, apartment communities and commercial buildings across Coimbatore, and we still manage every project ourselves — no outsourced design, no sub-contracted supervision.',
      'What has not changed is how we work: clear drawings before work starts, itemised pricing before contracts are signed, and weekly updates until the keys are handed over.',
    ],
  },

  // Sample milestones — replace with the real company history.
  milestones: [
    { year: '2015', title: 'Founded in Coimbatore', text: 'Started with a single villa project and a two-person team working from a rented office on Avinashi Road.' },
    { year: '2017', title: 'In-house design studio', text: 'Architects and structural engineers join the company, bringing design and construction under one roof.' },
    { year: '2020', title: 'First gated community', text: 'Garden Villas in Kovaipudur — twelve homes planned around a shared central garden.' },
    { year: '2021', title: 'Into commercial construction', text: 'Urban Heights, a G+6 office building in Gandhipuram, is delivered to IT and professional tenants.' },
    { year: '2022', title: 'First apartment community', text: 'Lake View Residency — 96 RERA-registered homes in Singanallur, handed over on schedule.' },
    { year: '2024', title: 'The 100th project', text: 'Tech Park Phase 2 is delivered fully leased, and the hundredth project is handed over to its owners.' },
    { year: 'Today', title: 'Building what comes next', text: '850+ families housed, 2.5 million sq. ft. built, and new communities under way in Vadavalli and Thudiyalur.' },
  ],

  approvals: [
    { title: 'DTCP & CMDA approved', icon: 'clipboard', text: 'Layouts and building plans sanctioned by the competent planning authority before work begins.' },
    { title: 'RERA registered', icon: 'shield', text: 'Every apartment and villa community is registered under Tamil Nadu RERA with public project details.' },
    { title: 'Clear titles', icon: 'scale', text: 'Legal verification and encumbrance certificates shared with every buyer before booking.' },
    { title: '1-year structural warranty', icon: 'award', text: 'A written warranty and a dedicated support line for the first year after handover.' },
  ],

  // Sample team — replace names, roles and bios.
  team: [
    { name: 'Founder Name', role: 'Founder & Managing Director', bio: 'Civil engineer with 15 years in residential construction; leads project strategy and client relationships.' },
    { name: 'Architect Name', role: 'Principal Architect', bio: 'Designs every villa and apartment layout, from concept sketches to working drawings and 3D views.' },
    { name: 'Engineer Name', role: 'Head of Structural Engineering', bio: 'Responsible for soil investigation, structural design and stage-wise certification on every site.' },
    { name: 'Manager Name', role: 'Approvals & Projects Manager', bio: 'Coordinates DTCP, RERA and local body approvals and keeps every site on its promised schedule.' },
  ],
};

// Equipment Services: scope still to be confirmed — the text below is a placeholder, edit it
// once the exact services are agreed.
export const services = [
  {
    slug: 'building-approvals',
    title: 'Building Approvals',
    icon: 'filecheck',
    desc: 'Building plan approvals, permit assistance and documentation support, handled end to end.',
    points: ['Plan approvals', 'Permit assistance', 'Documentation'],
    img: img('1454165804606-c3d57bc86b40', 600),
    cover: img('1521791136064-7986c2920216', 1000),
    duration: '4 – 12 weeks',
    idealFor: 'Owners & developers',
    longDesc: [
      'Approvals are where most projects lose time. We prepare building plans in the formats each authority expects, submit them through the right channels and follow up until the sanction is in your hands.',
      'From a single-plot building permit to approvals for a larger development, you get one coordinator, clear timelines and copies of every document filed.',
    ],
    includes: [
      'Building plan approval from local bodies',
      'DTCP and CMDA approvals',
      'Permit applications and follow-up',
      'Drawings prepared to authority formats',
      'Documentation and legal paperwork support',
      'Completion and occupancy certificates',
    ],
  },
  {
    slug: 'residential-commercial',
    title: 'Residential & Commercial Projects',
    icon: 'building2',
    desc: 'Planning and design for homes, apartments, offices and commercial buildings.',
    points: ['Homes & apartments', 'Offices', 'Commercial buildings'],
    img: img('1600596542815-ffad4c1539a9', 600),
    cover: img('1486406146926-c627a92ad1ab', 1000),
    duration: 'Varies by project size',
    idealFor: 'Families, businesses & investors',
    longDesc: [
      'Whether it is an independent house, an apartment block, an office or a commercial building, we plan each project around how it will be used — comfortable homes for families, efficient spaces for businesses.',
      'Our team brings planning, design, structure and approvals together, so residential and commercial projects move from idea to approved drawings without hand-offs between firms.',
    ],
    includes: [
      'Independent houses and villas',
      'Apartment and multi-unit residential buildings',
      'Office buildings and workspaces',
      'Shops, showrooms and commercial complexes',
      'Site analysis and space planning',
      'Coordination of design, structure and approvals',
    ],
  },
  {
    slug: 'architectural-design',
    title: 'Architectural Design',
    icon: 'pencil',
    desc: 'Creative architectural concepts, floor plans, elevations and complete building designs.',
    points: ['Concept design', 'Floor plans', 'Elevations'],
    img: img('1503387762-592deb58ef4e', 600),
    cover: img('1580587771525-78b9dba3b914', 1000),
    duration: '2 – 8 weeks',
    idealFor: 'Plot owners & builders',
    longDesc: [
      'Good buildings start with good design. Our architects develop concepts around your plot, budget and lifestyle, then turn them into floor plans and elevations you can see and refine before anything is built.',
      'Every design is planned for natural light, ventilation and the local climate, with Vastu considerations included where you need them.',
    ],
    includes: [
      'Concept design and planning',
      'Detailed floor plans',
      'Front and side elevations',
      '3D views of the building',
      'Vastu-compliant layouts on request',
      'Working drawings for construction',
    ],
  },
  {
    slug: 'structural-design',
    title: 'Structural Design',
    icon: 'hardhat',
    desc: 'Structural planning and engineering design for safe, durable buildings.',
    points: ['Structural planning', 'RCC design', 'Load analysis'],
    img: img('1504307651254-35680f356dfd', 600),
    cover: img('1503387762-592deb58ef4e', 1000),
    duration: '2 – 6 weeks',
    idealFor: 'Architects & self-builders',
    longDesc: [
      'A building is only as good as the structure behind it. Our engineers plan and design structures that are safe, durable and economical, for our own projects and for owners or architects who need an independent structural engineer.',
      'We model the structure for the loads it will carry and produce clear structural drawings that contractors on site can follow without guesswork.',
    ],
    includes: [
      'Structural planning and framing',
      'Foundation design',
      'RCC and steel structural design',
      'Load and stability analysis',
      'Structural drawings and bar-bending schedules',
      'Site inspections during construction',
    ],
  },
  {
    slug: 'equipment-services',
    title: 'Equipment Services',
    icon: 'wrench',
    desc: 'Equipment-related construction solutions to keep your project on site and on schedule.',
    points: ['Construction equipment', 'Site support', 'Project-based service'],
    img: img('1541976590-713941681591', 600),
    cover: img('1504307651254-35680f356dfd', 1000),
    duration: 'As per project need',
    idealFor: 'Builders & contractors',
    longDesc: [
      'We provide equipment-related construction solutions to support building work on site.',
      'Contact us with your project requirements and we will confirm what we can provide and how it fits your schedule.',
    ],
    includes: [
      'Equipment for construction work',
      'Site support as per project requirements',
      'Scheduling around your construction timeline',
      'Get in touch to confirm the full scope',
    ],
  },
  {
    slug: 'interior-design',
    title: 'Interior Design',
    icon: 'paintbrush',
    desc: 'Modern interior design, space planning, lighting and functional interiors.',
    points: ['Space planning', 'Lighting design', 'Modern interiors'],
    img: img('1600566753376-12c8ab7fb75b', 600),
    cover: img('1600607686527-6fb886090705', 1000),
    duration: '4 – 12 weeks',
    idealFor: 'Homeowners & offices',
    longDesc: [
      'Our interiors are designed to look good and work well every day. We plan the space around how you live or work, then bring it together with materials, lighting and furniture that suit it.',
      'Interiors are designed in 3D before work begins, so you approve the layout, finishes and lighting with no surprises later.',
    ],
    includes: [
      'Space planning and furniture layouts',
      '3D interior design views',
      'Lighting design and false ceilings',
      'Modular kitchens and wardrobes',
      'Material, colour and finish selection',
      'Home and office interiors',
    ],
  },
  {
    slug: 'layout-development',
    title: 'Layout Development',
    icon: 'layout',
    desc: 'Land layout planning, plot arrangements and development planning.',
    points: ['Land layouts', 'Plot arrangement', 'Development planning'],
    img: img('1500382017468-9049fed747ef', 600),
    cover: img('1500382017468-9049fed747ef', 1000),
    duration: '4 – 12 weeks',
    idealFor: 'Landowners & developers',
    longDesc: [
      'We help landowners and developers make the most of their land. Our layouts arrange plots, roads and open spaces efficiently while meeting the planning rules that apply to the site.',
      'From the first site survey to a layout ready for approval, we plan developments that are practical to build and easy to sell.',
    ],
    includes: [
      'Site survey and land analysis',
      'Layout planning and plot arrangement',
      'Roads, open spaces and amenity planning',
      'Development planning to local norms',
      'Layout drawings for approval',
      'Support with layout approvals',
    ],
  },
];

export const reasons = [
  { title: 'Quality Materials', icon: 'gem', text: 'We use branded cement, TMT steel and fittings, with material test reports shared on request.' },
  { title: 'On-Time Delivery', icon: 'calendar', text: 'Detailed project schedules and weekly progress updates keep handovers on the promised date.' },
  { title: 'Transparent Pricing', icon: 'receipt', text: 'Itemised quotations and fixed-price contracts mean no surprises when the final bill arrives.' },
  { title: 'Experienced Team', icon: 'users', text: 'Qualified engineers and supervisors on every site, backed by 8+ years of local experience.' },
  { title: 'Legal Clarity', icon: 'scale', text: 'Clear titles, approved plans and complete documentation for every property we sell.' },
  { title: 'After-Sales Support', icon: 'headset', text: 'A one-year structural warranty and a dedicated support team after you move in.' },
];

export const process = [
  { title: 'Consultation', icon: 'chat', text: 'We understand your requirements, budget and site, and advise on what is possible.' },
  { title: 'Design & Planning', icon: 'pencil', text: 'Architects prepare floor plans, elevations and 3D views for your approval.' },
  { title: 'Approvals', icon: 'clipboard', text: 'We obtain all permits and sanctions so construction can begin without delays.' },
  { title: 'Construction', icon: 'hardhat', text: 'Our engineers execute the build with stage-wise quality checks and updates.' },
  { title: 'Handover', icon: 'key', text: 'Final inspection, documentation and keys — your space is ready to use.' },
];

export const projectFilters = ['All', 'Residential', 'Villas', 'Commercial', 'Ongoing'];

// Sample projects — figures, years and amenities are placeholders.
export const projects = [
  {
    slug: 'greenfield-villas',
    title: 'Greenfield Villas',
    location: 'Saravanampatti, Coimbatore',
    category: 'Villas',
    status: 'Completed',
    details: '24 villas · 3 & 4 BHK',
    year: '2023',
    area: '2,400 – 3,200 sq. ft. per villa',
    units: '24 villas',
    img: img('1512917774080-9991f1c4c750', 600),
    cover: img('1512917774080-9991f1c4c750', 1400),
    description: [
      'Greenfield Villas is a gated community of 24 independent homes on a three-acre site in Saravanampatti, minutes from the IT corridor.',
      'Each villa has a private garden, a covered car porch and a terrace; the community shares a landscaped park, clubhouse and round-the-clock security.',
    ],
    amenities: ['Gated community with security', 'Clubhouse and party hall', 'Landscaped park and walking track', 'Children’s play area', 'Rainwater harvesting', 'Underground power cabling'],
  },
  {
    slug: 'lake-view-residency',
    title: 'Lake View Residency',
    location: 'Singanallur, Coimbatore',
    category: 'Residential',
    status: 'Completed',
    details: '96 apartments · 2 & 3 BHK',
    year: '2022',
    area: '1,050 – 1,480 sq. ft.',
    units: '96 apartments',
    img: img('1600585154340-be6161a56a0c', 600),
    cover: img('1600585154340-be6161a56a0c', 1400),
    description: [
      'Lake View Residency is a 96-unit apartment community overlooking Singanallur lake, planned so every home gets cross-ventilation and a view.',
      'The project was RERA-registered and handed over on schedule, with a clubhouse, gym and covered parking for every unit.',
    ],
    amenities: ['Clubhouse and gym', 'Covered car parking', '24/7 security with CCTV', 'Power backup for common areas', 'Water treatment plant', 'Rooftop garden'],
  },
  {
    slug: 'texcity-enclave',
    title: 'Texcity Enclave',
    location: 'Vadavalli, Coimbatore',
    category: 'Residential',
    status: 'Ongoing',
    details: '64 apartments · Ready by 2027',
    year: '2027',
    area: '1,120 – 1,650 sq. ft.',
    units: '64 apartments',
    img: img('1600607687920-4e2a09cf159d', 600),
    cover: img('1600607687920-4e2a09cf159d', 1400),
    description: [
      'Texcity Enclave brings 64 premium apartments to Vadavalli, close to schools and the Marudhamalai road.',
      'Structure work is complete and interiors are under way; bookings are open for 2 and 3 BHK homes with handover scheduled for 2027.',
    ],
    amenities: ['Swimming pool', 'Gym and yoga deck', 'Multipurpose hall', 'EV charging points', 'Indoor games room', 'Visitor parking'],
  },
  {
    slug: 'urban-heights',
    title: 'Urban Heights',
    location: 'Gandhipuram, Coimbatore',
    category: 'Commercial',
    status: 'Completed',
    details: '1.2 lakh sq. ft. office space',
    year: '2021',
    area: '1.2 lakh sq. ft.',
    units: 'G + 6 floors',
    img: img('1486406146926-c627a92ad1ab', 600),
    cover: img('1486406146926-c627a92ad1ab', 1400),
    description: [
      'Urban Heights is a G+6 office building in the heart of Gandhipuram, built for IT and professional-services tenants.',
      'Column-free floor plates, high-speed lifts and a glazed facade keep the building efficient to run and presentable for years.',
    ],
    amenities: ['Column-free floor plates', 'Three high-speed lifts', 'Basement and stilt parking', 'Fire-fighting and sprinkler systems', '100% power backup', 'Centralised air-conditioning provision'],
  },
  {
    slug: 'business-park',
    title: 'Business Park',
    location: 'Avinashi Road, Coimbatore',
    category: 'Commercial',
    status: 'Ongoing',
    details: 'IT and retail spaces · Phase 1',
    year: '2026',
    area: '2.4 lakh sq. ft. (Phase 1)',
    units: 'IT offices and retail',
    img: img('1497366216548-37526070297c', 600),
    cover: img('1497366216548-37526070297c', 1400),
    description: [
      'Business Park on Avinashi Road combines IT office floors with a ground-level retail promenade, developed in two phases.',
      'Phase 1 is under construction with the structure complete to the fourth floor; leasing enquiries are open.',
    ],
    amenities: ['Retail promenade', 'Food court and cafeteria', 'Multi-level car parking', 'Conference and training rooms', 'Rooftop solar', 'Sewage treatment plant'],
  },
  {
    slug: 'premium-villas',
    title: 'Premium Villas',
    location: 'Thudiyalur, Coimbatore',
    category: 'Villas',
    status: 'Ongoing',
    details: '18 villas · 4 BHK',
    year: '2026',
    area: '3,600 sq. ft. per villa',
    units: '18 villas',
    img: img('1600566753376-12c8ab7fb75b', 600),
    cover: img('1600566753376-12c8ab7fb75b', 1400),
    description: [
      'Premium Villas is a boutique community of 18 four-bedroom homes in Thudiyalur, each on a 2,400 sq. ft. plot.',
      'Homes feature double-height living rooms, home-office spaces and private terraces; eight villas are already booked.',
    ],
    amenities: ['Private terrace garden', 'Home automation ready', 'Solar water heating', 'Gated entry with intercom', 'Community lawn', 'Modular kitchen included'],
  },
  {
    slug: 'riverside-apartments',
    title: 'Riverside Apartments',
    location: 'Kuniyamuthur, Coimbatore',
    category: 'Residential',
    status: 'Ongoing',
    details: '48 apartments · 2 & 3 BHK',
    year: '2027',
    area: '980 – 1,420 sq. ft.',
    units: '48 apartments',
    img: img('1541976590-713941681591', 600),
    cover: img('1541976590-713941681591', 1400),
    description: [
      'Riverside Apartments is a compact 48-home community near the Noyyal river, designed with first-time buyers in mind.',
      'Foundation work is complete and bookings are open at launch prices, with handover planned for 2027.',
    ],
    amenities: ['Rooftop lounge', 'Gym', 'Children’s play area', 'Covered parking', 'Rainwater harvesting', 'Intercom security'],
  },
  {
    slug: 'tech-park-phase-2',
    title: 'Tech Park Phase 2',
    location: 'Saravanampatti, Coimbatore',
    category: 'Commercial',
    status: 'Completed',
    details: '80,000 sq. ft. IT offices',
    year: '2024',
    area: '80,000 sq. ft.',
    units: 'G + 4 floors',
    img: img('1431576901776-e539bd916ba2', 600),
    cover: img('1431576901776-e539bd916ba2', 1400),
    description: [
      'Tech Park Phase 2 adds 80,000 sq. ft. of IT office space to an existing campus in Saravanampatti.',
      'Delivered in fourteen months, the building was handed over fully leased to two technology tenants.',
    ],
    amenities: ['Double-glazed facade', 'Raised flooring and data provisioning', '24/7 power backup', 'Cafeteria', 'Two-wheeler and car parking', 'Access-controlled entry'],
  },
  {
    slug: 'garden-villas',
    title: 'Garden Villas',
    location: 'Kovaipudur, Coimbatore',
    category: 'Villas',
    status: 'Completed',
    details: '12 villas · 3 BHK',
    year: '2020',
    area: '2,100 sq. ft. per villa',
    units: '12 villas',
    img: img('1600047509807-ba8f99d2cdde', 600),
    cover: img('1600047509807-ba8f99d2cdde', 1400),
    description: [
      'Garden Villas is a quiet enclave of twelve three-bedroom homes in Kovaipudur, built around a central garden.',
      'One of our earliest gated projects, it set the standard for the landscaping and after-sales support we offer today.',
    ],
    amenities: ['Central landscaped garden', 'Gated community', 'Rainwater harvesting', 'Borewell and corporation water', 'Street lighting', 'Visitor parking'],
  },
];

// Sample testimonials — replace with real client reviews before going live.
export const testimonials = [
  { quote: 'The team explained every stage clearly and handed over our villa a week ahead of schedule. The finish quality is excellent.', name: 'Client name', rating: 5, role: 'Villa owner, Greenfield Villas' },
  { quote: 'From approvals to interiors, everything was handled in-house. We never had to chase anyone for updates.', name: 'Client name', rating: 5, role: 'Apartment owner, Lake View Residency' },
  { quote: 'Our new office was designed around how we actually work. The project stayed within the quoted budget.', name: 'Client name', rating: 5, role: 'Business owner, Urban Heights' },
  { quote: 'Interiors, approvals, everything moved exactly on the timeline they gave us at the start. No last-minute surprises.', name: 'Client name', rating: 5, role: 'Resident, Texcity Enclave' },
  { quote: 'We compared three builders before choosing Texcity. Their site supervision and material quality stood out clearly.', name: 'Client name', rating: 5, role: 'Villa owner, Premium Villas' },
  { quote: 'Leasing our office space was simple because the building was handed over exactly as specified, on the agreed date.', name: 'Client name', rating: 5, role: 'Tenant, Business Park' },
];

export const enquiryOptions = [
  'Standard Package',
  'Premium Package',
  'Ultra Luxury',
  'Building Approvals',
  'Residential & Commercial Projects',
  'Architectural Design',
  'Structural Design',
  'Equipment Services',
  'Interior Design',
  'Layout Development',
  'Other',
];

// Call-to-action band shown at the end of most pages.
export const cta = {
  title: 'Ready to build your dream space?',
  text: 'Book a free consultation and site visit. Our team will walk you through plans, approvals, budgets and timelines — with no obligation.',
  primary: { label: 'Book a Free Consultation', to: '/contact' },
};

// General questions (Contact page).
export const faqs = [
  { q: 'Do you charge for a site visit or first consultation?', a: 'No. The first consultation and site visit are free. We look at your plot or property, discuss what you want to build and give you a realistic range for cost and timeline.' },
  { q: 'Which areas of Coimbatore do you work in?', a: 'All of Coimbatore city and its outskirts, including Saravanampatti, Vadavalli, Thudiyalur, Singanallur, Kovaipudur and the Avinashi Road corridor. For sites outside the district, get in touch and we will confirm.' },
  { q: 'How is pricing worked out?', a: 'After the design is approved we prepare an itemised quotation covering structure, finishes and services. Most projects are signed as fixed-price contracts, so the final bill matches the quote unless you change the scope.' },
  { q: 'How long does a villa take to build?', a: 'A typical 3 or 4 BHK villa takes 10 to 14 months from approved plans to handover, including interiors. Apartment communities take 18 to 30 months depending on size.' },
  { q: 'Can I visit an ongoing site?', a: 'Yes. We encourage clients to see our work in progress. Site visits are arranged on weekdays with a supervisor present.' },
  { q: 'What happens after handover?', a: 'Every project comes with a one-year structural warranty and a dedicated support contact for snags, documentation and maintenance questions.' },
];

// Service-specific questions (Services page).
export const serviceFaqs = [
  { q: 'Do you build on my plot or only in your own communities?', a: 'Both. We build villas on client-owned plots anywhere in Coimbatore, and we develop our own gated communities where you can choose a plot and a plan.' },
  { q: 'Can you take over a project another contractor started?', a: 'Yes, after a structural audit. Our engineers inspect the work done so far, document it and give you a clear plan and cost to complete.' },
  { q: 'Do you handle approvals if I only need design?', a: 'Yes. Approvals, structural engineering and interiors are available as standalone services, run by the same coordinators who manage our full projects.' },
  { q: 'Which materials and brands do you use?', a: 'Branded cement and TMT steel, ISI-marked electrical and plumbing materials, and finishes you select from our showroom partners. Material test reports are shared on request.' },
  { q: 'How are payments scheduled?', a: 'Payments are linked to construction stages — foundation, structure, masonry, finishes and handover — so you pay as work is completed and inspected.' },
  { q: 'Is there a warranty on interiors and renovation work?', a: 'Yes. Interior and renovation work carries a one-year workmanship warranty in addition to manufacturer warranties on fittings and modular units.' },
];
