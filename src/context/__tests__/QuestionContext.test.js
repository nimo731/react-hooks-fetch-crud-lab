import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QuestionProvider, useQuestionContext } from '../QuestionContext';
import * as api from '../../utils/api';

jest.mock('../../utils/api');

const TestComponent = () => {
  const { questions, loading, error } = useQuestionContext();
  
  if (loading) return <div data-testid="loading">Loading...</div>;
  if (error) return <div data-testid="error">Error: {error}</div>;
  
  return (
    <div>
      {questions.map(q => (
        <div key={q.id} data-testid="question">{q.prompt}</div>
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

    // Check loading state
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    
    // Wait for questions to load
    await waitFor(() => {
      expect(screen.getByTestId('question')).toHaveTextContent('Test question');
    });

    // Verify loading is gone
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  test('should handle error state', async () => {
    const error = new Error('Failed to fetch');
    api.fetchQuestions.mockRejectedValueOnce(error);

    render(
      <QuestionProvider>
        <TestComponent />
      </QuestionProvider>
    );

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent(`Error: ${error.message}`);
    });
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