import React, { useEffect } from "react";
import { TaskCard } from "../components/TaskCard";
import { useTasks } from "../context/TaskContext";

export const TasksPage = () => {
  const { tasks, loadTasks } = useTasks();
  useEffect(() => {
    loadTasks();
  }, []);

  function renderMain() {
    if (tasks.length === 0) return <h1>No tasks yet</h1>;
    return tasks.map((task) => <TaskCard key={task.id} task={task} />);
  }

  return (
    <div>
      <h1 className="text-5xl text-white font-bold text-center pb-2">Tasks</h1>
      <div className="grid grid-cols-3 gap-3">{renderMain()}</div>
    </div>
  );
};
