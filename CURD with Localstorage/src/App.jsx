import React, { useEffect, useState } from "react";

const App = () => {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("items")) || [];
    setItems(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!text.trim()) return;

    const newItem = {
      id: Date.now(),
      name: text,
    };

    setItems([...items, newItem]);
    setText("");
  };

  const deleteItem = (id) => {
    const filtered = items.filter((item) => item.id !== id);
    setItems(filtered);
  };

  const editItem = (item) => {
    setText(item.name);
    setEditId(item.id);
  };

  const updateItem = () => {
    const updated = items.map((item) =>
      item.id === editId ? { ...item, name: text } : item
    );

    setItems(updated);
    setText("");
    setEditId(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>CRUD with LocalStorage</h2>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter item"
      />

      {editId ? (
        <button onClick={updateItem}>Update</button>
      ) : (
        <button onClick={addItem}>Add</button>
      )}

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => editItem(item)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;