import React from "react";
import { withMainlayout } from "../layouts";
import { WorkflowCard } from "../components/Common";
import { useWorkflowStore } from "../store/workflowStore";
import { WorkflowSidebar } from "../components/Views";
import { useNavigate } from "react-router-dom";

export const Dashboard: React.FC = withMainlayout(() => {
  const navigate = useNavigate();
  const { workflows, curIndex, newWorkFlow, setCurIndex, addTaskToWorkflow, setWorkFlows, updateWorkflowTasks } = useWorkflowStore();
  const selectedWorkflow = workflows[curIndex] || null;

  const handleUpdateTitle = (newTitle: string) => {
    if (selectedWorkflow) {
      const updatedWorkflows = [...workflows];
      updatedWorkflows[curIndex] = {
        ...selectedWorkflow,
        title: newTitle,
      };
      setWorkFlows(updatedWorkflows);
    }
  };

  const handleExecuteWorkflow = (index: number) => {
    setCurIndex(index);
    navigate("/execution-log");
  };

  return (
    <div className="flex">
      <div className={`flex-1 p-4 ${selectedWorkflow ? "mr-96" : "mr-0"}`}>
        <h1 className="text-2xl p-4 font-bold mb-4">Workflows</h1>
        <div className="grid grid-cols-7 auto-rows-auto gap-4 place-items-center">
          {workflows.map((wf, index) => (
            <WorkflowCard
              key={index}
              title={wf.title}
              onClick={() => setCurIndex(index)}
              onExecute={() => handleExecuteWorkflow(index)}
            />
          ))}
          <WorkflowCard
            title="Add Workflow"
            description="Click here to add a new workflow..."
            isPlaceholder={true}
            onClick={newWorkFlow}
          />
        </div>
      </div>

      {selectedWorkflow && (
        <WorkflowSidebar
          workflow={selectedWorkflow}
          onClose={() => setCurIndex(-1)}
          onAddTask={addTaskToWorkflow}
          onTasksUpdate={updateWorkflowTasks}
          onUpdateTitle={handleUpdateTitle}
        />
      )}
    </div>
  );
});
