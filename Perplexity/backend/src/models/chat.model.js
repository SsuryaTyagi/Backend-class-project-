const mongoose = require('mongoose');
 
const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Chat must belong to a user'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [50, 'Title cannot exceed 50 characters'],
      default: 'New Chat',
    },
  },
  {
    timestamps: true, // auto-manages createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
 
 
module.exports = mongoose.model('Chat', chatSchema);
 