import React from "react";

interface TaskResultProps {
  taskType: string;
  result: string;
}

const TaskResult: React.FC<TaskResultProps> = ({ taskType, result }) => {
  return (
    <div className="task-result p-4">
      <strong>{taskType}:</strong> {result}
    </div>
  );
};

export default TaskResult;
