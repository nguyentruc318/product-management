module.exports = (query) => {
  let filterStatus = [
    { name: "Tất cả", class: "", status: "" },
    { name: "Hoạt động", class: "", status: "available" },
    { name: "Dừng hoạt động", class: "", status: "unavailable" },
  ];
  if (query.status) {
    const index = filterStatus.findIndex(
      (filter) => filter.status === query.status
    );
    filterStatus[index].class = "active";
  } else {
    filterStatus[0].class = "active";
  }
  return filterStatus;
};
