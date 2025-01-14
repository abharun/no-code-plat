import React, { useState } from "react";
import { TaskCard, CloseButton, SaveButton } from "../Common";
import { WorkFlowType, TaskType } from "../../types";
import { TaskSelector } from "./TaskSelector";

const DownArrow: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="down-arrow"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
};

interface WorkflowSidebarProps {
  workflow: WorkFlowType;
  onClose: () => void;
  onAddTask: (taskType: string) => void;
  onTasksUpdate: (tasks: TaskType[]) => void;
  onUpdateTitle: (title: string) => void;
}

export const WorkflowSidebar: React.FC<WorkflowSidebarProps> = ({
  workflow,
  onClose,
  onAddTask,
  onTasksUpdate,
  onUpdateTitle,
}) => {
  const [showTaskSelector, setShowTaskSelector] = useState(false);
  const [title, setTitle] = useState(workflow.title);

  const handleTaskUpdate = (updatedTask: TaskType, index: number) => {
    const updatedTasks = [...workflow.tasks];
    updatedTasks[index] = updatedTask;
    onTasksUpdate?.(updatedTasks);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleClose = () => {
    onUpdateTitle(title);
    onClose();
  };

  return (
    <>
      <div className="w-96 h-[calc(100vh-112px)] fixed right-0 top-[112px] bg-white border-l shadow-lg flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="text-xl font-bold border-none outline-none w-full"
          />
          <CloseButton onClick={handleClose} />
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {workflow.tasks?.map((task: TaskType, index: number) => (
            <>
              <div key={index} className="mb-2">
                <TaskCard
                  task={task}
                  onTaskUpdate={(updatedTask) =>
                    handleTaskUpdate(updatedTask, index)
                  }
                />
              </div>
              <div className="flex justify-center mb-2">
                <DownArrow />
              </div>
            </>
          ))}
          <div className="mb-2">
            <TaskCard task={null} onClick={() => setShowTaskSelector(true)} />
          </div>
        </div>

        <div className="p-4 border-t">
          <SaveButton onClick={handleClose} />
        </div>
      </div>

      {showTaskSelector && (
        <TaskSelector
          onSelect={onAddTask}
          onClose={() => setShowTaskSelector(false)}
        />
      )}
    </>
  );
};
