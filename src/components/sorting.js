import { sortCollection } from "../lib/sort.js";
const rotateSort = (v) => (v === 'none' ? 'up' : v === 'up' ? 'down' : 'none');




export function initSorting(columns) {
    return (data, state, action) => {
        let field = null;
        let order = null;

       if (action && action.name === 'sort') {
    action.dataset.value = rotateSort[action.dataset.value];


    field = action.dataset.field;
    order = action.dataset.value;


            // @todo: #3.1 — запомнить выбранный режим сортировки
            

            // @todo: #3.2 — сбросить сортировки остальных колонок
        } else {
            columns.forEach(column => {
    if (action && column.dataset.field !== action.dataset.field) {
        column.dataset.value = 'none';
    }
});


            // @todo: #3.3 — получить выбранный режим сортировки
            columns.forEach(column => {
    if (column.dataset.value !== 'none') {
        field = column.dataset.field;
        order = column.dataset.value;
    }
});

        }

        if (!field || order === 'none') return data;
return sortCollection([...data], field, order);

    }
}