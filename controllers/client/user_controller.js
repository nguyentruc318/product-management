const User = require("../../models/users_model");
const md5 = require("md5");
module.exports.register = async (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng ký",
  });
};
module.exports.registerPost = async (req, res) => {
  const existingUser = await User.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (existingUser) {
    req.flash("error", "Email đã được sử dụng!");
    res.redirect("back");
    return;
  }
  req.body.password = md5(req.body.password);
  const newUser = new User(req.body);
  await newUser.save();
  res.cookie("tokenUser", newUser.tokenUser);
  res.redirect("/");
};
module.exports.login = async (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Đăng nhập",
  });
};
