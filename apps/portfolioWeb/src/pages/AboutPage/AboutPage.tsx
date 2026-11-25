import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useEscapeBackNavigation } from '../../shared/hooks/useEscapeBackNavigation';
import { Tags } from '@shared-ui/Tags/Tags';
import { contact, education, experience, skills } from '../../content/profile';
import aboutMarkdown from '../../content/about.md?raw';
import styles from './AboutPage.module.css';

export function AboutPage() {
  useEscapeBackNavigation({ fallbackPath: '/home' });

  return (
    <div className={styles.page}>
      <section aria-labelledby="about-title">
        <h2 id="about-title">About</h2>
        <div className={styles.prose}>
          <ReactMarkdown>{aboutMarkdown}</ReactMarkdown>
        </div>
      </section>

      <section aria-labelledby="experience-title">
        <h3 id="experience-title" className={styles.sectionTitle}>
          Experience
        </h3>
        <ol className={styles.timeline}>
          {experience.map((item) => (
            <li key={item.company} className={styles.timelineItem}>
              <p className={styles.period}>{item.period}</p>
              <div>
                <p className={styles.company}>
                  {item.projectSlug ? (
                    <Link to={`/projects/${item.projectSlug}`}>{item.company}</Link>
                  ) : (
                    item.company
                  )}
                </p>
                <p className={styles.role}>
                  {item.role}
                  {item.location ? ` · ${item.location}` : ''}
                </p>
                <p className={styles.summary}>{item.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="skills-title">
        <h3 id="skills-title" className={styles.sectionTitle}>
          Skills
        </h3>
        <dl className={styles.skills}>
          {skills.map((skill) => (
            <div key={skill.group} className={styles.skillRow}>
              <dt className={styles.skillGroup}>{skill.group}</dt>
              <dd className={styles.skillItems}>
                <Tags items={skill.items} label={skill.group} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="education-title">
        <h3 id="education-title" className={styles.sectionTitle}>
          Education & languages
        </h3>
        <p>
          <strong className={styles.strong}>{education.degree}</strong>,{' '}
          {education.school}
        </p>
        <p className={styles.summary}>{education.languages.join(' · ')}</p>
      </section>

      <section aria-labelledby="contact-title" className={styles.contact}>
        <h3 id="contact-title" className={styles.sectionTitle}>
          Contact
        </h3>
        <p>Based in {contact.location}. The fastest way to reach me is email.</p>
        <div className={styles.actions}>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={contact.cvUrl} target="_blank" rel="noopener noreferrer">
            Download CV (PDF)
          </a>
        </div>
      </section>
    </div>
  );
}
