const mongoose = require('mongoose');
 
const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: [true, 'Message must belong to a chat'],
      index: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'ai'],
        message: 'Role must be either "user" or "ai"',
      },
      required: [true, 'Role is required'],
    },
  },
  {
    timestamps: true, // auto-manages createdAt and updatedAt
  }
);
 
// Index for fetching messages in order
messageSchema.index({ chat: 1, createdAt: 1 });
 
module.exports = mongoose.model('Message', messageSchema);