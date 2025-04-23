import React from 'react';
import { render, screen } from '@testing-library/react';
import { QuestionProvider, useQuestionContext } from '../QuestionContext';
import * as api from '../../utils/api';

jest.mock('../../utils/api');

const TestComponent = () => {
  const { questions, loading, error } = useQuestionContext();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {questions.map(q => (
        <div key={q.id}>{q.prompt}</div>
      ))}
    </div>
  );
};

describe('QuestionContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should provide questions to children', async () => {
    const mockQuestions = [{ id: 1, prompt: 'Test question' }];
    api.fetchQuestions.mockResolvedValueOnce(mockQuestions);

    render(
      <QuestionProvider>
        <TestComponent />
      </QuestionProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await screen.findByText('Test question');
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  test('should handle error state', async () => {
    const error = new Error('Failed to fetch');
    api.fetchQuestions.mockRejectedValueOnce(error);

    render(
      <QuestionProvider>
        <TestComponent />
      </QuestionProvider>
    );

    await screen.findByText(`Error: ${error.message}`);
  });

  test('should throw error when used outside provider', () => {
    const TestComponentWithoutProvider = () => {
      try {
        useQuestionContext();
        return <div>No error</div>;
      } catch (e) {
        return <div>Error caught</div>;
      }
    };

    render(<TestComponentWithoutProvider />);
    expect(screen.getByText('Error caught')).toBeInTheDocument();
  });
}); 