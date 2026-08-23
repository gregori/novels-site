import { searchTitles, type SearchIndexEntry } from '../lib/search';

let indexPromise: Promise<SearchIndexEntry[]> | null = null;

function loadIndex(): Promise<SearchIndexEntry[]> {
  // Fails silently per NFR Design: a failed fetch just means search returns no results.
  if (!indexPromise) {
    indexPromise = fetch('/search-index.json')
      .then((res) => (res.ok ? res.json() : []))
      .catch(() => []);
  }
  return indexPromise;
}

function renderResults(list: HTMLElement, results: SearchIndexEntry[]): void {
  list.replaceChildren();
  for (const entry of results) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `/titles/${entry.slug}/`;
    a.textContent = `${entry.title} — ${entry.originalAuthor}`;
    a.dataset.testid = 'search-result-link';
    li.appendChild(a);
    list.appendChild(li);
  }
}

export function initSearchWidget(input: HTMLInputElement, resultsList: HTMLElement): void {
  input.addEventListener('input', () => {
    const query = input.value;
    if (query.trim().length === 0) {
      renderResults(resultsList, []);
      return;
    }
    loadIndex().then((index) => {
      renderResults(resultsList, searchTitles(query, index));
    });
  });
}
