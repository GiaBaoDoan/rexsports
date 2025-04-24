const getPagination = (totalRecords, page, limit) => {
  const totalPages = Math.ceil(totalRecords / limit);
  const currentPage = page > totalPages ? 1 : parseInt(page);
  const skip = (currentPage - 1) * parseInt(limit);

  return {
    totalPages,
    currentPage,
    skip,
  };
};

module.exports = getPagination;
