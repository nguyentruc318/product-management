const ProductCategory = require("../../models/product_category_model.js");
const { tree } = require("../../helper/create_tree.js");
// GET /admin/products-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);
  const newRecords = tree(records);
  res.render("admin/pages/product_category/index", {
    title: "Danh mục sản phẩm",
    records: newRecords,
  });
};

module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await ProductCategory.find({ find });
  const newRecords = tree(records);
  res.render("admin/pages/product_category/create", {
    title: "Thêm danh mục sản phẩm",
    records: newRecords,
  });
};
module.exports.createPost = async (req, res) => {
  const permission = res.locals.role.permission;
  // console.log(permission);
  if (permission.includes("products-category_create")) {
    if (req.body.position == "") {
      const countPosition = await ProductCategory.countDocuments({});
      req.body.position = countPosition + 1;
    } else {
      req.body.position = parseInt(req.body.position);
    }
    if (req.file)
      req.body.thumbnail = `/uploads/product_category/${req.file.filename}`;
    const record = new ProductCategory(req.body);
    await record.save();
    res.redirect("/admin/products-category");
  } else {
    return;
  }
};

module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ProductCategory.findOne({ _id: id, deleted: false });
    const records = await ProductCategory.find({ deleted: false });
    const newRecords = tree(records);
    res.render("admin/pages/product_category/edit", {
      title: "Chỉnh sửa danh mục sản phẩm",
      data,
      records: newRecords,
    });
  } catch (error) {
    res.redirect("/admin/products-category");
  }
};

module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.position = parseInt(req.body.position);

  await ProductCategory.updateOne({ _id: id }, req.body);
  res.redirect("back");
};
