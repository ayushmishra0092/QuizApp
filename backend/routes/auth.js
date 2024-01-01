const express = require('express');
const User = require('../models/User');
const Quiz=require('../models/Quiz');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleWare');

const JWT_SECRET = 'AllisWell';

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success=false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }
  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      return res.status(400).json({ success,error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success=true;

    // res.json(user)
    res.json({ success,authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//storing new quiz
router.post('/newquiz', fetchuser,async (req,res)=>{
  
  const {title,description,questions}=req.body;
  // console.log(quizData.title);
  const newQuiz= await new Quiz(
    {
      title,
      description,
      questions,
      user: req.user.id
    }
  );
  console.log(req.user.id);
  // console.log("hy");
  // console.log("galti he")
  // console.log(newQuiz)
  const savedNote = await newQuiz.save()
    res.json(savedNote)
  // newQuiz.save().then(()=>{
  //   console.log("saved!!!")
  // }).catch(()=>{
  //   console.log("error occured!!")
  // });
});

//fetching all quiz 
router.get('/fetchallquiz', fetchuser, async (req, res) => {
  try {
      const Quizes = await Quiz.find({ user: req.user.id });
      res.json(Quizes)
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})
//deleting specific quiz
router.delete('/deletequiz/:id', fetchuser, async (req, res) => {
  try {
      // Find the Quiz to be delete and delete it
      let delete_Quiz = await Quiz.findById(req.params.id);
      if (!delete_Quiz) { return res.status(404).send("Not Found") }

      // Allow deletion only if user owns this Quiz
      // if (Quiz.user.toString() !== req.user.id) {
      //     return res.status(401).send("Not Allowed");
      // }

      delete_Quiz = await Quiz.findByIdAndDelete(req.params.id)
      res.json({ "Success": "Quiz has been deleted", delete_Quiz: delete_Quiz });
  } catch (error) {
    
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})
//share link
router.get('/:quizId/share',async (req, res) => {
  const quizId  = req.params.quizId;

  try {
    // Fetch the quiz from the database
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Generate a unique link for the quiz
    const link = `https://quizapp-0hdi.onrender.com/participant/${quizId}`;

    // Store the generated link in the quiz document or send it in the response
    quiz.link = link;
    await quiz.save();
    res.json(link);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});
//fetch quiz on basis of link
router.get('/quiz/:quizId',async (req, res) => {
  const quizId  = req.params.quizId;

  try {
    // Fetch the quiz from the database
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});




module.exports = router

