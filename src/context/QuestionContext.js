import React, { createContext, useContext } from 'react';
import { useQuestions } from '../hooks/useQuestions';

const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const questionState = useQuestions();
  
  return (
    <QuestionContext.Provider value={questionState}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestionContext = () => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error('useQuestionContext must be used within a QuestionProvider');
  }
  return context;
}; 