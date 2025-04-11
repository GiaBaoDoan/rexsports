const getPagination = (totalRecords, page = 1, limit = 10) => {
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
