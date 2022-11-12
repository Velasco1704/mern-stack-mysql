import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useTasks } from "../context/TaskContext";
import { useParams, useNavigate } from "react-router-dom";

export const TasksForm = () => {
  const navigate = useNavigate();
  const { createTask, getTask, updateTask } = useTasks();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const params = useParams();

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = getTask(params.id);
        setTask({
          title: task.title,
          description: task.description,
        });
      }
    };
    loadTask();
  }, []);

  return (
    <div>
      <Formik
        initialValues={task}
        // enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log(values);
          if (params.id) {
            await updateTask(params.id, values);
          } else {
            await createTask(values);
          }
          setTask({
            title: "",
            description: "",
          });
          navigate("/");
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-slate-300 max-w-sm rounded-md p-4 mt-10 mx-auto"
          >
            <h1 className="text-xl font-bold uppercase text-center">
              {params.id ? "Edit Task" : "New Task"}
            </h1>

            <label className="block">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Write a title"
              className="px-1 py-1 rounded-md w-full"
              onChange={handleChange}
              value={values.title}
            />
            <label className="block">Description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Write a description"
              className="px-1 py-1 rounded-md w-full"
              onChange={handleChange}
              value={values.description}
            ></textarea>
            <button
              type="submit"
              disabled={
                isSubmitting || values.title === "" || values.description === ""
              }
              className="block bg-indigo-500 px-2 py-1 my-1 text-white rounded-md w-full"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => navigate("/")}
              className="block bg-red-500 px-2 py-1 my-1 text-white rounded-md w-full"
            >
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
