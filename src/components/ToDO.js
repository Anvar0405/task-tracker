import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";

import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";

export default function ToDo({ task, index, taskList, setTaskList }) {
  const [time, setTime] = useState(task.duration);
  const [running, setRunning] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo",
    item: {
      id: index,
      projectName: task.projectName,
      taskDescription: task.taskDescription,
      timestamp: task.timestamp,
      duration: task.duration,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const handleStop = function () {
    setRunning(false);

    let taskIndex = taskList.indexOf(task);
    taskList.splice(taskIndex, 1, {
      projectName: task.projectName,
      taskDescription: task.taskDescription,
      timestamp: task.timestamp,
      duration: time,
    });

    localStorage.setItem("taskList", JSON.stringify(taskList));
    window.location.reload();
  };

  return (
    <>
      <div
        className="flex flex-col items-start justify-start bg-white my-t ml-6 py-4 px-6 w-3/4 max-w-lg mb-4"
        ref={drag}
      >
        <div className="w-full flex flex-row justify-between">
          <p className="font-semibold text-xl">{task.projectName}</p>
          <EditTask
            task={task}
            index={index}
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </div>
        <p className="text-lg py-2">{task.taskDescription}</p>
        <div className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-evenly">
          <div className="sm:w-1/4 text-xl font-semibold py-4">
            <span>{("0" + Math.floor((time / 3600000) % 24)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
            <span className="text-sm">
              :{("0" + ((time / 10) % 100)).slice(-2)}
            </span>
          </div>
          <div className="w-1/3 max-w-sm flex flex-row justify-evenly gap-4">
            {running ? (
              <button
                onClick={handleStop}
                className="border rounded-lg py-1 px-3"
              >
                Stop
              </button>
            ) : (
              <button
                onClick={() => setRunning(true)}
                className="border rounded-lg py-1 px-3"
              >
                Start
              </button>
            )}
            <button
              onClick={() => setTime(0)}
              className="border rounded-lg py-1 px-3"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <DeleteTask
            task={task}
            index={index}
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </div>
      </div>
    </>
  );
}
