import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    const compare = createComparison(
  ['skipEmptyTargetValues'],                                  // используем только это стандартное правило
  [rules.searchMultipleFields(searchField, ['date','customer','seller'], false)] // ищем по 3 полям
);


    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        return data.filter(row => compare(row, state));

    }
}