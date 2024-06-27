import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceieverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { id: receieverId } = req.params;
    const message = req.body.message.message;
    const senderId = req.user._id;
    const image = req.body.message.image;
    let conversation = await Conversation.findOne({
      participants: { $all: [receieverId, senderId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [receieverId, senderId],
      });
    }

    const newMessage = new Message({
      senderId,
      receieverId,
      message,
      image,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([newMessage.save(), conversation.save()]); // essentially runs both save methods in parallel

    const receiverSocketId = getReceieverSocketId(receieverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage); //this will send event to specific client
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: receieverId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [receieverId, senderId] },
    }).populate("messages"); // it takes the id, and gets the actual message object
    if (!conversation) {
      return res.status(200).json([]);
    }
    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log(error);
  }
};
