import User from "../models/user.model.js";

export const login = (req, res) => {
  res.send("Login route");
};

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      res.status(201).json({ _id: newUser._id, username: newUser.username });
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  res.send("Logout route");
};
