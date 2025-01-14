import { useState } from "react";
import { WorkFlowType, TaskType, Operator } from "../types";

export const useWorkFlow = () => {
  const [curIndex, setCurIndex] = useState<number>(0);
  const [workflows, setWorkFlows] = useState<WorkFlowType[]>([]);

  const newWorkFlow = () => {
    const newFlow: WorkFlowType = {
      title: "WorkFlow",
      tasks: [],
    };
    setCurIndex(workflows.length);
    setWorkFlows((prev) => [...prev, newFlow]);
  };

  const addTaskToWorkflow = (taskType: string) => {
    let newTask: TaskType | null = null;

    switch (taskType) {
      case "SendEmail":
        newTask = {
          type: "SendEmailTask",
          payload: {
            from: "",
            to: "",
            content: "",
          },
        } as TaskType;
        break;
      case "LogMessage":
        newTask = {
          type: "LogMessageTask",
          payload: {
            message: "",
          },
        } as TaskType;
        break;
      case "Calculation":
        newTask = {
          type: "CalculationTask",
          payload: {
            valueA: 0,
            valueB: 0,
            op: Operator.ADDITION,
          },
        } as TaskType;
        break;
      default:
        console.log("Invalid Task!");
        break;
    }

    if (newTask) {
      setWorkFlows((prevWorkflows) => {
        const newWorkflows = [...prevWorkflows];
        newWorkflows[curIndex] = {
          ...newWorkflows[curIndex],
          tasks: [...newWorkflows[curIndex].tasks, newTask as TaskType],
        };
        return newWorkflows;
      });
    }
  };

  return {
    setCurIndex,
    curIndex,
    workflows,
    newWorkFlow,
    addTaskToWorkflow,
  };
};
