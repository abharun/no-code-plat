import React from "react";
import { withMainlayout } from "../layouts";
import { WorkflowCard } from "../components/Common";
import { useWorkFlow } from "../hooks";

export const Dashboard: React.FC = withMainlayout(() => {
  const workflow = useWorkFlow();

  const handleCreateWorkflow = () => {
    workflow.newWorkFlow();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl p-4 font-bold mb-4">Workflows</h1>
      <div className="grid grid-cols-5 auto-rows-auto gap-4 place-items-center">
        {workflow.workflows.map((wf) => (
          <WorkflowCard title={wf.title} />
        ))}
        <WorkflowCard
          title="Add Workflow"
          description="Click here to add a new workflow..."
          isPlaceholder={true}
          onClick={handleCreateWorkflow}
        />
      </div>
    </div>
  );
});
