const mongoose =require('mongoose');
const mongoPath = "mongodb+srv://admin:admin1@cluster0.eynde.mongodb.net/thirddb?retryWrites=true&w=majority"
module.exports= async()=> {
    await mongoose.connect(mongoPath,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    return mongoose
}


