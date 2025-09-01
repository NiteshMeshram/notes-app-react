# 📒 Notes App

A simple full-stack Notes app built with:
- **Frontend**: React + TypeScript + Vite  
- **Backend**: Node.js + Express + TypeScript + MongoDB (Atlas or Local)

## Overview

1. This is a **TypeScript** based notes application that allows users to create, **edit, delete, and view** notes with ease.  
2. Notes can be saved either in **LocalStorage** (for persistence across sessions) or in **MongoDB** via a backend API.
3. The app is designed with clean architecture and modular components for maintainability and scalability.

## ✅ Features

- Create a note with a title and content - **Done**
- Delete a note - **Done**
- Edit an existing note - **Done**
- View a list of all notes - **Done**
- Save notes offline (LocalStorage) or with DB (MongoDB Atlas) - **Done**
- Search notes (optional) - **Done**



---

## 🚀 Project Structure
```
Notes_App/
├── notes-app-react/   # Frontend (React)
│   └── src/...
├── my-backend/        # Backend (Express + MongoDB)
│   ├── src/
│   └── .env           # Backend environment variables (not committed)
└── README.md
```

---

## ⚙️ Prerequisites
- [Node.js](https://nodejs.org/) >= 18  
- [npm](https://www.npmjs.com/)  
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB installation)

---

## 🔐 Environment Variables

Create a `.env` file inside **`my-backend/`**:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xyz.mongodb.net/notes_db
PORT=5000
```

⚠️ Never commit `.env` to GitHub.

---

## 🖥️ Running the Backend (API)

1. Open a terminal in `my-backend/`
   ```bash
   cd my-backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the server in dev mode
   ```bash
   npm run dev
   ```

4. API will be available at  
   👉 `http://localhost:5000/api/notes`

---

## 🎨 Running the Frontend (React)

1. Open another terminal in `notes-app-react/`
   ```bash
   cd notes-app-react
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the React dev server
   ```bash
   npm run dev
   ```

4. App will be available at  
   👉 `http://localhost:5173`

---

## 📡 Switching Data Source

In the frontend UI, there’s a toggle to choose:
- **LocalStorage** mode  
- **MongoDB (via backend API)** mode

---

