"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FiPlus, FiCheck, FiTrash2 } from "react-icons/fi";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [userName] = useState("User");
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  };

  const saveTasks = (updatedTasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDescription,
      status: "pending",
      priority: "medium",
      createdAt: new Date().toISOString(),
    };

    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);
    setNewTaskTitle("");
    setNewTaskDescription("");
    toast.success("Task added successfully");
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    saveTasks(updatedTasks);
    toast.success("Task deleted");
  };

  const toggleTaskStatus = (id: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const statusOrder: Task["status"][] = ["pending", "in-progress", "completed"];
        const currentIndex = statusOrder.indexOf(task.status);
        const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
        return { ...task, status: nextStatus };
      }
      return task;
    });
    saveTasks(updatedTasks);
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "success";
      case "in-progress":
        return "warning";
      default:
        return "gray";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    pending: tasks.filter((t) => t.status === "pending").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Task Manager
              </h1>
              <p className="text-gray-400">Welcome back, {userName}!</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">Total Tasks</p>
              <p className="text-4xl font-bold text-blue-400">{taskStats.total}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-500/10 to-gray-600/10 backdrop-blur-sm rounded-xl p-6 border border-gray-500/20 hover:border-gray-500/40 transition-all">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">Pending</p>
              <p className="text-4xl font-bold text-gray-400">{taskStats.pending}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-600/10 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/20 hover:border-yellow-500/40 transition-all">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">In Progress</p>
              <p className="text-4xl font-bold text-yellow-400">{taskStats.inProgress}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">Completed</p>
              <p className="text-4xl font-bold text-green-400">{taskStats.completed}</p>
            </div>
          </div>
        </div>

        {/* Add Task Form */}
        <div className="mb-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></span>
            Add New Task
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Task title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            <textarea
              placeholder="Task description (optional)"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              rows={3}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            />
            <button
              onClick={addTask}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-500/50"
            >
              <FiPlus size={20} />
              Add Task
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white flex items-center">
              <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-3"></span>
              Recent Tasks
            </h2>
            <button
              onClick={() => router.push("/tasks")}
              className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-xl border border-gray-700 transition-all"
            >
              View All Tasks
            </button>
          </div>
          {tasks.length === 0 ? (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 text-center">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-400 text-lg">
                No tasks yet. Add your first task above!
              </p>
            </div>
          ) : (
            tasks.slice(0, 5).map((task) => (
              <div key={task.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className={`text-xl font-semibold ${task.status === "completed" ? "line-through text-gray-500" : "text-white"}`}>
                        {task.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        task.status === "completed" 
                          ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                          : task.status === "in-progress"
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                      }`}>
                        {task.status}
                      </span>
                    </div>
                    {task.description && (
                      <p className="text-gray-400 text-sm mb-3">{task.description}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all"
                      title="Change status"
                    >
                      <FiCheck size={18} />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-all"
                      title="Delete task"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
