import userModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";


const createToken = (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let isMatch;
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error verifying password" });
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = await createToken(user._id);

    return res.status(200).header("Authorization", `Bearer ${token}`).json({ 
      success: true, 
      token, 
      user: { _id: user._id, name: user.name, email: user.email, tasks: user.tasks } 
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error during login" });
  }
};


export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 })) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number" });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      tasks: [] 
    });

    const user = await newUser.save();
    const token = await createToken(user._id);

    return res.status(201).header("Authorization", `Bearer ${token}`).json({ 
      success: true, 
      token, 
      user: { _id: user._id, name: user.name, email: user.email, tasks: user.tasks } 
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error during registration" });
  }
};
// npm uninstall bcrypt
// npm install bcryptjs

