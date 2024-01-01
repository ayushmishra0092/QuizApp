const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Participant = require('../models/Participant');

// Save participant details
router.post('/createParticipant', async (req, res) => {
    const { name, email } = req.body;
  
    try {
      // Create a new participant
      const participant = new Participant({ name, email });
      console.log(participant)
      await participant.save();
  
      res.json( participant );
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  });

// Get a quiz by the shared link
router.get('/quiz /:quizId',async (req, res) => {
    const  quizId  = req.params.quizId;
  
    try {
      // Fetch the quiz from the database
      const quiz = await Quiz.findOne( quizId );
  
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
  
      res.json({ quiz });
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  });

module.exports = router;