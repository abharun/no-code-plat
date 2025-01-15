import React from "react";
import { withMainlayout } from "../layouts";
import { useWorkflowStore } from "../store/workflowStore";

export const ExecutePage: React.FC = withMainlayout(() => {
  const { workflows, curIndex } = useWorkflowStore();

  return (
    <>
      <h1>Execution Page</h1>
      {curIndex >= 0 && workflows[curIndex] && (
        <div>
          <h2>Executing: {workflows[curIndex].title}</h2>
          {/* Display tasks or other information related to the workflow */}
        </div>
      )}
    </>
  );
});
