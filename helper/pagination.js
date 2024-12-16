module.exports = async (query, objPagination, countProducts) => {
  if (query.page) {
    objPagination.currentPage = parseInt(query.page);
  }

  console.log(countProducts);
  const totalPage = Math.ceil(countProducts / objPagination.limit);
  objPagination.totalPage = totalPage;
  objPagination.skip = (objPagination.currentPage - 1) * objPagination.limit;
  return objPagination;
};
