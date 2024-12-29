module.exports.loginPost = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.flash("error", "vui lòng nhập đầy đủ thông tin");
    res.redirect("back");
    return;
  }
  next();
};
