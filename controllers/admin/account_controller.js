const md5 = require("md5")


const Account = require("../../models/account_model")
const Role  = require("../../models/role_model")
module.exports.index = async (req, res) => {
    let find = {
      deleted: false,
    };
    const records = await Account.find(find);
    res.render("admin/pages/accounts/index", {
      pageTitle: "account",
      records: records,
    });
  };
module.exports.create = async(req, res)=>{
    let find = {
        deleted: false,
      };
    const roles  = await Role.find(find)
    const records = await Account.find(find);
    res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo tài khoản",
        records: records,
        roles:roles
    });
}
module.exports.createPost = async(req, res)=>{
    // console.log(req.body)
    const emailExist = await Account.findOne({email:req.body.email,deleted:false})
    req.body.password = md5( req.body.password )
    if (req.file)
      req.body.avatar = `/uploads/accounts/${req.file.filename}`;
    const record = new Account(req.body);
    await record.save()
    // res.send("oke")
    res.redirect("/admin/accounts")
}
