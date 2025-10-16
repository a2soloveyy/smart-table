import { getPages } from "../lib/utils.js";

export const initPagination = (elements, createPage) => {
  const { pages, fromRow, toRow, totalRows } = elements;

  let pageCount;           // количество страниц после ответа сервера
  let pageTemplate = null; // шаблон кнопки страницы

  // ДО запроса: формируем query
  const applyPagination = (query, state, action) => {
    const limit = state.rowsPerPage;
    let page = state.page;

    // обработка действий пагинации
    if (action) switch (action.name) {
      case 'prev':  page = Math.max(1, page - 1); break;
      case 'next':  page = pageCount ? Math.min(pageCount, page + 1) : page + 1; break;
      case 'first': page = 1; break;
      case 'last':  page = pageCount ?? 1; break;
    }

    return Object.assign({}, query, { limit, page });
  };

  // ПОСЛЕ запроса: перерисовать кнопки и статус
  const updatePagination = (total, { page, limit }) => {
    pageCount = Math.ceil(total / limit);

    // шаблон кнопки страницы
    if (!pageTemplate) {
      pageTemplate = pages.firstElementChild.cloneNode(true);
      pages.firstElementChild.remove();
    }

    // номера страниц
    const visiblePages = getPages(page, pageCount, 5);
    pages.replaceChildren(
      ...visiblePages.map(pageNumber => {
        const el = pageTemplate.cloneNode(true);
        return createPage(el, pageNumber, pageNumber === page);
      })
    );

    // статус
    const from = total ? (page - 1) * limit + 1 : 0;
    fromRow.textContent = from;
    toRow.textContent = Math.min(page * limit, total);
    totalRows.textContent = total;
  };

  return { applyPagination, updatePagination };
};
