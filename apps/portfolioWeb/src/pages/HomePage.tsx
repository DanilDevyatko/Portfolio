import { RotatingSentences } from '../widgets/RotatingSentences/RotatingSentences';

const markdowns = import.meta.glob<string>('../content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});
const headings = (markdowns['../content/home.md'] ?? '')
  .split('.')
  .map((sentence) => sentence.trim())
  .filter(Boolean);

export function HomePage() {
  return <RotatingSentences sentences={headings} />;
}
