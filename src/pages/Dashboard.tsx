import React from "react";
import { withMainlayout } from "../layouts";
import { WorkflowCard } from "../components/Common";
import { useWorkFlow } from "../hooks";
import { WorkflowSidebar } from "../components/Views";

export const Dashboard: React.FC = withMainlayout(() => {
  const workflow = useWorkFlow();
  const [selectedWorkflow, setSelectedWorkflow] = React.useState<any>(null);

  const handleCreateWorkflow = () => {
    workflow.newWorkFlow();
  };

  const handleWorkflowClick = (wf: any) => {
    setSelectedWorkflow(wf);
  };

  const handleSave = () => {
    // Add save handler
  };

  return (
    <div className="flex">
      <div className={`flex-1 p-4 ${selectedWorkflow ? 'mr-96' : ''}`}>
        <h1 className="text-2xl p-4 font-bold mb-4">Workflows</h1>
        <div className="grid grid-cols-5 auto-rows-auto gap-4 place-items-center">
          {workflow.workflows.map((wf) => (
            <WorkflowCard
              title={wf.title}
              onClick={() => handleWorkflowClick(wf)}
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
          onClose={() => setSelectedWorkflow(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
});
