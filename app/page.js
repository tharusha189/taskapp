"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  // Load notes from the API when the page opens
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
              padding: "8px 0",
              borderBottom: "1px solid #ccc",
            }}
          >
            {note.text}
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}