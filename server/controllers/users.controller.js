import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const myUserId = req.user._id;
    const users = await User.find({ _id: { $ne: myUserId } }).select(
      "-password"
    );
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};
