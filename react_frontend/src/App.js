import './App.css';
import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { Footer } from "./MyComponents/Footer";
import { AddTodo } from "./MyComponents/AddTodo";
import { About } from "./MyComponents/About";
import { TextOperation } from "./MyComponents/TextOperation";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

/**
 * AppContent Component
 * This component contains all the application logic and routing that needs access to router hooks.
 * It's wrapped by the Router component in App, allowing it to use router-specific hooks like useLocation.
 */
function AppContent() {
  // Get current route location for navigation awareness
  const location = useLocation();
  
  // State management
  const [todos, setTodos] = useState([]); // Stores the list of todos
  const [loading, setLoading] = useState(true); // Tracks API loading state
  const [error, setError] = useState(""); // Stores error messages

  // Fetch todos from API when component mounts
  useEffect(() => {
    fetch("http://localhost:3000/api/todos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        return response.json();
      })
      .then((data) => {
        setTodos(data);
        setLoading(false); // Hide loading indicator
      })
      .catch((error) => {
        setError("Error fetching todos.");
        console.error("Error fetching todos:", error);
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs once on mount

  /**
   * Deletes a todo item
   * @param {Object} todo - The todo item to delete
   */
  const onDelete = (todo) => {
    fetch(`http://localhost:3000/api/todos/${todo.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete todo");
        }
        // Remove the deleted todo from state
        setTodos((prevTodos) => prevTodos.filter((e) => e.id !== todo.id));
      })
      .catch((error) => {
        setError("Error deleting todo.");
        console.error("Error deleting todo:", error);
      });
  };

  /**
   * Adds a new todo item
   * @param {string} title - The title of the new todo
   * @param {string} desc - The description of the new todo
   */
  const addTodo = (title, desc) => {
    const newTodo = {
      title,
      description: desc,
    };

    fetch("http://localhost:3000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add todo");
        }
        return response.json();
      })
      .then((data) => {
        // Add the new todo to the existing list
        setTodos((prevTodos) => [...prevTodos, data]);
      })
      .catch((error) => {
        setError("Error adding todo.");
        console.error("Error adding todo:", error);
      });
  };

  /**
   * Updates an existing todo item
   * @param {number} id - The ID of the todo to update
   * @param {string} updatedTitle - The new title
   * @param {string} updatedDescription - The new description
   * @param {string} updatedStatus - The new status
   */
  const editTodo = (id, updatedTitle, updatedDescription, updatedStatus) => {
    fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        title: updatedTitle, 
        description: updatedDescription, 
        status: updatedStatus 
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update todo");
        }
        return response.json();
      })
      .then((updatedTodo) => {
        // Update the specific todo in the list
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
        );
      })
      .catch((error) => {
        setError("Error updating todo.");
        console.error("Error updating todo:", error);
      });
  };

  // Render the application content with routing
  return (
    <>
      {/* Header component receives current path for navigation highlighting */}
      <Header title="My Todos List" searchBar={false} currentPath={location.pathname} />
      
      {/* Route configuration */}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <AddTodo addTodo={addTodo} />
              {/* Conditional rendering based on loading state */}
              {loading ? (
                <p className="text-center">Loading todos...</p>
              ) : (
                <>
                  {/* Show error message if there is one */}
                  {error && <p className="text-center text-danger">{error}</p>}
                  {/* Main todos list component */}
                  <Todos todos={todos} onDelete={onDelete} onEdit={editTodo} />
                </>
              )}
            </>
          }
        />
        {/* Additional routes */}
        <Route exact path="/textops" element={<TextOperation />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
      
      <Footer />
    </>
  );
}

/**
 * Main App component
 * Provides Router context for the entire application
 * This structure ensures all router hooks are used within Router context
 */
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;