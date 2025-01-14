import React from "react";
import { withMainlayout } from "../layouts";
import { WorkflowCard } from "../components/Common";

export const Dashboard: React.FC = withMainlayout(() => {
  const handleCreateWorkflow = () => {
    // Handle new workflow creation
    console.log("Creating new workflow");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Workflows</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <WorkflowCard 
          title="API Workflow"
          description="New API workflow..."
        />
        <WorkflowCard 
          title="Add Workflow"
          description="Click here to add a backend workflow..."
          isPlaceholder={true}
          onClick={handleCreateWorkflow}
        />
      </div>
    </div>
  );
});
