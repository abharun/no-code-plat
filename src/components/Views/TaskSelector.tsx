import React from "react";

interface TaskSelectorProps {
  onSelect: (taskType: string) => void;
  onClose: () => void;
}

export const TaskSelector: React.FC<TaskSelectorProps> = ({
  onSelect,
  onClose,
}) => {
  const taskTypes = [
    { id: "SendEmail", label: "Send Email", icon: "📧" },
    { id: "LogMessage", label: "Log Message", icon: "📝" },
    { id: "Calculation", label: "Calculation", icon: "🔢" },
  ];

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 w-80">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Select Task Type</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="space-y-2">
          {taskTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => {
                onSelect(type.id);
                onClose();
              }}
              className="w-full p-3 text-left flex items-center gap-2 hover:bg-gray-50 rounded-lg"
            >
              <span>{type.icon}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
