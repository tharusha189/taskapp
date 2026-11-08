"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [loaded, setLoaded] = useState(false);

  // Load saved notes once, when the page first opens
  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) setNotes(JSON.parse(saved));
    setLoaded(true);
  }, []);

  // Save notes whenever they change (after the first load)
  useEffect(() => {
    if (loaded) localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes, loaded]);

  function addNote(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setNotes([...notes, { id: Date.now(), text: text.trim() }]);
    setText("");
  }

  function deleteNote(id) {
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