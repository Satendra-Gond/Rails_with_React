import React from 'react';
import { TodoItem } from './TodoItem';

export const Todos = (props) => {
  const myStyle = {
    minHeight: "70vh",
    margin: "40px auto",
  };

  return (
    <div className="container" style={myStyle}>
      <h3 className="my-3">Todos List</h3>
      {props.todos.length === 0 ? (
        "No Todos to display"
      ) : (
        props.todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            onDelete={props.onDelete}
            onEdit={props.onEdit} // Changed from editTodo to onEdit for consistency
          />
        ))
      )}
    </div>
  );
};
