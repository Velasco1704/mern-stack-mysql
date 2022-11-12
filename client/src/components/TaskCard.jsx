import React from "react";
import { useTasks } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";

export const TaskCard = ({ task }) => {
  const { tasks, deleteTask, toggleTaskDone } = useTasks();
  const navigate = useNavigate();
  const handleDone = async () => {
    await toggleTaskDone(task.id);
  };

  return (
    <div className="bg-slate-300 rounded-md p-4">
      <header className="flex justify-between">
        <h2 className="text-sm font-bold">{task.title}</h2>
        <span>{task.done === 1 ? "✔️" : "❌"}</span>
      </header>
      <p className="text-xs">{task.description}</p>
      <span className="text-sm">{task.createdAt}</span>
      <div className="flex gap-x-1">
        <button className="bg-red-500 px-2 py-2 text-white rounded-md" onClick={() => deleteTask(task.id)}>Delete</button>
        <button className="bg-slate-400 px-2 py-2 text-white rounded-md" onClick={() => navigate(`/edit/${task.id}`)}>Edit</button>
        <button className="bg-green-500 px-2 py-2 text-white rounded-md" onClick={() => handleDone(task.done)}>Toggle Task</button>
      </div>
    </div>
  );
};
