# 📚 Book Shop CRUD Web App

A simple, full‑stack CRUD application for managing books. Users can create, view, update (partial or full), and delete books — including a cover image URL — with a clean React frontend, a Node.js + Express backend, and MySQL as the database.

- Author: Stephen Omusula
- Email: stephenomusula3@gmail.com
- Frontend: React (Netlify)
- Backend: Node.js + Express (Railway)
- Database: MySQL (Railway)

## ✨ Features

- ➕ Create a book with title, description, cover (image URL), and price
- 📄 View all books (including cover images) fetched from the database
- ✏️ Update full book details or partially update a specific field (e.g., title only or cover only)
- 🗑️ Delete a book by ID
- 🌐 Deployed frontend on Netlify, backend and MySQL on Railway

## 🧱 Tech Stack

- Frontend: React, React Router, Axios
- Backend: Node.js, Express, CORS, dotenv
- Database: MySQL (mysql2/promise)
- Deployment: Netlify (frontend), Railway (backend + MySQL)

## 🗂️ Project Structure

```
PLP_Database_Week08/
├─ backend/               # Express server + MySQL connection
│  ���─ index.js
│  └─ package.json
├─ client/                # React app (CRA)
│  ├─ src/pages/{Books,Add,Update}.jsx
│  └─ package.json
├─ schema.sql             # DB schema + seed data
└─ README.md              # You are here
```

## 🔌 API Overview (Express)

Base URL (production): use your Railway service public URL.

- Example: https://your-railway-app.up.railway.app

Base URL (local): http://localhost:8800

Endpoints:

- GET /getAllBooks
  - Returns: array of books
- POST /createNewBook
  - Body (JSON): { title, description, cover, price }
  - Returns: success message
- DELETE /deleteBooks/:id
  - Returns: success message or 404 if not found
- PATCH /updateBook/:id
  - Body (JSON): any subset of { title, description, cover, price }
  - Returns: success message or 404 if not found

Example payloads:

- Create
  {
  "title": "The Great Gatsby",
  "description": "A novel by F. Scott Fitzgerald",
  "cover": "https://.../gatsby.jpg",
  "price": 10.99
  }
- Partial Update
  {
  "cover": "https://.../new-cover.jpg"
  }

Typical responses:

- 200 OK: success message or data
- 400 Bad Request: when no fields are provided for PATCH
- 404 Not Found: when the target book doesn't exist
- 500 Internal Server Error: for unexpected errors

## 🧮 Database Schema

Defined in schema.sql (MySQL):

- Database: bookShop
- Table: books
  - id INT AUTO_INCREMENT PRIMARY KEY
  - title VARCHAR(50) NOT NULL
  - description VARCHAR(255) NOT NULL
  - cover LONGTEXT NULL (store image URL)
  - price FLOAT NOT NULL

schema.sql also includes seed rows for quick testing.

## ⚙️ Configuration & Environment Variables

Backend (.env in backend/):

- MYSQL_URL=mysql://USER:PASS@HOST:PORT/bookShop

Notes:

- The backend reads MYSQL_URL using dotenv.
- Default local port: 8800 (see index.js). If your PaaS requires binding to PORT, update the code to use `process.env.PORT || 8800` or configure your service accordingly on Railway.

Frontend (.env in client/):

- REACT_APP_BACKEND_URL=https://your-railway-app.up.railway.app

Local development value:

- REACT_APP_BACKEND_URL=http://localhost:8800

The React app uses REACT_APP_BACKEND_URL to build API calls in all pages (Add.jsx, Books.jsx, Update.jsx).

## 🧪 Running Locally

Prerequisites:

- Node.js 18+
- MySQL server (local or remote)

Steps:

1. Clone and install dependencies
   - In backend/:
     - npm install
   - In client/:
     - npm install
2. Database
   - Create a MySQL database and user (or use Railway MySQL)
   - Run schema.sql to create the tables and seed data
   - Set MYSQL_URL in backend/.env
3. Start the backend (port 8800)
   - cd backend && npm start
4. Start the frontend (CRA on port 3000)
   - cd client && npm start
5. Open http://localhost:3000 and use the app

## 🚀 Deployment

Frontend (Netlify):

- Build command: npm run build
- Publish directory: client/build
- Base directory: client
- Environment variables: set REACT_APP_BACKEND_URL to your Railway backend URL
- Redeploy after changing environment variables

Backend (Railway):

- Create a new Node.js service and deploy backend/
- Set Environment Variables:
  - MYSQL_URL: mysql://USER:PASS@HOST:PORT/bookShop (Railway MySQL plugin exposes these)
  - Optionally, configure CORS origin if you restrict it
- Start command: node index.js (or your preferred PM)
- Confirm the public service URL, e.g. https://your-railway-app.up.railway.app
- Use that URL for REACT_APP_BACKEND_URL on Netlify

MySQL (Railway):

- Add a MySQL database plugin in Railway
- Copy the connection URL and paste into MYSQL_URL
- Initialize the schema by running schema.sql against the database

## 🔁 Frontend <-> Backend Integration

- All API calls use the REACT_APP_BACKEND_URL environment variable combined with endpoint paths
  - GET ${REACT_APP_BACKEND_URL}/getAllBooks
  - POST ${REACT_APP_BACKEND_URL}/createNewBook
  - DELETE ${REACT_APP_BACKEND_URL}/deleteBooks/:id
  - PATCH ${REACT_APP_BACKEND_URL}/updateBook/:id

## 🧭 User Flows

- Add Book: user submits a form with title, description, cover URL, and price → POST /createNewBook
- List Books: page fetches and renders all books with cover images → GET /getAllBooks
- Update Book: user edits full or partial fields (e.g., only cover) → PATCH /updateBook/:id
- Delete Book: user deletes a book by ID → DELETE /deleteBooks/:id

## 🔒 Notes on CORS & Security

- CORS is enabled broadly in the backend for simplicity. In production, restrict allowed origins to your Netlify domain.
- Validate inputs server‑side (e.g., price must be a number, cover should be a valid URL).
- Consider using prepared statements with named fields for stricter updates, or a whitelist for PATCH fields.

## 🧰 Useful Commands

Backend:

- npm start → start Express server
- npm run devStart → start with nodemon (auto-reload)

Frontend (CRA):

- npm start → run dev server
- npm run build → build for production

## 👤 Author

- Stephen Omusula
- Email: stephenomusula3@gmail.com

## ✅ Status

- Minimal CRUD app working end‑to‑end with partial updates. Ready for deployment to Netlify (frontend) and Railway (backend + MySQL).
