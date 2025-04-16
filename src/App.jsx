import { useState,useEffect } from 'react';
import { ChevronRight, ChevronLeft, Award, Loader2, RefreshCw } from 'lucide-react';
import Maincard from './components/Maincard';
import { decodeHTML } from './utils/quizUtils';

export default function QuizApp() {
  const [questions,setQuestions] = useState([]);
  const [currentQuestionIndex,setCurrentQuestionIndex]=useState(0);
  const [userAnswers,setUserAnswers]=useState({});
  const [quizCompleted,setQuizCompleted]=useState(false);
  const [loading,setLoading]=useState(true);
  const [fetchingNewQuestions,setFetchingNewQuestions]=useState(false);

  const fetchQuestions=async()=>{
    try {
      setLoading(true);
      const response=await fetch('https://opentdb.com/api.php?amount=10&type=multiple');

      if(!response.ok)
      throw new Error('Failed to fetch questions');

      const data=await response.json();
      console.log("API response",data);
      
      const processedQuestions=data.results.map((q) => {
        const answers=[...q.incorrect_answers,q.correct_answer].sort(()=>Math.random()-0.5);
        return {...q,answers,question:decodeHTML(q.question)};
      });
      
      setQuestions(processedQuestions);
      setUserAnswers({});
      setCurrentQuestionIndex(0);
      setQuizCompleted(false);
    } catch (err) {
      console.log("Error in loading questions",err);
    } finally {
      setLoading(false);
      setFetchingNewQuestions(false);
    }
  };

 

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswerSelection=(answer)=>{
    setUserAnswers({...userAnswers,[currentQuestionIndex]:answer});
  };

  const nextQuestion=()=>{
    if(currentQuestionIndex<questions.length-1) 
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    else
    setQuizCompleted(true);
  };

  const prevQuestion=()=>{
    if (currentQuestionIndex>0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const resetQuiz=()=>{
    setFetchingNewQuestions(true);
    fetchQuestions();
  };

  const calculateScore=()=>{
    let score=0;
    questions.forEach((question,index) => {
      if (userAnswers[index]===question.correct_answer) {
        score += 1;
      }
    });
    return score;
  };


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg text-center">
          <Loader2 className="animate-spin h-12 w-12 mx-auto text-blue-500" />
          <p className="mt-4 text-lg font-medium text-gray-700">Loading your quiz questions...</p>
        </div>
      </div>
    );
  }

  
  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg text-center">
          <p className="text-lg font-medium text-gray-700">No questions available. Please try again later.</p>
          <button 
            onClick={fetchQuestions} 
            className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion=questions[currentQuestionIndex];
  const progressPercentage=((currentQuestionIndex+1)/questions.length) * 100;

  if (quizCompleted && !fetchingNewQuestions) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;
    
    let message = "Better luck next time!";
    let color = "text-red-500";
    
    if (percentage >= 80) {
      message = "Excellent work!";
      color = "text-green-500";
    } else if (percentage >= 60) {
      message = "Good job!";
      color = "text-blue-500";
    } else if (percentage >= 40) {
      message = "Nice effort!";
      color = "text-yellow-500";
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
          <div className="text-center mb-8">
            <Award className="mx-auto h-20 w-20 text-yellow-400" />
            <h1 className="text-3xl font-bold mt-4 mb-2">Quiz Completed!</h1>
            <p className={`text-xl font-semibold ${color}`}>{message}</p>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-medium">Your Score:</span>
              <span className="text-2xl font-bold">
                {score}/{questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-4">
              <div 
                className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" 
                style={{width: `${percentage}%`}}
              ></div>
            </div>
            <p className="text-right mt-1 text-sm text-gray-600">{percentage.toFixed(0)}%</p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Review Your Answers</h2>
            <div className="max-h-64 overflow-y-auto">
              {questions.map((q, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg mb-2">
                  <p className="font-medium">{idx + 1}. {q.question}</p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">Your answer:</span>{" "}
                    <span className={userAnswers[idx] === q.correct_answer ? "text-green-600" : "text-red-600"}>
                      {userAnswers[idx]}
                    </span>
                  </p>
                  {userAnswers[idx] !== q.correct_answer && (
                    <p className="text-sm text-green-600">
                      <span className="font-medium">Correct answer:</span> {q.correct_answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={resetQuiz} 
            className="w-full mt-6 bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} />
            Try New Questions
          </button>
        </div>
      </div>
    );
  }

  return (
    <Maincard 
       userAnswers={userAnswers}
       questions={questions}
       prevQuestion={prevQuestion}
       nextQuestion={nextQuestion}
       currentQuestion={currentQuestion}
       currentQuestionIndex={currentQuestionIndex}
       handleAnswerSelection={handleAnswerSelection}
       progressPercentage={progressPercentage}
    />
  );
}