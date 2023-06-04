const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');


const app = express();
app.use(bodyParser.json());
app.use(cors())

// Connect to SQLite database
const db = new sqlite3.Database('crudapp.db', (err) => {
  if (err) {
    console.error('Error connecting to SQLite:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

let unique_id = 0

// Create a "tasks" table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE,
    is_complete INTEGER,
    primary key (title, description)
  )
`);




// Create a new task
app.post('/tasks', (req, res) => {
  const { title, description, due_date } = req.body;
  const uuid = uuidv4();
  db.run('INSERT INTO tasks (id, title, description, due_date) VALUES (?,?, ?,?)', [uuid, title, description,due_date], function (err) {
    if (err) {
      res.status(500).json({ error: 'Error creating task' });
    } else {
        unique_id+=1
      res.json({ message: 'task created successfully' });
    }
  });
});

// Get all tasks
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks order by due_date', (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving tasks' });
    } else {
      res.json(rows);
    }
  });
});

// Get task by description
app.get('/tasks/:content', (req, res) => {
    const content = req.params.content;
    db.get('SELECT * FROM tasks WHERE title = ? or description = ?', [content,content], (err, row) => {
      if (err) {
        res.status(500).json({ error: 'Error retrieving task' });
      } else if (!row) {
        res.status(404).json({ error: 'task not found' });
      } else {
        res.json(row);
      }
    });
  });


// Update a task by ID
app.put('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const { title, description,due_date } = req.body;
  db.run('UPDATE tasks SET title = ?, description = ?,due_date=? WHERE id = ?', [title, description, due_date, id], function (err) {
    if (err) {
      res.status(500).json({ error: 'Error updating task' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'task not found' });
    } else {
      res.json({ message: 'task updated successfully' });
    }
  });
});

app.put('/tasks/completed/:id',(req,res)=>{
    const id = req.params.id;
  db.run('UPDATE tasks SET is_complete=1 WHERE id = ?', [ id], function (err) {
    if (err) {
      res.status(500).json({ error: 'Error updating task' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'task not found' });
    } else {
      res.json({ message: 'task updated successfully' });
    }
  });
})

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: 'Error deleting task' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'task not found' });
    } else {
      res.json({ message: 'task deleted successfully' });
    }
  });
});

// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
