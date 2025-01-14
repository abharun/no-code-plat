import React, { useState } from "react";
import { TaskCard, CloseButton, SaveButton, TaskSelector } from "../Common";
import { WorkFlowType } from "../../types";

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

  return (
    <>
      <div className="w-96 h-[calc(100vh-112px)] fixed right-0 top-[112px] bg-white border-l shadow-lg flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{workflow.title}</h2>
          <CloseButton onClick={onClose} />
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
