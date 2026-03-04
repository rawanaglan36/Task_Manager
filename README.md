# 📋 Task Manager - Modern Dark Theme

A sleek, modern task management application built with **Next.js 15**, featuring a beautiful dark theme UI and full Docker support for easy deployment.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker)

---

## ✨ Features

### 🎨 Modern Dark Theme UI
- Beautiful gradient backgrounds with glassmorphism effects
- Smooth animations and transitions
- Responsive design for all screen sizes
- Intuitive and clean interface

### 📝 Task Management
- ✅ Create, update, and delete tasks
- 🏷️ Task status tracking (Pending, In Progress, Completed)
- 🎯 Priority levels (Low, Medium, High)
- 📊 Real-time task statistics dashboard
- 🔍 Filter tasks by status
- 💾 Local storage persistence

### 🚀 Technical Features
- ⚡ Built with Next.js 15 (App Router)
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 🔔 Toast notifications for user feedback
- 📱 Fully responsive design
- 🐳 Docker & Docker Compose ready
- 🗄️ MongoDB integration support

---

## 🏗️ Project Structure

```
task-manager/
├── src/
│   └── app/
│       ├── dashboard/              # Main dashboard with stats
│       ├── tasks/                  # Full task list view
│       ├── _Components/
│       │   ├── Dashboard/          # Dashboard components
│       │   ├── Tasks/              # Task management components
│       │   ├── Loading/            # Loading spinner
│       │   └── LayoutWrapper/      # Layout wrapper
│       ├── _utils/                 # Utility functions
│       ├── layout.tsx              # Root layout
│       └── page.tsx                # Home page
├── public/                         # Static assets
├── docker-compose.yml              # Docker Compose configuration
├── Dockerfile                      # Docker image configuration
└── package.json                    # Dependencies
```

---

## � Docker Deployment

### Using Docker Compose (Recommended)

The easiest way to run the application with all dependencies:

```bash
docker-compose up -d
```

This will start:
- **Task Manager App** on `http://localhost:3000`
- **MongoDB Database** with authentication

### Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up -d --build

# Stop and remove volumes
docker-compose down -v
```

### Manual Docker Build

```bash
# Build the image
docker build -t task-manager .

# Run the container
docker run -p 3000:3000 task-manager
```

---

## 📦 Production Build

### Local Production Build
```bash
npm run build
npm start
```

### Docker Production Build
The Dockerfile is optimized for production:
- Multi-stage build for smaller image size
- Production dependencies only
- Optimized Next.js build
- Port 3000 exposed

---

## 🎯 Usage Guide

### Dashboard
- View task statistics at a glance
- Quick task creation
- See recent tasks (up to 5)
- Navigate to full task list

### Task Management
1. **Create Task**: Enter title and description, then click "Add Task"
2. **Update Status**: Click the check icon to cycle through statuses
3. **Delete Task**: Click the trash icon to remove a task
4. **Filter Tasks**: Use the dropdown to filter by status
5. **Set Priority**: Choose priority level when creating tasks

### Task Status Flow
```
Pending → In Progress → Completed → Pending (cycles)
```

---

## �‍💻 Author

**Rawan Aglan**  
DevOps Engineer  
📧 [GitHub](https://github.com/rawanaglan36)  
🗓️ *2026*


