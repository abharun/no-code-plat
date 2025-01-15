import React, { useEffect, useState } from "react";
import { withMainlayout } from "../layouts";
import { useWorkflowStore } from "../store/workflowStore";
import {
  CalculationTask,
  LogMessageTask,
  Operator,
  SendEmailTask,
  TaskType,
} from "../types";
import TaskResult from "../components/Common/TaskResult";
import { useNavigate } from "react-router-dom";

const parseCalcTask = (task: CalculationTask) => {
  switch (task.op) {
    case Operator.ADDITION:
      return { op: "+", result: task.valueA + task.valueB };
    case Operator.SUBTRACT:
      return { op: "-", result: task.valueA - task.valueB };
    case Operator.MULTIPLY:
      return { op: "*", result: task.valueA * task.valueB };
    case Operator.DIVIDE:
      return task.valueB !== 0
        ? { op: "/", result: task.valueA / task.valueB }
        : { op: "/", result: undefined };
    default:
      return undefined;
  }
};

export const ExecutePage: React.FC = withMainlayout(() => {
  const navigate = useNavigate();
  const { workflows, curIndex } = useWorkflowStore();
  const selectedWorkflow = workflows[curIndex];
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [taskResults, setTaskResults] = useState<
    { result: string; status: "success" | "failure" }[]
  >([]);

  useEffect(() => {
    if (selectedWorkflow) {
      const totalTasks = selectedWorkflow.tasks.length;

      const updateTaskResult = () => {
        if (currentTaskIndex < totalTasks) {
          const task = selectedWorkflow.tasks[currentTaskIndex];
          let result = "";
          let status: "success" | "failure" = "success";

          switch (task.type) {
            case "SendEmailTask":
              const emailTask = task.payload as SendEmailTask;
              result = `Sending mail from: ${emailTask.from} to: ${emailTask.to} with content: ${emailTask.content}`;
              break;
            case "LogMessageTask":
              const logTask = task.payload as LogMessageTask;
              result = `Log message: ${logTask.message}`;
              break;
            case "CalculationTask":
              const calcTask = task.payload as CalculationTask;
              const analyse = parseCalcTask(calcTask);
              if (analyse?.result === undefined) {
                result = `Calculating: ${calcTask.valueA} ${analyse?.op} ${calcTask.valueB} = Failure (division by zero)`;
                status = "failure";
              } else {
                result = `Calculating: ${calcTask.valueA} ${analyse?.op} ${calcTask.valueB} = ${analyse.result}`;
              }
              break;
            default:
              result = `Unknown task type: ${task.type}`;
              status = "failure";
          }

          setTaskResults((prevResults) => [...prevResults, { result, status }]);
          setCurrentTaskIndex((prevIndex) => prevIndex + 1);
        }
      };

      const intervalId = setInterval(updateTaskResult, 1000);

      return () => clearInterval(intervalId);
    }
  }, [selectedWorkflow, currentTaskIndex]);

  return (
    <div className="execute-page p-4">
      <div className="execute-title">
        <div className="flex p-4 justify-between">
          <h1 className="text-2xl font-bold mb-4">Execution</h1>
          <button className="pr-36" onClick={() => navigate("/builder")}>
            Back to Workflows
          </button>
        </div>
      </div>
      {curIndex >= 0 && workflows[curIndex] && (
        <div>
          <h2 className="workflow-title p-4">
            Executing <b>{workflows[curIndex].title}</b> ...
          </h2>
          <div className="task-results p-4">
            {taskResults.map((taskResult, index) => (
              <TaskResult
                key={index}
                taskType={`Task ${index + 1}`}
                result={taskResult.result}
                status={taskResult.status}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
