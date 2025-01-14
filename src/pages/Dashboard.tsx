import React from "react";
import { withMainlayout } from "../layouts";
import { WorkflowCard, TaskCard } from "../components/Common";
import { useWorkFlow } from "../hooks";

export const Dashboard: React.FC = withMainlayout(() => {
  const workflow = useWorkFlow();
  const [selectedWorkflow, setSelectedWorkflow] = React.useState<any>(null);

  const handleCreateWorkflow = () => {
    workflow.newWorkFlow();
  };

  const handleWorkflowClick = (wf: any) => {
    setSelectedWorkflow(wf);
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
        {/* Sidebar */}
        {selectedWorkflow && (
          <div className="w-96 h-[calc(100vh-112px)] fixed right-0 top-[112px] bg-white border-l shadow-lg flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">{selectedWorkflow.title}</h2>
              <button
                onClick={() => setSelectedWorkflow(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {selectedWorkflow.tasks?.map((task: any) => (
                <div key={task.id} className="mb-2">
                  <TaskCard task={task} />
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={() => {
                  /* Add save handler */
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
