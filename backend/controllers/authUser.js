const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");
const genrateToken = require("../config/genrateToken");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields",
        });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({
            success: false,
            message: "User already exists",
        });
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        res.status(201).json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            token: genrateToken(user._id),
            data: user,
            message: "user created successfully",
        });

    } else {
        res.status(400).json({
            success: false,
            message: "Failed to create user",
        });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(401).json({
            success: false,
            message: "User not found",
        });
        return;
    }

    const isPasswordValid = await user.matchPassword(password);

    if (user && isPasswordValid) {
        res.json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            token: genrateToken(user._id),
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Invalid email or password",
        });
    }
});

module.exports = { registerUser, loginUser };
