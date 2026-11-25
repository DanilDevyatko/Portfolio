import { Link } from 'react-router-dom';
import { RotatingSentences } from '../../widgets/RotatingSentences/RotatingSentences';
import { contact, intro, stats } from '../../content/profile';
import homeMarkdown from '../../content/home.md?raw';
import styles from './HomePage.module.css';

const headings = homeMarkdown
  .split('.')
  .map((sentence) => sentence.trim())
  .filter(Boolean);

export function HomePage() {
  return (
    <section className={styles.page} aria-label="Introduction">
      <RotatingSentences sentences={headings} className={styles.hero} />

      <div className={styles.intro}>
        <p className={styles.lead}>{intro.lead}</p>
        <p className={styles.body}>{intro.body}</p>
      </div>

      <dl className={styles.stats}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <dt className={styles.statLabel}>{stat.label}</dt>
            <dd className={styles.statValue}>{stat.value}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.actions}>
        <Link to="/projects" className={styles.primary}>
          View projects
        </Link>
        <a href={contact.cvUrl} target="_blank" rel="noopener noreferrer">
          Download CV
        </a>
        <a href={`mailto:${contact.email}`}>Get in touch</a>
      </div>
    </section>
  );
}
