const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Ranking-Token'
};

const DEFAULT_STATE = {
  totalTests: 0,
  resultStats: {}
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...CORS_HEADERS
    }
  });
}

async function loadState(env) {
  const raw = await env.RANKING_KV.get('stats');
  if (!raw) return { ...DEFAULT_STATE };
  try {
    const parsed = JSON.parse(raw);
    return {
      totalTests: Number(parsed.totalTests || 0),
      resultStats: parsed.resultStats || {}
    };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

async function saveState(env, state) {
  await env.RANKING_KV.put('stats', JSON.stringify(state));
}

function isAuthorized(request, env) {
  if (!env.API_TOKEN) return true;
  const h = request.headers;
  const bearer = h.get('Authorization') || '';
  const token = h.get('X-Ranking-Token') || '';
  const bearerValue = bearer.startsWith('Bearer ') ? bearer.slice(7) : '';
  return token === env.API_TOKEN || bearerValue === env.API_TOKEN;
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);

    if (url.pathname === '/stats' && request.method === 'GET') {
      const state = await loadState(env);
      return json(state);
    }

    if (url.pathname === '/hit' && request.method === 'POST') {
      if (!isAuthorized(request, env)) {
        return json({ error: 'Unauthorized' }, 401);
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: 'Invalid JSON' }, 400);
      }

      const spiritId = String(body?.spiritId || '').trim();
      if (!spiritId) {
        return json({ error: 'spiritId is required' }, 400);
      }

      const state = await loadState(env);
      state.resultStats[spiritId] = Number(state.resultStats[spiritId] || 0) + 1;
      state.totalTests = Number(state.totalTests || 0) + 1;
      await saveState(env, state);
      return json(state);
    }

    return json({ error: 'Not Found' }, 404);
  }
};
