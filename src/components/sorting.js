const rotateSort = (v) => (v === 'none' ? 'up' : v === 'up' ? 'down' : 'none');

export function initSorting(columns) {
  let field = null;
  let order = 'none';

  return (query, state, action) => {

    if (action && action.name === 'sort') {

      action.dataset.value = rotateSort(action.dataset.value);

      field = action.dataset.field;
      order = action.dataset.value;

      // Сброс остальных колонок
      columns.forEach(col => {
        if (col.dataset.field !== action.dataset.field) col.dataset.value = 'none';
      });
    }

    columns.forEach(col => {
      if (col.dataset.value !== 'none') {
        field = col.dataset.field;
        order = col.dataset.value;
      }
    });

    const sort = (field && order !== 'none') ? `${field}:${order}` : null;

    return sort ? Object.assign({}, query, { sort }) : query;
  };
}