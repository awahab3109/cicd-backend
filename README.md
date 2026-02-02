# Todo App with Node.js and MongoDB

A simple REST API for managing todos with CRUD operations.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/todoapp
```

3. Make sure MongoDB is running locally or update the `MONGODB_URI` with your MongoDB connection string.

4. Start the server:
```bash
npm start
```

## Docker Setup

Run the app with Docker Compose (includes MongoDB):

```bash
docker-compose up
```

Or build and run just the app:

```bash
docker build -t todo-app .
docker run -p 3000:3000 --env-file .env todo-app
```

## API Endpoints

- `POST /api/todos` - Create a new todo
- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a single todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Example Request

Create a todo:
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Node.js", "description": "Build a todo app"}'
```
