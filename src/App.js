import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import Header from './components/Header';
import Tasks from './components/Tasks';
import About from './components/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  // To store data on local storage
  const LOCAL_STORAGE_KEY = "TODOS_KEY";
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTasks)
      setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Route path='/' exact render={(props) => (
          <>
            {showAddTask &&
              <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? (
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
            ) : ('No tasks remaining To-Do')}
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
