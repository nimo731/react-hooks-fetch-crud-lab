import { useState, useEffect } from 'react';
import { fetchQuestions, createQuestion, deleteQuestion, updateQuestion } from '../utils/api';

export const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const addQuestion = async (questionData) => {
    try {
      const newQuestion = await createQuestion(questionData);
      setQuestions([...questions, newQuestion]);
    } catch (err) {
      setError(err.message);
    }
  };

  const removeQuestion = async (id) => {
    try {
      await deleteQuestion(id);
      setQuestions(questions.filter(q => q.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const modifyQuestion = async (id, correctIndex) => {
    try {
      const updatedQuestion = await updateQuestion(id, correctIndex);
      setQuestions(questions.map(q => 
        q.id === id ? updatedQuestion : q
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    questions,
    loading,
    error,
    addQuestion,
    removeQuestion,
    modifyQuestion
  };
}; 