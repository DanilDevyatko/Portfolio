import { useEffect, useState } from 'react';
import styles from './RotatingSentences.module.css';

type RotatingSentencesProps = {
  sentences: string[];
  intervalMs?: number;
  transitionDuration?: number;
  className?: string;
};
export function RotatingSentences({
  sentences,
  intervalMs = 2500,
  transitionDuration = 200,
  className,
}: RotatingSentencesProps) {
  const isSentencesEmpty = sentences.length === 0;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (isSentencesEmpty) return;

    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % sentences.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [intervalMs, sentences.length, isSentencesEmpty]);
  return (
    <div
      className={className}
      style={{ [`--transitionDuration` as string]: transitionDuration }}
    >
      <h2 className={styles.sentence} key={index}>
        {sentences[index]}
      </h2>
    </div>
  );
}
