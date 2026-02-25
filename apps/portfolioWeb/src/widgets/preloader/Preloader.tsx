const preloaderWords = ['Danylo', 'Deviatko', 'Portfolio'];
import styles from './Preloader.module.css';

export function Preloader() {
  return (
    <div className={styles.preloader}>
      {preloaderWords.map((word, i) => (
        <span key={word} className={styles.word} style={{ ['--i' as string]: i }}>
          {word}
        </span>
      ))}
    </div>
  );
}
