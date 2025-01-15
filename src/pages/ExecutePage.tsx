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
        : undefined;
    default:
      return undefined;
  }
};

export const ExecutePage: React.FC = withMainlayout(() => {
  const { workflows, curIndex } = useWorkflowStore();
  const selectedWorkflow = workflows[curIndex];
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [taskResults, setTaskResults] = useState<string[]>([]);

  useEffect(() => {
    if (selectedWorkflow) {
      const totalTasks = selectedWorkflow.tasks.length;

      const updateTaskResult = () => {
        if (currentTaskIndex < totalTasks) {
          const task = selectedWorkflow.tasks[currentTaskIndex];
          let result = "";

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
              result = `Calculating: ${calcTask.valueA} ${analyse?.op} ${calcTask.valueB} = ${analyse?.result}`;
              break;
            default:
              result = `Unknown task type: ${task.type}`;
          }

          setTaskResults((prevResults) => [...prevResults, result]);
          setCurrentTaskIndex((prevIndex) => prevIndex + 1);
        }
      };

      const intervalId = setInterval(updateTaskResult, 1000);

      return () => clearInterval(intervalId);
    }
  }, [selectedWorkflow, currentTaskIndex]);

  return (
    <div className="execute-page p-4">
      <h1 className="text-2xl p-4 font-bold mb-4">Execution</h1>
      {curIndex >= 0 && workflows[curIndex] && (
        <div>
          <h2 className="workflow-title p-4">
            Executing: {workflows[curIndex].title}
          </h2>
          <div className="task-results">
            {taskResults.map((result, index) => (
              <TaskResult
                key={index}
                taskType={`Task ${index + 1}`}
                result={result}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
