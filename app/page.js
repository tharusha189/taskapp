"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then(setNotes);
  }, []);

  async function addNote(e) {
    e.preventDefault();
    if (!text.trim()) return;

    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newNote = await res.json();

    setNotes([...notes, newNote]);
    setText("");
  }

  async function deleteNote(id) {
    await fetch("/api/notes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setNotes(notes.filter((note) => note.id !== id));
  }

  function startEdit(note) {
    setEditingId(note.id);
    setEditText(note.text);
  }

  async function saveEdit(id) {
    if (!editText.trim()) return;

    await fetch("/api/notes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, text: editText }),
    });

    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, text: editText.trim() } : note
      )
    );
    setEditingId(null);
  }

  return (
    <main style={{ maxWidth: 480, margin: "40px auto", padding: 16 }}>
      <h1>Quick Notes</h1>

      <form onSubmit={addNote} style={{ display: "flex", gap: 8 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note..."
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit">Add</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {notes.map((note) => (
          <li
            key={note.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 8,
              padding: "8px 0",
              borderBottom: "1px solid #ccc",
            }}
          >
            {editingId === note.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ flex: 1, padding: 4 }}
                />
                <button onClick={() => saveEdit(note.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span style={{ flex: 1 }}>{note.text}</span>
                <button onClick={() => startEdit(note)}>Edit</button>
                <button onClick={() => deleteNote(note.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}