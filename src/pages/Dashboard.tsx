import React from "react";
import { withMainlayout } from "../layouts";
import { WorkflowCard } from "../components/Common";
import { useWorkFlow } from "../hooks";
import { WorkflowSidebar } from "../components/Views";
import { WorkFlowType } from "../types";

export const Dashboard: React.FC = withMainlayout(() => {
  const workflow = useWorkFlow();
  const selectedWorkflow = workflow.workflows[workflow.curIndex] || null;

  const handleCreateWorkflow = () => {
    workflow.newWorkFlow();
  };

  const handleWorkflowClick = (index: number) => {
    workflow.setCurIndex(index);
  };

  const handleSave = () => {};

  const handleAddTask = (taskType: string) => {
    workflow.addTaskToWorkflow(taskType);
  };

  return (
    <div className="flex">
      <div className={`flex-1 p-4 ${selectedWorkflow ? "mr-96" : ""}`}>
        <h1 className="text-2xl p-4 font-bold mb-4">Workflows</h1>
        <div className="grid grid-cols-5 auto-rows-auto gap-4 place-items-center">
          {workflow.workflows.map((wf, index) => (
            <WorkflowCard
              key={index}
              title={wf.title}
              onClick={() => handleWorkflowClick(index)}
            />
          ))}
          <WorkflowCard
            title="Add Workflow"
            description="Click here to add a new workflow..."
            isPlaceholder={true}
            onClick={handleCreateWorkflow}
          />
        </div>
      </div>

      {selectedWorkflow && (
        <WorkflowSidebar
          workflow={selectedWorkflow}
          onClose={() => workflow.setCurIndex(-1)}
          onSave={handleSave}
          onAddTask={handleAddTask}
        />
      )}
    </div>
  );
});
