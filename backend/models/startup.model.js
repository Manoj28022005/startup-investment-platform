const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  founder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  description: String,
  teamSize: Number,
  techStack: [String],
  fundingNeeded: Number,
  documents: [{
    type: String,  // URLs to uploaded documents
    description: String
  }],
  milestones: [{
    title: String,
    date: Date,
    description: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Startup', startupSchema);
