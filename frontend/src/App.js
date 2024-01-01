
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import  Alert  from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from "./components/Home";
import {useState} from "react"
import Quizform from "./components/Quizform";
import Specific_quiz from "./components/Specific_quiz";
import ParticipantForm from "./components/participant/Participantform";
import ParticipantQuiz from "./components/participant/ParticipantQuiz";

function App() {
   const [alert, setalert] = useState(null);
  const showalert = (msg, type) => {
    setalert({
      msg: msg,
      type: type
    })
    setTimeout(() => {
      setalert(null);
    }, 1500);
  }
 
  return (
    <>
        <Router>
            <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
            <Route exact path="/" element={<Home  showalert={showalert}/>} />
            <Route exact path="/createquiz" element={<Quizform showalert={showalert}/>} />
            <Route exact path="/specific_quiz" element={<Specific_quiz/>}/>
            <Route exact path="/login" element={<Login  showalert={showalert}/>} />
            <Route exact path="/signup" element={<Signup showalert={showalert}/>} />
            <Route exact path="/participant/:quizId" element={<ParticipantForm/>} />
           <Route exact path="/participant/:quizId/quiz" element={<ParticipantQuiz/>} />
            </Routes>
          </div> 
        </Router>
    </>
  );
}

export default App;
