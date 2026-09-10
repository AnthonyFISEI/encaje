// WordPress REST API caps each response (10 items by default, 100 max),
// so collections are requested page by page until every item is loaded.
const PER_PAGE = 100;

async function fetchPage(url, page, options) {
  const pageUrl = new URL(url);
  pageUrl.searchParams.set("per_page", String(PER_PAGE));
  pageUrl.searchParams.set("page", String(page));

  const response = await fetch(pageUrl, options);
  if (!response.ok) {
    const error = new Error(`WordPress API responded ${response.status} (${pageUrl})`);
    error.status = response.status;
    throw error;
  }
  return response;
}

/**
 * Fetches every item of a WordPress REST collection, e.g.
 * fetchAllWp(`${BACKEND_URL}/wp-json/wp/v2/projects?_embed`).
 * Throws on network errors or non-OK responses (error.status holds the HTTP code).
 */
export async function fetchAllWp(url, options = {}) {
  const firstPage = await fetchPage(url, 1, options);
  const items = await firstPage.json();
  const totalPages = Number(firstPage.headers.get("X-WP-TotalPages")) || 1;

  if (totalPages > 1) {
    const remainingPages = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, i) =>
        fetchPage(url, i + 2, options).then((response) => response.json())
      )
    );
    items.push(...remainingPages.flat());
  }

  return items;
}
