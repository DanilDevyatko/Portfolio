export type ProjectMeta = {
  slug: string;
  title: string;
  /** Company or context, e.g. "Wargaming" or "Personal project". */
  client: string;
  role: string;
  period: string;
  /** One line shown on the projects list. */
  summary: string;
  stack: string[];
  /** Key results shown as a list on the detail page. */
  highlights: string[];
  liveUrl?: string;
  repoUrl?: string;
};

export const projectMeta: ProjectMeta[] = [
  {
    slug: 'worldoftanks',
    title: 'World of Tanks',
    client: 'Wargaming',
    role: 'Frontend / Game UI Engineer',
    period: '2024 – Present',
    summary:
      'Game UI inside the World of Tanks client — live game, real players, real-time constraints.',
    stack: ['React', 'TypeScript', 'MobX', 'SCSS', 'Coherent Gameface'],
    highlights: [
      'Shipped 7 production features and live events to the live game.',
      'Technical owner of the WoT Plus subscription.',
      'Owned frontend delivery of the entire Waffenträger feature — planning, estimates, integration, debugging, release.',
      'Eliminated rendering flicker by replacing PNG assets with DDS textures — lower runtime image-processing cost.',
      'Rebuilt battle timers so they stay accurate when the application loses focus.',
      'Improved shared libraries and internal tooling; led knowledge-sharing sessions for 4–14 developers.',
    ],
    liveUrl: 'https://worldoftanks.eu',
  },
  {
    slug: 'fortuna',
    title: 'Fortuna',
    client: 'FEG (Fortuna)',
    role: 'Frontend Developer',
    period: '2023 – 2024',
    summary:
      'Conversion-focused micro-products on ifortuna.cz. High traffic, business-critical.',
    stack: ['React', 'TypeScript', 'JavaScript', 'SPA', 'Google Tag Manager'],
    highlights: [
      'Shipped 5+ production features in a React SPA: promotional campaigns and customer offers.',
      'Delivered most assigned features independently in a 4-person team — from requirements to production.',
      'Implemented Google Tag Manager event tracking, connecting user behavior to measurable business outcomes.',
    ],
    liveUrl: 'https://bonus.ifortuna.cz',
  },
  {
    slug: 'balto',
    title: 'Balto & e-commerce clients',
    client: 'Freelance',
    role: 'Frontend Engineer / E-commerce Developer',
    period: '2020 – 2023',
    summary:
      '25+ client projects, mostly Shopify. Always the only frontend developer on the project.',
    stack: ['Shopify Liquid', 'JavaScript', 'SCSS', 'WordPress', 'Drupal'],
    highlights: [
      'Delivered 25+ client projects, including Balto.',
      'Built product pages, promotional sections, interactive components and responsive layouts.',
      'Treated accessibility as a core requirement, not an afterthought. Optimized load speed across devices.',
      'Translated business requirements into technical solutions and explained trade-offs to clients.',
    ],
    liveUrl: 'https://www.balto.fr',
  },
  {
    slug: 'somethink',
    title: 'SomeThink',
    client: 'Personal project',
    role: 'Full-stack (solo)',
    period: '2026',
    summary:
      'Footwear comparison for the Czech market. Affiliate model, my own full stack.',
    stack: [
      'Next.js (App Router)',
      'TypeScript',
      'Prisma',
      'PostgreSQL',
      'Docker',
      'Vitest',
      'Vercel',
    ],
    highlights: [
      'pnpm monorepo with a Next.js web app and a separate feed-import worker.',
      'Product-feed importer with a dry-run report before anything is written to the catalog.',
      'PostgreSQL catalog managed with Prisma migrations and seeds; local database in Docker.',
    ],
    repoUrl: 'https://github.com/DanilDevyatko/SomeThink',
  },
  {
    slug: 'portfolio',
    title: 'This portfolio',
    client: 'Personal project',
    role: 'Design & development',
    period: '2026',
    summary: 'This site. React 19, strict TypeScript, markdown-driven content.',
    stack: ['React 19', 'TypeScript (strict)', 'Vite', 'Framer Motion', 'GSAP', 'Vitest'],
    highlights: [
      'Lazy-loaded routes and markdown-driven content.',
      'Canvas crowd animation (GSAP) and page transitions (Framer Motion), both off under prefers-reduced-motion.',
      'Dark and light theme — no flash of the wrong one on load.',
      'Architecture decisions recorded as ADRs.',
    ],
    liveUrl: 'https://danylo.xyz',
    repoUrl: 'https://github.com/DanilDevyatko/Portfolio',
  },
];
