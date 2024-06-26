import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // in milliseconds, so 7 days
    httpOnly: true, // This prevents cross-site scripting attacks
    sameSite: "strict", // This prevents cross-site request forgery attacks
  });
};

export default generateTokenAndSetCookie;
