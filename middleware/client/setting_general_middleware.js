const SettingGeneral = require("../../models/settings-general_model.js");
module.exports.settingGeneral = async (req, res, next) => {
  const data = await SettingGeneral.findOne({});
  res.locals.general = data;
  next();
};
