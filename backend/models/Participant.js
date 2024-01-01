const mongoose = require('mongoose');
const { Schema } = mongoose;

const participantSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
  const Participant = mongoose.model('participant', participantSchema);
  module.exports = Participant;