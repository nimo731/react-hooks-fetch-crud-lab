# API Documentation

## Endpoints

### GET /questions
Fetches all questions from the server.

### POST /questions
Creates a new question.

Request body:
```json
{
  "prompt": "string",
  "answers": ["string", "string", "string", "string"],
  "correctIndex": number
}
```

### DELETE /questions/:id
Deletes a question by ID.

### PATCH /questions/:id
Updates a question's correct answer.

Request body:
```json
{
  "correctIndex": number
}
``` 