"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, TextInput, Badge, Select } from "flowbite-react";
import { toast } from "react-hot-toast";
import { FiPlus, FiCheck, FiTrash2, FiArrowLeft } from "react-icons/fi";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  createdAt: string;
}

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<Task["priority"]>("medium");
  const [filterStatus, setFilterStatus] = useState<"all" | Task["status"]>("all");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to access tasks");
      router.push("/login");
      return;
    }
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
      priority: newTaskPriority,
      createdAt: new Date().toISOString(),
    };

    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskPriority("medium");
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

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "failure";
      case "medium":
        return "warning";
      default:
        return "info";
    }
  };

  const filteredTasks = filterStatus === "all" 
    ? tasks 
    : tasks.filter(task => task.status === filterStatus);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">All Tasks</h1>
            <p className="text-gray-600">Manage and organize your tasks</p>
          </div>
          <Button
            onClick={() => router.push("/dashboard")}
            className="bg-[#BE968E] hover:bg-[#BE968E]/80"
          >
            <FiArrowLeft className="mr-2" />
            Back to Dashboard
          </Button>
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
            <div className="flex gap-4">
              <Select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as Task["priority"])}
                className="w-full md:w-48"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </Select>
              <Button
                onClick={addTask}
                className="bg-[#BE968E] hover:bg-[#BE968E]/80 w-full md:w-auto"
              >
                <FiPlus className="mr-2" />
                Add Task
              </Button>
            </div>
          </div>
        </Card>

        {/* Filter */}
        <div className="mb-6">
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
            className="w-full md:w-64"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </Select>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <Card className="bg-white">
              <p className="text-center text-gray-500 py-8">
                {filterStatus === "all" 
                  ? "No tasks yet. Add your first task above!" 
                  : `No ${filterStatus} tasks found.`}
              </p>
            </Card>
          ) : (
            filteredTasks.map((task) => (
              <Card key={task.id} className="bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className={`text-lg font-semibold ${task.status === "completed" ? "line-through text-gray-400" : "text-gray-800"}`}>
                        {task.title}
                      </h3>
                      <Badge color={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                      <Badge color={getPriorityColor(task.priority)}>
                        {task.priority}
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
                      title="Change status"
                    >
                      <FiCheck />
                    </Button>
                    <Button
                      size="sm"
                      color="failure"
                      onClick={() => deleteTask(task.id)}
                      title="Delete task"
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
