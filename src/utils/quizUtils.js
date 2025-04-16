export const decodeHTML = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };
  
  export const fetchQuizQuestions = async () => {
    const response = await fetch(
      'https://opentdb.com/api.php?amount=10&type=multiple'
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    
    const data = await response.json();
    
    // Process questions to include all options in a single array
    return data.results.map((q) => {
      const answers = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
      return {
        ...q,
        answers,
        question: decodeHTML(q.question)
      };
    });
  };