const mongoose = require("mongoose");
// const validator = require("validator"); 
const bcryptjs = require("bcryptjs");

const seoUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: 8,
    validate(val) {
      let password = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"
      );
      if (!password.test(val)) {
        throw new Error(
          "password must include uppercase, lowercase, number, special character !@#$%^&*"
        );
      }
    },
  },
  tokens:[{
    type: String
  }],
});

seoUserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcryptjs.genSalt(8);
    this.password = await bcryptjs.hash(this.password, salt);
  }
});

seoUserSchema.statics.findByCredentials = async (mail, pass) => {
  const user = await User.findOne({ email: mail });
  if (!user) {
    throw new Error("Incorrect Email or Password!, Please check again..")
  }
  const isMatch = await bcryptjs.compare(pass, user.password)
  if (!isMatch) {
    throw new Error("Incorrect Email or Password!, Please check again..")
  }
  return user
}

const SeoUser = mongoose.model("SeoUser", seoUserSchema);
module.exports = SeoUser;