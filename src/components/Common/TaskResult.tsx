import React from "react";

interface TaskResultProps {
  taskType: string;
  result: string;
  status: "success" | "failure"; // Add status prop
}

const TaskResult: React.FC<TaskResultProps> = ({
  taskType,
  result,
  status,
}) => {
  return (
    <div className="task-result p-2">
      <strong>{taskType}: </strong> {result}
      {status === "success" ? (
        <span
          role="img"
          aria-label="success"
          style={{ marginLeft: "10px", color: "green" }}
        >
          ✅
        </span> // Success icon
      ) : (
        <span
          role="img"
          aria-label="failure"
          style={{ marginLeft: "10px", color: "red" }}
        >
          ❌
        </span> // Failure icon
      )}
    </div>
  );
};

export default TaskResult;
