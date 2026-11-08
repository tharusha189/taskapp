import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "notes.json");

async function readNotes() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return []; // file doesn't exist yet
  }
}

async function writeNotes(notes) {
  await fs.writeFile(filePath, JSON.stringify(notes, null, 2));
}

export async function GET() {
  return NextResponse.json(await readNotes());
}

export async function POST(request) {
  const { text } = await request.json();
  if (!text || !text.trim()) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }
  const notes = await readNotes();
  const note = { id: Date.now(), text: text.trim() };
  notes.push(note);
  await writeNotes(notes);
  return NextResponse.json(note, { status: 201 });
}

export async function DELETE(request) {
  const { id } = await request.json();
  const notes = await readNotes();
  await writeNotes(notes.filter((n) => n.id !== id));
  return NextResponse.json({ success: true });
}

export async function PUT(request) {
  const { id, text } = await request.json();
  if (!text || !text.trim()) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }
  const notes = await readNotes();
  const updated = notes.map((n) =>
    n.id === id ? { ...n, text: text.trim() } : n
  );
  await writeNotes(updated);
  return NextResponse.json({ success: true });
}