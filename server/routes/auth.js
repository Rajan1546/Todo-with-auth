const router = require("express").Router();
const {User} = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { validate } = require("../models/user");  

router.post("/", validate(),async(req,res) => {
    try {
        // const{error} = validate(req.body);
        const{errors} =validationResult(req);

        //if (error) 
         //   return res.status(400).send({message:error.details[0].message});
         if (errors && errors.length > 0) {
            console.log(errors)
            return res.status(400).json({ errors: errors });
          }
        const user = await User.findOne({email:req.body.email});
        if (!user) 
            return res.status(401).send({message:"Invalid Email or Password"});

        const validPassword = await bcrypt.compare(
            req.body.password,user.password
        );
        if (!validPassword) 
            return res.status(401).send({message:"Invalid Email and Password"});
                                                                                                             
        const token = user.generateAuthToken();
        res.status(200).send({data:token,message:"Logged in successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Internal Server Error"})
    }
})

// const validate = (data) => {
//     const schema = Joi.object({
//         email:Joi.string().email().required().label("Email"),
//         password:Joi.string().required().label("Password"),
//     });
//     return schema.validate(data);
// }

module.exports = router


