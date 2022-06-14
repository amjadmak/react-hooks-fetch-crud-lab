import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const addNewQuestion = (form) => {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: form.prompt,
        answers:[form.answer1, form.answer2, form.answer3, form.answer4],
        correctIndex: form.correctIndex,
  
  })
    })
  }
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddNewQuestion={addNewQuestion} /> : <QuestionList reRenderPage={page} />}
    </main>
  );
}

export default App;
