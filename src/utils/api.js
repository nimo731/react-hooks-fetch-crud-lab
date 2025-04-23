const API_URL = 'http://localhost:4000';

export const fetchQuestions = async () => {
  const response = await fetch(`${API_URL}/questions`);
  return response.json();
};

export const createQuestion = async (questionData) => {
  const response = await fetch(`${API_URL}/questions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(questionData),
  });
  return response.json();
};

export const deleteQuestion = async (id) => {
  const response = await fetch(`${API_URL}/questions/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const updateQuestion = async (id, correctIndex) => {
  const response = await fetch(`${API_URL}/questions/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ correctIndex }),
  });
  return response.json();
}; 