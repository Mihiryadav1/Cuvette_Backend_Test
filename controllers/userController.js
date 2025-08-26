import User from "../models/userSchema.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    //check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    // Hash the password
    const hashedPass = await bcrypt.hash(password, 10);
    //create new user if not present
    const newUser = new User({
      name,
      email,
      password: hashedPass,
    });
    console.log("New User Created");

    //saving the newly creates user
    await newUser.save();
    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error, "Error");
    return res.status(500).json({
      message: "Error creating user",
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    }
    //compare the password
    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // generating JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "User logged in successfully",
      user,
      token: token,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error logging in user",
    });
  }
};
