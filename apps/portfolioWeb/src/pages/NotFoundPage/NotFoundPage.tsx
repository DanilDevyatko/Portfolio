import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <section className={styles.page} aria-labelledby="not-found-title">
      <p className={styles.code}>404</p>
      <h2 id="not-found-title">Page not found.</h2>
      <p className={styles.text}>There's nothing on this address. Let's get you back.</p>
      <div className={styles.actions}>
        <Link to="/home">Go home</Link>
        <Link to="/projects">See projects</Link>
      </div>
    </section>
  );
}

/** Rendered by the router when a page throws or a lazy chunk fails to load. */
export function RouteErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundPage />;
  }

  return (
    <section className={styles.page} aria-labelledby="route-error-title">
      <p className={styles.code}>Oops</p>
      <h2 id="route-error-title">Something broke.</h2>
      <p className={styles.text}>
        Most likely a new version was just deployed. Reload the page.
      </p>
      <div className={styles.actions}>
        <button type="button" onClick={() => window.location.reload()}>
          Reload page
        </button>
        <Link to="/home">Go home</Link>
      </div>
    </section>
  );
}
