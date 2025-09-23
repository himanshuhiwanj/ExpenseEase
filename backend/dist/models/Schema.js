import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
// Define the Mongoose schema for the User
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        // Simple email validation using a regex
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum password length
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});
// This is a pre-save hook that runs before the user document is saved to the database.
// It hashes the password for security.
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }
    try {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    }
    catch (error) {
        next(error);
    }
});
// Create and export the User model
export const User = mongoose.model('User', userSchema);
