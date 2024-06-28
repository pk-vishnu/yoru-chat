import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receieverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
    },
    messageEncrypted: {
      type: String,
    },
    iv: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
); // timestamps:true adds createdAt and updatedAt fields

const Message = mongoose.model("Message", messageSchema);

export default Message;
