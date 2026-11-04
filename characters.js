const BASE_URL = 'https://rickandmortyapi.com/api/character';

/**
 * Busca uma página de personagens.
 * Retorna { results, next } onde `next` é o número da próxima página (ou null).
 */
export async function fetchCharacters({ page = 1, name = '', signal } = {}) {
  let url = `${BASE_URL}?page=${page}`;
  if (name.trim()) url += `&name=${encodeURIComponent(name.trim())}`;

  const res = await fetch(url, { signal });

  // A API responde 404 quando a busca não encontra nada
  if (res.status === 404) return { results: [], next: null };
  if (!res.ok) throw new Error(`Falha ao carregar dados (erro ${res.status}).`);

  const data = await res.json();
  return {
    results: data.results,
    next: data.info?.next ? page + 1 : null,
  };
}
