const Account = require("../../models/account_model.js");
const md5 = require("md5");
module.exports.login = (req, res) => {
  if (req.cookies.token) {
    res.redirect("/admin/dashboard");
    return;
  } else {
    res.render("admin/pages/auth/login.pug", {
      pageTitle: "Trang đăng nhập",
    });
  }
};
module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;

  const user = await Account.findOne({ email, deleted: false });
  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect("back");
    return;
  }
  if (md5(password) != user.password) {
    req.flash("error", "sai mật khẩu");
    res.redirect("back");
    return;
  }
  if (user.status !== "active") {
    req.flash("error", "tài khoản đã bị khóa");
    res.redirect("back");
    return;
  }
  res.cookie("token", user.token);
  res.redirect("/admin/dashboard");
};
module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/admin/auth/login");
};
