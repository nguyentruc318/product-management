const Account = require("../../models/account_model.js");
const Role = require("../../models/role_model.js");
module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect("/admin/auth/login");
    return;
  } else {
    const user = await Account.findOne({ token: req.cookies.token }).select(
      "-password"
    );
    if (!user) {
      res.redirect("/admin/auth/login");
      return;
    } else {
      const role = await Role.findOne({ _id: user.role_id }).select(
        "title permission"
      );
      res.locals.user = user;
      res.locals.role = role;
      //   console.log(role);
      next();
    }
  }
};
