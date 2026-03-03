import { useLocation, useOutlet } from 'react-router-dom';
import styles from './AppShell.module.css';
import { Nav } from '../widgets/Nav/Nav';
import ReactMarkdown from 'react-markdown';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { MouseFollower } from '../widgets/MouseFollower/MouseFollower';
import { CrowdSimulator } from '../widgets/CrowdSimulator/CrowdSimulator';
import { Preloader } from '../widgets/preloader/Preloader';

const markdowns = import.meta.glob<string>('../content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const variants = {
  initial: { opacity: 0, y: 10, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -8, filter: 'blur(6px)' },
};

export function AppShell() {
  const location = useLocation();
  const outlet = useOutlet();
  const prefersReducedMotion = useReducedMotion();
  const [loading, setLoading] = useState(true);
  const [hasOverflow, setHasOverflow] = useState(false);
  const outletRef = useRef<HTMLDivElement | null>(null);

  // Freeze what is currently shown so exit can animate the *old* page
  const [shownKey, setShownKey] = useState(location.pathname);
  const [shownNode, setShownNode] = useState<ReactNode>(outlet);

  // Controls mount/unmount for exit animation
  const [isPresent, setIsPresent] = useState(true);

  // Store next page while current is exiting
  const pendingRef = useRef<{ key: string; node: ReactNode } | null>(null);

  // Start exit when path changes
  useEffect(() => {
    if (location.pathname !== shownKey) {
      pendingRef.current = { key: location.pathname, node: outlet };

      // Syncing to an external system (router location).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsPresent(false);
    }
  }, [location.pathname, outlet, shownKey]);

  useEffect(() => {
    const id = window.setTimeout(
      () => setLoading(false),
      prefersReducedMotion ? 0 : 3200,
    );
    return () => window.clearTimeout(id);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const element = outletRef.current;
    if (!element) {
      return;
    }

    const updateOverflow = () => {
      setHasOverflow(element.scrollHeight > element.clientHeight + 1);
    };

    const resizeObserver = new ResizeObserver(updateOverflow);
    resizeObserver.observe(element);
    window.addEventListener('resize', updateOverflow);
    const mutationObserver = new MutationObserver(updateOverflow);
    mutationObserver.observe(element, {
      subtree: true,
      childList: true,
      characterData: true,
    });
    const rafId = window.requestAnimationFrame(updateOverflow);
    const timeoutId = window.setTimeout(updateOverflow, 200);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateOverflow);
    };
  }, [shownKey, isPresent]);

  return (
    <div className={styles.shell}>
      {loading && !prefersReducedMotion && <Preloader />}
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <ReactMarkdown>{markdowns['../content/appShell.md'] ?? ''}</ReactMarkdown>
          </div>
          <div className={styles.socials}>
            <ReactMarkdown
              components={{
                a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" />,
              }}
            >
              {markdowns['../content/socials.md'] ?? ''}
            </ReactMarkdown>
          </div>
        </header>
        <Nav />
        <div
          className={`${styles.outletWrapper} ${hasOverflow ? styles.outletWrapperHasScroll : ''}`.trim()}
        >
          <AnimatePresence
            mode="wait"
            initial={false}
            onExitComplete={() => {
              const next = pendingRef.current;
              if (next) {
                setShownKey(next.key);
                setShownNode(next.node);
                pendingRef.current = null;
              }
              setIsPresent(true);
            }}
          >
            {isPresent && (
              <motion.div
                key={shownKey}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }
                style={{
                  willChange: prefersReducedMotion
                    ? 'auto'
                    : 'transform, opacity, filter',
                }}
                ref={outletRef}
                className={styles.outlet}
              >
                {shownNode}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!prefersReducedMotion && <MouseFollower />}
        <div className={styles.crowdSimulator}>
          {!prefersReducedMotion && <CrowdSimulator />}
        </div>
        <div className={styles.copyright}>&copy; Danylo Deviatko</div>
      </main>
    </div>
  );
}
