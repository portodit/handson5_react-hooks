import { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import reactLogo from '/react.svg';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {

    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setList(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
 
    localStorage.setItem('todos', JSON.stringify(list));
  }, [list]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== '') {
      if (editIndex !== null) {
        const updatedList = list.map((item, idx) => (idx === editIndex ? newTodo : item));
        setList(updatedList);
        setEditIndex(null);
      } else {
        setList([...list, newTodo]);
      }
      setNewTodo('');
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewTodo(list[index]);
  };

  const handleDelete = (index) => {
    setList(list.filter((_, idx) => idx !== index));
  };

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>To Do List</h1>
      <div className="card input-card">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            placeholder="Add new todo"
          />
          <button type="submit">{editIndex !== null ? 'Update' : 'Add'}</button>
        </form>
      </div>
      <div className="card-list">
        {list.map((item, idx) => (
          <div key={idx} className="todo-item">
            <p>{item}</p>
            <div className="todo-actions">
              <button onClick={() => handleEdit(idx)}><FaEdit /></button>
              <button onClick={() => handleDelete(idx)}><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
