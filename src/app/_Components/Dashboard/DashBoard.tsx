"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, TextInput, Badge } from "flowbite-react";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { FiPlus, FiCheck, FiTrash2, FiEdit2 } from "react-icons/fi";

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
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to access dashboard");
      router.push("/login");
      return;
    }

    // Fetch user data
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/user-data`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data.status_code === 200) {
          setUserName(data.data.name || data.data.email || "User");
          setUserImage(data.data.image || data.data.image || "");
        }
      } catch (error) {
        const err = error as AxiosError<Error>;
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          toast.error("Session expired. Please login again.");
          router.push("/login");
          return;
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
    loadTasks();
  }, [router]);

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

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      const err = error as AxiosError<Error>;

      toast.error(
        err.response?.data?.message ||
          err.message ||
          "An error occurred. Please try again."
      );
    }
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ffffff]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BE968E] mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading...</p>
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {userImage ? (
                <Image
                  src={userImage}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#BE968E] flex items-center justify-center text-white font-bold text-xl">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Task Manager
              </h1>
              <p className="text-gray-600">Welcome back, {userName}!</p>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 focus:ring-red-300"
          >
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Total Tasks</p>
              <p className="text-3xl font-bold text-[#BE968E]">{taskStats.total}</p>
            </div>
          </Card>
          <Card className="bg-white">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-3xl font-bold text-gray-500">{taskStats.pending}</p>
            </div>
          </Card>
          <Card className="bg-white">
            <div className="text-center">
              <p className="text-gray-600 text-sm">In Progress</p>
              <p className="text-3xl font-bold text-yellow-500">{taskStats.inProgress}</p>
            </div>
          </Card>
          <Card className="bg-white">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Completed</p>
              <p className="text-3xl font-bold text-green-500">{taskStats.completed}</p>
            </div>
          </Card>
        </div>

        {/* Add Task Form */}
        <Card className="mb-8 bg-white">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h2>
          <div className="space-y-4">
            <TextInput
              placeholder="Task title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full"
            />
            <TextInput
              placeholder="Task description (optional)"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className="w-full"
            />
            <Button
              onClick={addTask}
              className="bg-[#BE968E] hover:bg-[#BE968E]/80 w-full md:w-auto"
            >
              <FiPlus className="mr-2" />
              Add Task
            </Button>
          </div>
        </Card>

        {/* Tasks List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Recent Tasks</h2>
            <Button
              onClick={() => router.push("/tasks")}
              className="bg-[#BE968E] hover:bg-[#BE968E]/80"
            >
              View All Tasks
            </Button>
          </div>
          {tasks.length === 0 ? (
            <Card className="bg-white">
              <p className="text-center text-gray-500 py-8">
                No tasks yet. Add your first task above!
              </p>
            </Card>
          ) : (
            tasks.slice(0, 5).map((task) => (
              <Card key={task.id} className="bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`text-lg font-semibold ${task.status === "completed" ? "line-through text-gray-400" : "text-gray-800"}`}>
                        {task.title}
                      </h3>
                      <Badge color={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                    </div>
                    {task.description && (
                      <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                    )}
                    <p className="text-xs text-gray-400">
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => toggleTaskStatus(task.id)}
                      className="bg-[#BE968E] hover:bg-[#BE968E]/80"
                    >
                      <FiCheck />
                    </Button>
                    <Button
                      size="sm"
                      color="failure"
                      onClick={() => deleteTask(task.id)}
                    >
                      <FiTrash2 />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
