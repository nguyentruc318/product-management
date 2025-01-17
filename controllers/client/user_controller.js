const User = require("../../models/users_model");
const Cart = require("../../models/cart_model");
const md5 = require("md5");
const generate = require("../../helper/generate");
const sendMailHelper = require("../../helper/send_mail");
const ForgotPassword = require("../../models/forgot_password_model");
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
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = md5(req.body.password);
  const user = await User.findOne({ email, password, deleted: false });
  if (!user) {
    req.flash("error", "Email hoặc mật khẩu không đúng!");
    res.redirect("back");
    return;
  }
  if (password !== user.password) {
    req.flash("error", " mật khẩu không đúng!");
    res.redirect("back");
    return;
  }
  if (user.status === "inactive") {
    req.flash("error", "Tài khoản của bạn đã bị khóa!");
    res.redirect("back");
    return;
  }
  console.log(req.cookies.cartId);
  await Cart.updateOne(
    {
      _id: req.cookies.cartId,
    },
    { user_id: user.id }
  );

  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
};
module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");
  res.redirect("/");
};
module.exports.forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgot_password", {
    pageTitle: "Quên mật khẩu",
  });
};
module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email, deleted: false });
  if (!user) {
    req.flash("error", "Email không tồn tại!");
    res.redirect("back");
    return;
  }
  const otp = generate.generateRandomNumber(6);
  const objectForgotPassword = {
    email: email,
    otp: otp,
    expiredAt: Date.now(),
  };
  const subject = "Mã OTP";
  const html = `<strong>Trực đẹp trai khủng khiếp </strong><p>Mã OTP của bạn là: ${otp}</p>`;
  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();
  sendMailHelper.sendMail(email, subject, html);
  res.redirect(`/user/password/otp?email=${email}`);
};
module.exports.otp = async (req, res) => {
  const email = req.query.email;
  res.render("client/pages/user/otp-password", {
    pageTitle: "OTP",
    email: email,
  });
};
module.exports.otpPost = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;
  const forgotPassword = await ForgotPassword.findOne({ email, otp });
  if (!forgotPassword) {
    req.flash("error", "Mã OTP không đúng!");
    res.redirect("back");
    return;
  }
  const user = await User.findOne({ email, deleted: false });
  res.cookie("tokenUser", user.tokenUser);
  res.redirect(`/user/password/reset`);
};
module.exports.resetPassword = async (req, res) => {
  res.render("client/pages/user/reset-password", {
    pageTitle: "Đặt lại mật khẩu",
  });
};
module.exports.resetPasswordPost = async (req, res) => {
  let password = req.body.password;
  const tokenUser = req.cookies.tokenUser;
  password = md5(password);
  await User.updateOne({ tokenUser: tokenUser }, { password: password });
  res.redirect("/");
};
module.exports.info = async (req, res) => {
  res.render("client/pages/user/info", {
    pageTitle: "Thông tin tài khoản",
  });
};
