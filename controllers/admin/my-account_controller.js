// [Get] /admin/my-account
const md5 = require("md5")
const Account = require("../../models/account_model")
module.exports.index = async (req, res) => {
    res.render("admin/pages/my-account/index", {
      pageTitle: "Tài khoản của tôi",
    });
};

module.exports.edit = async (req, res) => {
    res.render("admin/pages/my-account/edit", {
      pageTitle: "Sửa tài khoản",
    });
};
module.exports.editPatch = async (req, res) => {
    
    const emailExist = await Account.findOne({
        _id: { $ne: res.locals.user.id },
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
        await Account.updateOne({ _id:res.locals.user.id  }, req.body);
        req.flash("success", "Cập nhật thành công");
        res.redirect("back");
      }
};