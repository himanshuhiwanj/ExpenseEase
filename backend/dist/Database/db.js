import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Your MongoDB connection string. 
// Replace <username>, <password>, and <cluster_name> with your details.
// For a local database, it might look like 'mongodb://localhost:27017/yourdbname'.
dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('✅ MongoDB connected successfully!');
    }
    catch (err) {
        console.error('❌ MongoDB connection error:', err);
        // Exit process with failure
        process.exit(1);
    }
};
export default connectDB;
