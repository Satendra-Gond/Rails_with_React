import React, { useState } from "react";

export const TodoItem = ({ todo, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: todo.title,
    description: todo.description,
    status: todo.status,
  });

  // Handle save when editing
  const handleSave = (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    onEdit(todo.id, form.title, form.description, form.status); // Call onEdit from parent
    setIsEditing(false); // Exit editing mode
  };

  // Update form state on field change
  const updateField = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <form className="row row-cols-lg-auto g-3 align-items-center" onSubmit={handleSave}>
          <div className="col-12">
            <label className="visually-hidden" htmlFor="inlineFormInputGroupUsername">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={form.title}
              onChange={updateField}
              required
              placeholder="Edit title"
            />
          </div>

          <div className="col-12">
            <label className="visually-hidden" htmlFor="inlineFormInputGroupUsername">Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={form.description}
              onChange={updateField}
              required
              placeholder="Edit description"
            />
          </div>

          <div className="col-auto">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="status"
                name="status"
                onChange={updateField}
                checked={form.status} // Bind checkbox to form status state
              />
              <label className="form-check-label" htmlFor="status">
                Status
              </label>
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-sm btn-primary">Save</button>
            &nbsp;
            <button className="btn btn-sm btn-default" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <input
            className="form-check-input"
            type="checkbox"
            name="status"
            checked={todo.status === true}
            readOnly
          />
          <h4>{todo.title}</h4>
          <p>{todo.description}</p>
          <button
            className="btn btn-sm btn-warning"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>{" "}
          &nbsp;
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(todo)}
          >
            Delete
          </button>
        </>
      )}
      <hr />
    </div>
  );
};
