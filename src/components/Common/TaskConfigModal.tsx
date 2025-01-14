import React, { useState } from "react";
import { TaskType, Operator } from "../../types";
import { CloseButton } from "./CloseBtn";

interface TaskConfigModalProps {
  task: TaskType;
  onClose: () => void;
  onSave: (updatedTask: TaskType) => void;
}

export const TaskConfigModal: React.FC<TaskConfigModalProps> = ({
  task,
  onClose,
  onSave,
}) => {
  const [configuredTask, setConfiguredTask] = useState<TaskType>(task);

  const renderFields = () => {
    switch (task.type) {
      case "SendEmailTask":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">From</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={(configuredTask.payload as any).from}
                onChange={(e) =>
                  setConfiguredTask({
                    ...configuredTask,
                    payload: {
                      ...configuredTask.payload,
                      from: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">To</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={(configuredTask.payload as any).to}
                onChange={(e) =>
                  setConfiguredTask({
                    ...configuredTask,
                    payload: {
                      ...configuredTask.payload,
                      to: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                className="w-full p-2 border rounded"
                value={(configuredTask.payload as any).content}
                onChange={(e) =>
                  setConfiguredTask({
                    ...configuredTask,
                    payload: {
                      ...configuredTask.payload,
                      content: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        );

      case "LogMessageTask":
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              className="w-full p-2 border rounded"
              value={(configuredTask.payload as any).message}
              onChange={(e) =>
                setConfiguredTask({
                  ...configuredTask,
                  payload: {
                    ...configuredTask.payload,
                    message: e.target.value,
                  },
                })
              }
            />
          </div>
        );

      case "CalculationTask":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Value A</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={(configuredTask.payload as any).valueA}
                onChange={(e) =>
                  setConfiguredTask({
                    ...configuredTask,
                    payload: {
                      ...configuredTask.payload,
                      valueA: Number(e.target.value),
                    },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Operator</label>
              <select
                className="w-full p-2 border rounded"
                value={(configuredTask.payload as any).op}
                onChange={(e) =>
                  setConfiguredTask({
                    ...configuredTask,
                    payload: {
                      ...configuredTask.payload,
                      op: e.target.value as Operator,
                    },
                  })
                }
              >
                <option value={Operator.ADDITION}>Add</option>
                <option value={Operator.SUBTRACT}>Subtract</option>
                <option value={Operator.MULTIPLY}>Multiply</option>
                <option value={Operator.DIVIDE}>Divide</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Value B</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={(configuredTask.payload as any).valueB}
                onChange={(e) =>
                  setConfiguredTask({
                    ...configuredTask,
                    payload: {
                      ...configuredTask.payload,
                      valueB: Number(e.target.value),
                    },
                  })
                }
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Configure Task</h3>
          <CloseButton onClick={onClose} />
        </div>
        <div className="mb-6">{renderFields()}</div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => onSave(configuredTask)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}; 