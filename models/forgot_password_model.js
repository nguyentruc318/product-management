const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    expiredAt: {
      type: Date,
      expires: 180,
    },
  },
  { timestamps: true }
);
const ForgotPassword = mongoose.model(
  "ForgotPassword",
  forgotPasswordSchema,
  "forgot_passwords"
);
module.exports = ForgotPassword;
