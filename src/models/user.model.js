
const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

// also check if the repeat password is the same as the password or not no need to save the repeat password
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  locality: { type: String, required: true },
  moreInfo: { type: String },
  pincode: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  role: [{ type: String, default: "costumer",required: true }],
},{
  versionKey: false,
  timestamps: true,
});


// hash the password before saving it to the database
userSchema.pre("save", function (next) {
  if(!this.isModified('password')) return next();


 const hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  next();
})


// compare the password with the hash password for login
userSchema.methods.comparePassword =   function (candidatePassword) {
  return  bcrypt.compareSync(candidatePassword, this.password);

}

const User = mongoose.model("User", userSchema);

module.exports = User;
