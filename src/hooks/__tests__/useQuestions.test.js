import { renderHook, act } from '@testing-library/react-hooks';
import { useQuestions } from '../useQuestions';
import * as api from '../../utils/api';

jest.mock('../../utils/api');

describe('useQuestions hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch questions on mount', async () => {
    const mockQuestions = [{ id: 1, prompt: 'Test question' }];
    api.fetchQuestions.mockResolvedValueOnce(mockQuestions);

    const { result, waitForNextUpdate } = renderHook(() => useQuestions());

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.questions).toEqual(mockQuestions);
    expect(result.current.error).toBeNull();
  });

  test('should handle fetch error', async () => {
    const error = new Error('Failed to fetch');
    api.fetchQuestions.mockRejectedValueOnce(error);

    const { result, waitForNextUpdate } = renderHook(() => useQuestions());

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(error.message);
  });

  test('should add question', async () => {
    const newQuestion = { prompt: 'New question', answers: ['A', 'B'], correctIndex: 0 };
    api.createQuestion.mockResolvedValueOnce({ id: 1, ...newQuestion });

    const { result } = renderHook(() => useQuestions());

    await act(async () => {
      await result.current.addQuestion(newQuestion);
    });

    expect(api.createQuestion).toHaveBeenCalledWith(newQuestion);
  });

  test('should delete question', async () => {
    const id = 1;
    api.deleteQuestion.mockResolvedValueOnce({});

    const { result } = renderHook(() => useQuestions());

    await act(async () => {
      await result.current.removeQuestion(id);
    });

    expect(api.deleteQuestion).toHaveBeenCalledWith(id);
  });

  test('should update question', async () => {
    const id = 1;
    const correctIndex = 2;
    api.updateQuestion.mockResolvedValueOnce({ id, correctIndex });

    const { result } = renderHook(() => useQuestions());

    await act(async () => {
      await result.current.modifyQuestion(id, correctIndex);
    });

    expect(api.updateQuestion).toHaveBeenCalledWith(id, correctIndex);
  });
}); 