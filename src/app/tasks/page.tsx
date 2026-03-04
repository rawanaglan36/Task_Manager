import React from "react";
import TasksPage from "../_Components/Tasks/Tasks";

export const metadata = {
  title: "Tasks | Task Manager",
  description: "Manage your tasks efficiently",
};

export default function page() {
  return (
    <>
      <TasksPage />
    </>
  );
}
