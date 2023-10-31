const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");

module.exports=()=>{
    const connectionParams = {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    };
    try {
        mongoose.connect(process.env.DB ,  connectionParams)
        console.log("Connected to database Successfully")
    } catch (error) {
        console.log(err)
        console.log("Could not connect to database")
    }
}