// Copy this file to `assets/js/ranking-config.js` and fill your API urls.
// The API should return and accept this shape:
// GET  __RANKING_STATS_URL__ -> { totalTests: number, resultStats: { [spiritId]: number } }
// POST __RANKING_HIT_URL__ body { spiritId: string } -> same response shape.

window.__RANKING_STATS_URL__ = '';
window.__RANKING_HIT_URL__ = '';
window.__RANKING_TOKEN__ = ''; // optional bearer token
