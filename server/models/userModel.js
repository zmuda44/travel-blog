const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for user data
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,

    },
    email: {
        type: String,
        required: true, // Ensure that every user has an email
        // Optional: Add email verification logic here if needed
    },
    password: {
        type: String,
        required: true, // Ensure that every user has a password
    },
    profile: {
        type: String,
        // Optional: Uncomment if a profile field is required
        // required: true
    },
    trips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip' // Reference to the Trip model, allows for linking trips to the user
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the User model, allows for linking friends to the user
    }]
});

// Middleware to hash the password before saving the user document
userSchema.pre('save', async function (next) {
    // Check if the password is new or modified
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10; // Number of rounds for bcrypt to generate salt
        // Hash the password with bcrypt
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next(); // Proceed to save the user document
});
  
// Method to compare incoming password with hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    // Use bcrypt to compare the given password with the hashed password
    return bcrypt.compare(password, this.password);
};

// Create and export the User model based on the userSchema
const User = mongoose.model('User', userSchema);

module.exports = User;
