export default function DeleteTask({ task, index, taskList, setTaskList }) {
  const handleDelete = function (itemID) {
    let removeIndex = taskList.indexOf(task);
    taskList.splice(removeIndex, 1);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    window.location.reload();

    // setTaskList((taskList) => taskList.filter((task) => itemID.id !== itemID));
  };

  return (
    <>
      <button
        className="bg-red-500 text-white text-sm uppercase font-semibold py-1.5 px-3 mt-6 mb-1 rounded-lg"
        onClick={handleDelete}
      >
        DELETE
      </button>
    </>
  );
}
