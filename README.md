# ✅ Task Manager (Full Authentication and Task Management With Next.js)

This project is a modern **Next.js (App Router)** task management application built with TypeScript, Flowbite React, and React Hot Toast.  
It includes authentication guard logic, protected routes, and comprehensive task management features.

---

## 🚀 Features
- 🔐 **AuthGuard** using JWT token stored in localStorage
- ✅ **Task Management** - Create, update, delete, and organize tasks
- 📊 **Task Dashboard** - View task statistics and recent tasks
- 🏷️ **Task Status** - Track tasks as pending, in-progress, or completed
- 🎯 **Priority Levels** - Assign low, medium, or high priority to tasks
- 🔍 **Task Filtering** - Filter tasks by status
- 🧠 **Client/Server Components** separation
- 💅 **Google Fonts Integration (Poppins, Geist, Geist Mono)**
- ⚡ **Hot Toast Notifications**
- 🎨 **TailwindCSS + Flowbite React UI**
- ✅ **Form Validation with Formik & Yup**
- 🧭 **Dynamic Routing with next/navigation**

---

## 📂 Project Structure
```
src/
├── app/
│   ├── (Auth)/
│   │   ├── login/
│   │   ├── verify/
│   │   └── signup/
│   ├── dashboard/          # Main dashboard with task stats
│   ├── tasks/              # Full task list view
│   ├── _Components/
│   │   ├── (auth)/Auth/
│   │   ├── Dashboard/
│   │   ├── Tasks/
│   │   └── Loading/
│   ├── _utils/
│   │   └── gurad/AuthGuard.tsx
│   └── layout.tsx
└── styles/
    └── globals.css
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and add your environment variables if needed:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Development Server
```bash
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm start
```


## 🧱 UI Stack
| Library | Purpose |
|----------|----------|
| **Next.js 15+** | Framework |
| **TypeScript** | Strong typing |
| **TailwindCSS** | Styling |
| **Flowbite React** | Components |
| **Formik + Yup** | Form handling |
| **React Hot Toast** | Notifications |

---


## 🐳 Docker Setup

### Run with Docker Compose
```bash
docker-compose up -d
```

This will start:
- Task Manager app on `http://localhost:3000`
- MongoDB database with authentication

### Docker Services
- **taskmanager**: Next.js application
- **mongo**: MongoDB database (root/example credentials)

---

## 👨‍💻 Author
**Mostafa Mnesey**  
Frontend Developer (React.js / Next.js)  
🗓️ *2025*  
📧 [GitHub](https://github.com/your-username)

---


