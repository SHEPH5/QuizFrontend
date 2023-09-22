import React from "react";
import Header from "./components/framework/Header";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import QuizSelect from "./components/QuizSelect";
import QuizTopics from "./pages/quizTopics";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<QuizSelect/>} />
        <Route path="/quiz/r/:topic" element={<QuizTopics/>} />
      </Routes>
    </Router>
    
  );
}

export default App;
