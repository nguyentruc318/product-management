const User = require("../../models/users_model");
module.exports.infoUser = async (req, res, next) => {
  if (req.cookies.tokenUser) {
    const tokenUser = req.cookies.tokenUser;
    const user = await User.findOne({ tokenUser, deleted: false }).select(
      "-password"
    );
    res.locals.user = user;
  }
  next();
};
