const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { body, validationResult } = require("express-validator"); 
// const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    // firstName:{type:String,required:true},
    // lastName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    cpassword:{type:String,required:true}
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY, {expiresIn:"7d"})
    return token
};

const User = mongoose.model("user",userSchema)

// const validate = (data) => {
//     const schema = Joi.object({
//         // firstName: Joi.string().required().label("First Name"),
//         // lastName: Joi.string().required().label("Last Name"),
//         email: Joi.string().email().required().label("Email"),
//         password: passwordComplexity().required().label("Password"),
//         cpassword: passwordComplexity().required().label("Confirm Password"),
//     });
//     return schema.validate(data);
// }
const validate = () => {
    return [
      body("email").isEmail().withMessage("Invalid email format"),
      body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    //   body("cpassword").custom((value, { req }) => {
    //     if (value !== req.body.password) {
    //       throw new Error("Passwords must match");
    //     }
    //     return true;
    //   }),
    ];
  };
module.exports = {User , validate }