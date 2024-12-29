const md5 = require("md5");

const Account = require("../../models/account_model");
const Role = require("../../models/role_model");
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Account.find(find).select("-password -token");
  for (const record of records) {
    const role = await Role.findOne({ _id: record.role_id, deleted: false });
    record.role = role;
  }

  res.render("admin/pages/accounts/index", {
    pageTitle: "account",
    records: records,
  });
};
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };
  const roles = await Role.find(find);
  const records = await Account.find(find);
  console.log(roles);
  res.render("admin/pages/accounts/create", {
    pageTitle: "Tạo tài khoản",
    records: records,
    roles: roles,
  });
};
module.exports.createPost = async (req, res) => {
  // console.log(req.body)
  const emailExist = await Account.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (emailExist) {
    req.flash("error", "email already existed");
    res.redirect("back");
  }
  req.body.password = md5(req.body.password);
  if (req.file) req.body.avatar = `/uploads/accounts/${req.file.filename}`;
  const record = new Account(req.body);
  await record.save();
  // res.send("oke")
  res.redirect("/admin/accounts");
};
module.exports.edit = async (req, res) => {
  let find = { deleted: false, _id: req.params.id };
  try {
    const data = await Account.findOne(find);

    const roles = await Role.find({
      deleted: false,
    });

    res.render("admin/pages/accounts/edit", {
      pageTitle: "Chỉnh sửa tài khoản",
      data: data,
      roles: roles,
    });
  } catch (error) {
    res.redirect("/admin/accounts");
  }
};
module.exports.editPatch = async (req, res) => {
  const emailExist = await Account.findOne({
    _id: { $ne: req.params.id },
    email: req.body.email,
    deleted: false,
  });
  if (emailExist) {
    req.flash("error", "email already existed");
    res.redirect("back");
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }
    await Account.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "Cập nhật thành công");
    res.redirect("back");
  }
};
