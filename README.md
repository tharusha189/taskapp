# Quick Notes

A small full-stack notes app built with Next.js and React.

## Features
- Add and delete notes
- Notes are saved on the server and survive page refreshes
- REST API built with Next.js API routes (GET, POST, DELETE)

## Tech stack
- Next.js (App Router)
- React (hooks: `useState`, `useEffect`)
- Next.js API routes
- Notes stored in a JSON file on the server

## Run locally
```bash
git clone https://github.com/tharusha189/taskapp.git
cd taskapp
npm install
npm run dev
```
Then open http://localhost:3000.

## What I learned
- How a React frontend talks to a backend with `fetch`
- How API routes map to URLs and HTTP methods
- The difference between browser storage and server storage

## Possible improvements
- Replace the JSON file with a database (e.g. PostgreSQL)
- Edit notes
- User accounts and login