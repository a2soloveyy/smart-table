import {makeIndex} from "./lib/utils.js";

const BASE_URL = 'https://webinars.webdev.education-services.ru/sp7-api';

export function initData(/* sourceData не нужен */) {
  // кэш для индексов и последнего результата
  let sellers;
  let customers;
  let lastResult;
  let lastQuery;

  // маппинг записей к формату таблицы
  const mapRecords = (data) => data.map(item => ({
    id: item.receipt_id,
    date: item.date,
    seller: sellers[item.seller_id],
    customer: customers[item.customer_id],
    total: item.total_amount
  }));

  // индексы (продавцы/покупатели)
  const getIndexes = async () => {
    if (!sellers || !customers) {
      [sellers, customers] = await Promise.all([
        fetch(`${BASE_URL}/sellers`).then(res => res.json()),
        fetch(`${BASE_URL}/customers`).then(res => res.json()),
      ]);
    }
    return { sellers, customers };
  };

  // записи (учитывает query-параметры)
  const getRecords = async (query = {}, isUpdated = false) => {
    const qs = new URLSearchParams(query);
    const nextQuery = qs.toString();

    if (lastQuery === nextQuery && !isUpdated) return lastResult;

    const response = await fetch(`${BASE_URL}/records?${nextQuery}`);
    const records = await response.json();

    lastQuery = nextQuery;
    lastResult = {
      total: records.total,
      items: mapRecords(records.items),
    };
    return lastResult;
  };

  return { getIndexes, getRecords };
}
