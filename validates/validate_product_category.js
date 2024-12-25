module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", "vui lòng nhập lại tiêu đề");
    res.redirect("back");
    return;
  }
  next();
};
