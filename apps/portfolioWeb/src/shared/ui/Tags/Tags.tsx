import styles from './Tags.module.css';

type TagsProps = {
  items: string[];
  label?: string;
  className?: string;
};

export function Tags({ items, label = 'Tech stack', className }: TagsProps) {
  return (
    <ul className={[styles.tags, className].filter(Boolean).join(' ')} aria-label={label}>
      {items.map((item) => (
        <li key={item} className={styles.tag}>
          {item}
        </li>
      ))}
    </ul>
  );
}
