require('dotenv').config();
const mongoose = require('mongoose');
const Todo = require('./models/Todo');

const sampleTodos = [
  {
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the Todo API',
    completed: false
  },
  {
    title: 'Review pull requests',
    description: 'Review and merge pending pull requests from team members',
    completed: false
  },
  {
    title: 'Update dependencies',
    description: 'Update npm packages to latest stable versions',
    completed: true
  },
  {
    title: 'Deploy to production',
    description: 'Deploy the application to production server',
    completed: false
  },
  {
    title: 'Write unit tests',
    description: 'Add unit tests for all API endpoints',
    completed: false
  }
];

async function addTodos() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    // Clear existing todos (optional)
    await Todo.deleteMany({});
    console.log('Cleared existing todos');

    // Insert sample todos
    const todos = await Todo.insertMany(sampleTodos);
    console.log(`Added ${todos.length} sample todos:`);
    todos.forEach(todo => {
      console.log(`- ${todo.title} (${todo.completed ? 'Completed' : 'Pending'})`);
    });

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error adding todos:', error);
    process.exit(1);
  }
}

addTodos();
