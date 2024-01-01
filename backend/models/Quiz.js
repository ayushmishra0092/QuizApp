const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
},
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      options: [
        {
          type: String,
          required: true,
        },
      ],
      correctAnswerIndices: [
        {
          type: Number,
          required: true,
        },
      ],
    },
  ],
  link:{
    type:String,
    ref:'link',
  }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
