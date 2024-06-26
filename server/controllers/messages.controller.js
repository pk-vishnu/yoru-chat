import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { id: receieverId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;

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
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([newMessage.save(), conversation.save()]); // essentially runs both save methods in parallel

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
    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log(error);
  }
};
