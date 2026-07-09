const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  communityId: { type: String, required: true, index: true },
  senderId: { type: String, required: true },
  
  // Denormalized user data for fast reads
  senderDisplayName: { type: String },
  senderAvatarId: { type: String },
  senderStatus: { type: String },
  
  attachmentUrl: { type: String },
  attachmentType: { type: String },
  
  // TTL Index for auto-deletion
  expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
