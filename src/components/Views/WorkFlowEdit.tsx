import React, { useState } from "react";
import { TaskCard, CloseButton, SaveButton } from "../Common";
import { WorkFlowType } from "../../types";
import { TaskSelector } from "./TaskSelector";

interface WorkflowSidebarProps {
  workflow: WorkFlowType;
  onClose: () => void;
  onSave: () => void;
  onAddTask: (taskType: string) => void;
}

export const WorkflowSidebar: React.FC<WorkflowSidebarProps> = ({
  workflow,
  onClose,
  onSave,
  onAddTask,
}) => {
  const [showTaskSelector, setShowTaskSelector] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  return (
    <>
      <div
        className={`
          fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300
          ${isClosing ? "opacity-0" : "opacity-100"}
        `}
        onClick={handleClose}
      />
      <div
        className={`
          w-96 h-[calc(100vh-112px)] fixed right-0 top-[112px] 
          bg-white border-l shadow-lg flex flex-col
          transition-transform duration-300 ease-in-out
          ${isClosing ? "translate-x-full" : "translate-x-0"}
        `}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{workflow.title}</h2>
          <CloseButton onClick={handleClose} />
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {workflow.tasks?.map((task: any, index: number) => (
            <div key={index} className="mb-2">
              <TaskCard task={task} />
            </div>
          ))}
          <div className="mb-2">
            <TaskCard task={null} onClick={() => setShowTaskSelector(true)} />
          </div>
        </div>
        <div className="p-4 border-t">
          <SaveButton onClick={onSave} />
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
