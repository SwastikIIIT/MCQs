import React from 'react'

const Maincard = ({questions,currentQuestionIndex,currentQuestion,handleAnswerSelection,prevQuestion,userAnswers,getAnswerButtonClass,progressPercentage,quizCompleted,nextQuestion
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>Progress: {Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" 
              style={{width: `${progressPercentage}%`}}
            ></div>
          </div>
        </div>

        {/* Category badge */}
        <div className="mb-4">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {currentQuestion.category}
          </span>
          <span className="ml-2 bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
          </span>
        </div>

        {/* Question */}
        <h2 className="text-xl font-bold mb-6">{currentQuestion.question}</h2>

        {/* Answer options */}
        <div className="space-y-2 mb-6">
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={index}
              onClick={()=>handleAnswerSelection(answer)}
              disabled={quizCompleted}
              className={getAnswerButtonClass(answer)}
            >
              {answer}
            </button>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium ${
              currentQuestionIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          <button
            onClick={nextQuestion}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium ${
              !userAnswers[currentQuestionIndex]
                ? 'bg-gray-200 text-gray-500'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Maincard