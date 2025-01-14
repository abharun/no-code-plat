import React, { useState } from "react";
import { TaskType } from "../../types";
import { TaskConfigModal } from "./TaskConfigModal";

interface TaskCardProps {
  task: TaskType | null;
  onClick?: () => void;
  onTaskUpdate?: (task: TaskType) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick, onTaskUpdate }) => {
  const [showConfig, setShowConfig] = useState(false);

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "CalculationTask":
        return "🔢";
      case "LogMessageTask":
        return "📝";
      case "SendEmailTask":
        return "📧";
      default:
        return "❓";
    }
  };

  const handleTaskClick = () => {
    if (task) {
      setShowConfig(true);
    } else {
      onClick?.();
    }
  };

  return (
    <>
      {task ? (
        <div
          onClick={handleTaskClick}
          className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span>{getTaskIcon(task.type)}</span>
            <span className="font-medium">{task.type}</span>
          </div>
        </div>
      ) : (
        <div
          onClick={handleTaskClick}
          className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer border-2 border-dashed border-gray-300"
        >
          <div className="flex items-center gap-2 justify-center text-gray-500">
            <span>➕</span>
            <span className="font-medium">Add New Task</span>
          </div>
        </div>
      )}

      {showConfig && task && (
        <TaskConfigModal
          task={task}
          onClose={() => setShowConfig(false)}
          onSave={(updatedTask) => {
            onTaskUpdate?.(updatedTask);
            setShowConfig(false);
          }}
        />
      )}
    </>
  );
};
