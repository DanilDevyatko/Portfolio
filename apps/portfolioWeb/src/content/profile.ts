// Structured CV data. Long-form prose stays in the markdown files next to this one.

export const contact = {
  email: 'danil.devyatko9@gmail.com',
  location: 'Prague, Czechia',
  cvUrl: '/Danylo_Deviatko_CV.pdf',
};

export const intro = {
  lead: 'I build UI inside the World of Tanks game client at Wargaming.',
  body: '5+ years with React and TypeScript. Before Wargaming — conversion-focused products for Fortuna and 25+ e-commerce projects as a freelancer.',
};

export const stats = [
  { value: '5+', label: 'years with React & TypeScript' },
  { value: '7', label: 'features shipped to World of Tanks' },
  { value: '25+', label: 'client projects delivered' },
];

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  projectSlug?: string;
};

export const experience: ExperienceItem[] = [
  {
    company: 'Wargaming',
    role: 'Frontend Engineer / Game UI Engineer',
    period: '06/2024 – Present',
    location: 'Prague',
    summary:
      'UI inside the World of Tanks game client. Technical owner of WoT Plus, frontend lead for the Waffenträger feature.',
    projectSlug: 'worldoftanks',
  },
  {
    company: 'FEG (Fortuna)',
    role: 'Frontend Developer',
    period: '09/2023 – 05/2024',
    summary:
      'Conversion-focused micro-products on ifortuna.cz: promotional campaigns, customer offers, GTM analytics.',
    projectSlug: 'fortuna',
  },
  {
    company: 'Self-employed',
    role: 'Frontend Engineer / E-commerce Developer',
    period: '04/2020 – 05/2023',
    summary:
      '25+ client projects, mostly Shopify stores, always as the sole frontend developer.',
    projectSlug: 'balto',
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Frontend',
    items: ['React 19', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'SCSS', 'CSS Modules'],
  },
  {
    group: 'Frameworks & libraries',
    items: [
      'Next.js (App Router)',
      'React Router',
      'MobX',
      'Redux',
      'Framer Motion',
      'GSAP',
    ],
  },
  {
    group: 'Architecture & UI',
    items: [
      'Component architecture',
      'SPA',
      'Responsive design',
      'Accessibility',
      'Performance',
      'Cross-browser',
    ],
  },
  { group: 'Testing', items: ['Vitest', 'Jest', 'React Testing Library'] },
  {
    group: 'Tooling',
    items: [
      'Git',
      'Vite',
      'Webpack',
      'ESLint',
      'CI/CD',
      'pnpm monorepo',
      'Docker',
      'Vercel',
      'Figma',
    ],
  },
  { group: 'Backend & data', items: ['Prisma', 'PostgreSQL'] },
  {
    group: 'Also',
    items: [
      'Coherent Gameface',
      'Shopify Liquid',
      'Google Tag Manager',
      'Claude Code',
      'OpenAI Codex',
    ],
  },
];

export const education = {
  degree: 'BSc in Infocommunications',
  school: 'Kharkiv National University of Radio Electronics (NURE)',
  languages: ['English – B2'],
};
