import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = jwt.sign(
      {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Save token to the database
    newUser.token = token;
    await newUser.save();

    // Return response with token
    const { password: hashedPwd, ...user } = newUser._doc;
    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Password is incorrect" });
    }
    const token = jwt.sign({ _id: user._id, username: user.username, email: user.email }, process.env.SECRET_KEY, { expiresIn: "1d" });
    const { password, ...info } = user._doc;

    // Send the token in a cookie and return the user info
    res.cookie("token", token, { httpOnly: true, sameSite: "none", secure: true }).status(200).json({ ...info, token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Logout user
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("User logged out successfully!")
  } catch (error) {
    res.status(500).json({ error: "Logout error" });
  }
};

const getCurrentUser = async (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.SECRET_KEY,{}, async (err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.status(200).json(data);
  })
}


export { registerUser, loginUser, logoutUser, getCurrentUser}
