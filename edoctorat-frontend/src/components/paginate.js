export const paginate = (items, page, perPage) => {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * perPage;
  const end = start + perPage;
  return {
    page: safePage,
    perPage,
    total,
    totalPages,
    data: items.slice(start, end),
  };
};
