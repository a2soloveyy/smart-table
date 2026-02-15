import { getPages } from "../lib/utils.js";

export const initPagination = (elements, createPage) => {
  const { pages, fromRow, toRow, totalRows } = elements;

  let pageCount;
  let pageTemplate = null

  const applyPagination = (query, state, action) => {
    const limit = state.rowsPerPage;
    let page = state.page;

    if (action) switch (action.name) {
      case 'prev':  page = Math.max(1, page - 1); break;
      case 'next':  page = pageCount ? Math.min(pageCount, page + 1) : page + 1; break;
      case 'first': page = 1; break;
      case 'last':  page = pageCount ?? 1; break;
    }

    return Object.assign({}, query, { limit, page });
  };

  const updatePagination = (total, { page, limit }) => {
    pageCount = Math.ceil(total / limit);

    if (!pageTemplate) {
      pageTemplate = pages.firstElementChild.cloneNode(true);
      pages.firstElementChild.remove();
    }


    const visiblePages = getPages(page, pageCount, 5);
    pages.replaceChildren(
      ...visiblePages.map(pageNumber => {
        const el = pageTemplate.cloneNode(true);
        return createPage(el, pageNumber, pageNumber === page);
      })
    );

    const from = total ? (page - 1) * limit + 1 : 0;
    fromRow.textContent = from;
    toRow.textContent = Math.min(page * limit, total);
    totalRows.textContent = total;
  };

  return { applyPagination, updatePagination };
};
