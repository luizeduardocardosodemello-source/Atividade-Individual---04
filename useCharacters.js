import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchCharacters } from '../api/characters';

export function useCharacters(query) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const nextPage = useRef(null);
  const controller = useRef(null);

  const loadFirst = useCallback(
    async (isRefresh = false) => {
      controller.current?.abort();
      const ctrl = new AbortController();
      controller.current = ctrl;

      if (isRefresh) setRefreshing(true);
      else setStatus('loading');

      try {
        const { results, next } = await fetchCharacters({
          page: 1,
          name: query,
          signal: ctrl.signal,
        });
        setItems(results);
        nextPage.current = next;
        setError(null);
        setStatus('ready');
      } catch (e) {
        if (e.name === 'AbortError') return;
        setError(e.message || 'Não foi possível carregar os dados.');
        setStatus('error');
      } finally {
        if (controller.current === ctrl) setRefreshing(false);
      }
    },
    [query]
  );

  // Recarrega quando a busca muda (com debounce para não chamar a API a cada tecla)
  useEffect(() => {
    const timer = setTimeout(() => loadFirst(), query ? 400 : 0);
    return () => clearTimeout(timer);
  }, [loadFirst, query]);

  useEffect(() => () => controller.current?.abort(), []);

  const loadMore = useCallback(async () => {
    if (!nextPage.current || loadingMore || status !== 'ready') return;
    setLoadingMore(true);
    try {
      const { results, next } = await fetchCharacters({
        page: nextPage.current,
        name: query,
      });
      setItems((prev) => [...prev, ...results]);
      nextPage.current = next;
    } catch {
      // Mantém a lista atual; o usuário pode tentar de novo rolando a tela
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, query, status]);

  return {
    items,
    status,
    error,
    refreshing,
    loadingMore,
    reload: () => loadFirst(),
    refresh: () => loadFirst(true),
    loadMore,
  };
}
