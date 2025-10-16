export function initFiltering(elements) {
  const updateIndexes = (elements, indexes) => {
    Object.keys(indexes).forEach((elementName) => {
      elements[elementName].append(
        ...Object.values(indexes[elementName]).map(name => {
          const option = document.createElement('option');
          option.value = name;
          option.textContent = name;
          return option;
        })
      );
    });
  };

  const applyFiltering = (query, state, action) => {
    if (action && action.name === 'clear') {
      const field = action.dataset.field;
      const wrapper = action.closest('.filter-wrapper');
      const input = wrapper ? wrapper.querySelector('input') : null;
      if (input) input.value = '';
      if (state && field in state) state[field] = '';
    }

    const filter = {};
    Object.keys(elements).forEach(key => {
      const el = elements[key];
      if (!el) return;
      if (['INPUT', 'SELECT'].includes(el.tagName) && el.value) {
        filter[`filter[${el.name}]`] = el.value; // date, customer, seller, totalFrom, totalTo
      }
    });

    return Object.keys(filter).length
      ? Object.assign({}, query, filter)
      : query;
  };

  return { updateIndexes, applyFiltering };
}
