const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");
const paginationHelper = require("../../helper/pagination");
const { tree } = require("../../helper/create_tree");
const ProductCategory = require("../../models/product_category_model");

const Product = require("../../models/product_model");
const Account = require("../../models/account_model");

module.exports.index = async (req, res) => {
  // console.log(req.query.status);
  const filterStatus = filterStatusHelper(req.query);
  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  const search = searchHelper(req.query);
  if (search.regex) {
    find.title = search.regex;
  }
  let objPagination = {
    currentPage: 1,
    limit: 4,
  };
  // sort
  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }
  //end sort
  const countProducts = await Product.countDocuments(find);
  let pagination = await paginationHelper(
    req.query,
    objPagination,
    countProducts
  );
  objPagination = pagination;
  const products = await Product.find(find)
    .sort(sort)
    .limit(objPagination.limit)
    .skip(objPagination.skip);
  // const Account = await
  for (const product of products) {
    // laấy ra thông tin người tạo
    const user = await Account.findOne({ _id: product.createdBy.accountId });
    if (user) {
      product.accountFullName = user.fullName;
    }
    // lấy ra thông tin người cập nhật gần nhất
    const updatedBy = product.updatedBy[product.updatedBy.length-1];
    if(updatedBy){
      const userUpdate = await Account.findOne({ _id: updatedBy.accountId });
      updatedBy.accountFullName = userUpdate.fullName 
    }
    
  }
  res.render("admin/pages/products/index", {
    pageTitle: "Trang sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: search.keyword,
    pagination: objPagination,
  });
};
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  const updatedBy={
    accountId:res.locals.user.id,
    updatedAt :new Date()
  }
  await Product.updateOne({ _id: id }, { status: status ,$push :{updatedBy:updatedBy}});
  req.flash("success", "Thay đổi trạng thái thành công");

  res.redirect("back");
};
module.exports.changeMulti = async (req, res) => {
  console.log(req.body);
  const ids = req.body.ids.split(",");
  const type = req.body.type;
  const updatedBy={
    accountId:res.locals.user.id,
    updatedAt :new Date()
  }
  switch (type) {
    case "available":
      await Product.updateMany({ _id: { $in: ids } }, { status: "available",$push :{updatedBy:updatedBy} });
      break;
    case "unavailable":
      await Product.updateMany(
        { _id: { $in: ids } },
        { status: "unavailable",$push :{updatedBy:updatedBy} }
      );
      break;
    case "delete-all":
      await Product.updateMany({ _id: { $in: ids } }, { deleted: true ,deletedBy:{
        accountId:res.locals.user.id,
        deletedAt:new Date()
      }});
      break;
    case "change-position":
      for (const id of ids) {
        const [idProduct, position] = id.split("-");
        position = parseInt(position);
        await Product.updateOne({ _id: idProduct }, { position: position ,$push :{updatedBy:updatedBy}});
      }
      break;
    default:
      break;
  }
  res.redirect("back");
};
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  // await Product.deleteOne({ _id: id });
  await Product.updateOne(
    { _id: id },
    { deleted: true, deletedBy:{
      accountId:res.locals.user.id,
      deletedAt:new Date()
    }
  }
  );
  res.redirect("back");
};
module.exports.create = async (req, res) => {
  const records = await ProductCategory.find({ deleted: false });
  const category = tree(records);
  res.render("admin/pages/products/create", {
    pageTitle: "Trang tạo sản phẩm",
    category: category,
  });
};
module.exports.createPost = async (req, res) => {
  // console.log(req.body);

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (!req.body.position) {
    const countProducts = await Product.countDocuments({});
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  req.body.createdBy = {
    accountId: res.locals.user._id,
    createdAt: new Date(),
  };
  if (req.file) req.body.thumbnail = `/uploads/${req.file.filename}`;
  const product = new Product(req.body);

  await product.save();
  res.redirect("/admin/products");
};
module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const product = await Product.findOne(find);
    const category = await Product.find({ deleted: false });
    const newCategory = tree(category);
    res.render("admin/pages/products/edit", {
      pageTitle: "Cập nhật sản phẩm",
      product: product,
      category: newCategory,
    });
  } catch (error) {
    res.redirect("/admin/products");
  }
};
module.exports.editPost = async (req, res) => {
  const id = req.params.id;
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);
  if (req.file) req.body.thumbnail = `/uploads/${req.file.filename}`;
  try {
    const updatedBy={
      accountId:res.locals.user.id,
      updatedAt :new Date()
    }
    // req.body.updatedBy = updatedBy
    await Product.updateOne({ _id: id }, {...req.body,$push :{updatedBy:updatedBy}});
    req.flash("success", "Cập nhật sản phẩm thành công");
  } catch (error) {
    req.flash("error", "Cập nhật sản phẩm thất bại");
    console.log(error)
  }

  res.redirect("back");
};
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const product = await Product.findOne(find);
    res.render("admin/pages/products/detail", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect("/admin/products");
  }
};
