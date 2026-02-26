import { useLocation, useOutlet } from 'react-router-dom';
import styles from './AppShell.module.css';
import { Nav } from '../widgets/Nav/Nav';
import ReactMarkdown from 'react-markdown';
import { getAppShellMarkdown } from '../shared/content/appShell';
import { getSocialsMarkdown } from '../shared/content/socials';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { MouseFollower } from '../widgets/MouseFollower/MouseFollower';
import { CrowedSimulator } from '../widgets/CrowdSimulator/CrowdSimulator';
import { Preloader } from '../widgets/preloader/Preloader';

const appShellMarkdown = getAppShellMarkdown();
const socialsMarkdown = getSocialsMarkdown();

const variants = {
  initial: { opacity: 0, y: 10, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -8, filter: 'blur(6px)' },
};

export function AppShell() {
  const location = useLocation();
  const outlet = useOutlet();
  const [loading, setLoading] = useState(true);

  // Freeze what is currently shown so exit can animate the *old* page
  const [shownKey, setShownKey] = useState(location.pathname);
  const [shownNode, setShownNode] = useState<React.ReactNode>(outlet);

  // Controls mount/unmount for exit animation
  const [isPresent, setIsPresent] = useState(true);

  // Store next page while current is exiting
  const pendingRef = useRef<{ key: string; node: React.ReactNode } | null>(null);

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
    const id = window.setTimeout(() => setLoading(false), 3200);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className={styles.shell}>
      {loading && <Preloader />}
      <main className={styles.main}>
        <ReactMarkdown>{appShellMarkdown}</ReactMarkdown>
        <Nav />
        <div className={styles.outletWrapper}>
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
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: 'transform, opacity, filter' }}
                className={styles.outlet}
              >
                {shownNode}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className={styles.socials}>
          <ReactMarkdown>{socialsMarkdown}</ReactMarkdown>
        </div>
        <div className={styles.copyright}>&copy; Danylo Deviatko</div>
        <MouseFollower />
        <div className={styles.crowdSimulator}>
          <CrowedSimulator />
        </div>
      </main>
    </div>
  );
}
