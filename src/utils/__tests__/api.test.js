import { fetchQuestions, createQuestion, deleteQuestion, updateQuestion } from '../api';

describe('API Utilities', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('fetchQuestions should return questions', async () => {
    const mockQuestions = [{ id: 1, prompt: 'Test question' }];
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockQuestions),
    });

    const questions = await fetchQuestions();
    expect(questions).toEqual(mockQuestions);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/questions');
  });

  test('createQuestion should send POST request', async () => {
    const questionData = { prompt: 'New question', answers: ['A', 'B'], correctIndex: 0 };
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ id: 1, ...questionData }),
    });

    await createQuestion(questionData);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(questionData),
    });
  });

  test('deleteQuestion should send DELETE request', async () => {
    const id = 1;
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({}),
    });

    await deleteQuestion(id);
    expect(global.fetch).toHaveBeenCalledWith(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    });
  });

  test('updateQuestion should send PATCH request', async () => {
    const id = 1;
    const correctIndex = 2;
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ id, correctIndex }),
    });

    await updateQuestion(id, correctIndex);
    expect(global.fetch).toHaveBeenCalledWith(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correctIndex }),
    });
  });
}); 