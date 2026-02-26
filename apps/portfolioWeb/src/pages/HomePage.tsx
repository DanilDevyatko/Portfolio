import { getHomeMarkdown } from '../shared/content/home';
import { RotatingSentences } from '../widgets/RotatingSentences/RotatingSentences';

const homeMarkdown = getHomeMarkdown();
const headings = homeMarkdown
  .split('.')
  .map((sentence) => sentence.trim())
  .filter(Boolean);

export function HomePage() {
  return <RotatingSentences sentences={headings} />;
}
