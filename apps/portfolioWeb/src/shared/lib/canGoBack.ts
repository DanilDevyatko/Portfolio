/**
 * True only when there is an in-app history entry to go back to.
 *
 * `window.history.length > 1` is also true when the visitor arrived from
 * another site (Google, LinkedIn…), so going back would leave the portfolio.
 * React Router stores the in-app position as `idx` in `history.state`.
 */
export function canGoBack(): boolean {
  const state = window.history.state as { idx?: number } | null;
  return typeof state?.idx === 'number' && state.idx > 0;
}
