// [GET] /admin/settings/general
const SettingGeneral = require("../../models/settings-general_model.js");
module.exports.general = async (req, res) => {
  const data = await SettingGeneral.findOne({});
  res.render("admin/pages/settings/general", {
    pageTitle: "Cài đặt chung",
    data,
  });
};
module.exports.updateGeneral = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.logo = `/uploads/logos/${req.file.filename}`;
    }
    const record = await SettingGeneral.findOne({});
    if (record) {
      await SettingGeneral.updateOne({ _id: record.id }, data);
    } else {
      const record = new SettingGeneral(data);
      await record.save();
    }

    req.flash("success", "Cập nhật thành công");
    res.redirect("back");
  } catch {
    res.redirect("/admin/settings/general");
  }
};
