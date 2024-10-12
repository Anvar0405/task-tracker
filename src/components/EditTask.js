import { useState, useEffect } from "react";

export default function EditTask({ task, index, taskList, setTaskList }) {
  const [editModal, setEditModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    setProjectName(task.projectName);
    setTaskDescription(task.taskDescription);
  }, []);

  const handleUpdate = function (e) {
    e.preventDefault();
    let taskIndex = taskList.indexOf(task);
    taskList.splice(taskIndex, 1, {
      projectName: projectName,
      taskDescription: taskDescription,
      timestamp: task.timestamp,
      duration: task.duration,
    });

    localStorage.setItem("taskList", JSON.stringify(taskList));
    window.location.reload();

    // setTaskList([...taskList, { projectName, taskDescription }]);

    setEditModal(false);
    setProjectName("");
    setTaskDescription("");
  };

  const handleInput = function (e) {
    const { name, value } = e.target;

    if (name === "projectName") setProjectName(value);
    if (name === "taskDescription") setTaskDescription(value);
  };

  return (
    <>
      <button
        className="bg-gray-400 text-white text-sm-uppercase font-semibold py-1.5 px-3 rounded-lg"
        onClick={() => setEditModal(true)}
      >
        Edit
      </button>
      {editModal ? (
        <>
          <>
            <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100">
              <div className="w-9/12 max-w-lg bg-white rounded-lg shadow-md relative flex flex-col">
                <div className="flex flex-row justify-between p-5 border-b border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Task</h3>
                  <button
                    className="px-1 text-gray-400 float-right text-3xl leading-none font-semibold block hover:text-red-500"
                    onClick={() => setEditModal(false)}
                  >
                    X
                  </button>
                </div>
                <form className="p-6 pb-6 pt-4">
                  <div>
                    <label
                      className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                      htmlFor="project-name"
                    >
                      Project Name
                    </label>
                    <input
                      className="w-full bg-gray-200 text-gray-700 border border-grey-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                      id="project-name"
                      type="text"
                      placeholder="Project name"
                      name="projectName"
                      value={projectName}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                      htmlFor="task-description"
                    >
                      Task Description
                    </label>
                    <textarea
                      className="w-full bg-gray-200 text-gray-700 border border-grey-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                      id="task-description"
                      name="taskDescription"
                      rows={4}
                      placeholder="Task description"
                      value={taskDescription}
                      onChange={handleInput}
                    />
                  </div>
                </form>
                <div className="flex justify-end p-6 border-t border-slate-200 rounded-b">
                  <button
                    className="bg-blue-500 text-white font-semibold uppercase text-sm px-6 py-3 rounded hover:opacity-70"
                    onClick={handleUpdate}
                  >
                    Edit Task
                  </button>
                </div>
              </div>
            </div>
          </>
        </>
      ) : null}
    </>
  );
}
