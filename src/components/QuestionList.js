import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";
function QuestionList({reRenderPage}) {
const [questions, setQuestions] = useState([]);
const ifQuestionsPage = reRenderPage==="List"

useEffect(() => {
  fetch("http://localhost:4000/questions")
    .then((response) => response.json())
    .then((questions) => setQuestions(questions))
}
, [ifQuestionsPage]);

function handleDeleteClick(id) {
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "DELETE",
  })
    .then((r) => r.json())
    .then(() => {
      const updatedQuestions = questions.filter((q) => q.id !== id);
      setQuestions(updatedQuestions);
    });
}

function handleAnswerChange(id, correctIndex) {
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correctIndex }),
  })
    .then((r) => r.json())
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((q) => {
        if (q.id === updatedQuestion.id) return updatedQuestion;
        return q;
      });
      setQuestions(updatedQuestions);
    });
}

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question => <QuestionItem
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
       question={question}
       key={question.id}/>) }</ul>
    </section>
  );
}

export default QuestionList;
