# Stunning AI-First Build - Website Idea Generator

Welcome to the Stunning AI-First Build project! This repository contains a full-stack application that allows users to submit website ideas and generates dummy landing page sections using a NestJS API with MongoDB storage. The frontend is built with Next.js for a smooth user experience.

---

## 🧪 Project Overview

- **Frontend:** Next.js (React)  
- **Backend:** NestJS (Node.js) REST API  
- **Database:** MongoDB  
- **Functionality:**  
  - User submits a website idea via a form  
  - Backend returns 3 dummy sections (e.g., Hero, About, Contact)  
  - Sections are stored in MongoDB  
  - Frontend fetches and previews the generated landing page sections  
  - Loading and error handling implemented  

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)  
- npm or yarn  
- MongoDB (local or Atlas instance)  

---

### Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

2. **Setup Backend**

```bash
cd backend
npm install
```

- Configure MongoDB connection string in `.env` file (create `.env` if not present):

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=3001
```

- Start the backend server:

```bash
npm run start:dev
```

3. **Setup Frontend**

```bash
cd ../frontend
npm install
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Project Structure

```
project-root/
├── backend/    # NestJS API + MongoDB models
├── frontend/   # Next.js React app
```
---

## 📚 Additional Notes
- If you need to install Tailwind CSS manually or update it, check the official docs: https://tailwindcss.com/docs/installation

- The backend uses NestJS's recommended project structure and practices.

- MongoDB Atlas is a great option for quick cloud database setup if you don’t want to install locally.

