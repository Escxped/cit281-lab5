const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Array of student objects
const students = [
  { id: 1, last: 'Last1', first: 'First1' },
  { id: 2, last: 'Last2', first: 'First2' },
  { id: 3, last: 'Last3', first: 'First3' }
];

// GET: Return all students
app.get('/cit/student', (req, res) => {
  res.status(200).json(students);
});

// GET: Return one student by ID
app.get('/cit/student/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  if (student) {
    res.status(200).json(student);
  } else {
    res.status(404).send('Student not found');
  }
});

// POST: Add a new student
app.post('/cit/student', (req, res) => {
  const { first, last } = req.body;
  const newId = Math.max(...students.map(s => s.id)) + 1;
  const newStudent = { id: newId, first, last };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Fallback for unmatched routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
