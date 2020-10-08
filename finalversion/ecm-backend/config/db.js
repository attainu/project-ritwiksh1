import mongoose from 'mongoose';

const connectDB= async()=>{

    try {
        const conn= await mongoose.connect(process.env.MONGO_URI,{

            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        })

        console.log(`MongoDB Connected Successfully`)
    } catch (error) {
        console.error(`Error Occured :${error.message}`)
        process.exit(1)
        
    }

}

export default connectDB