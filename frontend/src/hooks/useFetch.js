import { useState, useEffect } from 'react';

/**
 * Hook genérico para buscar dados de uma função assíncrona.
 * @param {Function} fetchFn - Função que retorna uma Promise (ex: () => getContent())
 * @param {Array} deps - Dependências para re-executar
 */
export function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchFn()
      .then(({ data }) => { if (!cancelled) setData(data); })
      .catch((err) => { if (!cancelled) setError(err.response?.data?.error || 'Erro ao carregar.'); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, deps);

  return { data, loading, error };
}
