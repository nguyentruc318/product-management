const Role = require("../../models/role_model");
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);
  res.render("admin/pages/roles/index", {
    pageTitle: "Nhóm Quyền",
    records: records,
  });
};
module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle: "Thêm mới nhóm quyền",
  });
};
module.exports.createPost = async (req, res) => {
  const role = new Role(req.body);
  await role.save();
  res.redirect("/admin/roles");
};
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    let find = {
      _id: id,
      deleted: false,
    };
    const role = await Role.findOne(find);
    res.render("admin/pages/roles/edit", {
      pageTitle: "Sửa nhóm quyền",
      role: role,
    });
  } catch (error) {
    res.redirect("/admin/roles");
  }
};
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  await Role.updateOne({ _id: id }, req.body);
  req.flash("success", "Cập nhật thành công");
  res.redirect("/admin/roles");
};
module.exports.permissions = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);
  res.render("admin/pages/roles/permissions", {
    pageTitle: "Phân quyền",
    records: records,
  });
};
