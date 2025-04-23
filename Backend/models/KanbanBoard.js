const mongoose = require('mongoose');

const AttachmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number },
  url: { type: String }, // In production: URL to cloud storage
  dataUrl: { type: String }, // For small pasted images
  uploadedAt: { type: Date, default: Date.now }
});

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  attachment: { type: mongoose.Schema.Types.Mixed }, // Can reference attachments
  createdAt: { type: Date, default: Date.now }
});

const KanbanBoardSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  tasks: [TaskSchema],
  attachments: [AttachmentSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

KanbanBoardSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('KanbanBoard', KanbanBoardSchema);