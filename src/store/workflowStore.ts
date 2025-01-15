import { create } from "zustand";
import { Operator, TaskType, WorkFlowType } from "../types";

interface WorkflowState {
  workflows: WorkFlowType[];
  curIndex: number;
  newWorkFlow: () => void;
  setCurIndex: (index: number) => void;
  addTaskToWorkflow: (taskType: string) => void;
  updateWorkflowTasks: (tasks: TaskType[]) => void;
  setWorkFlows: (workflows: WorkFlowType[]) => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  workflows: [],
  curIndex: -1,

  newWorkFlow: () =>
    set((state) => ({
      workflows: [...state.workflows, { title: "New Workflow", tasks: [] }],
    })),

  setCurIndex: (index) => set({ curIndex: index }),

  addTaskToWorkflow: (taskType) =>
    set((state) => {
      const updatedWorkflows = [...state.workflows];

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
          return { workflows: updatedWorkflows };
      }

      if (state.curIndex >= 0) {
        updatedWorkflows[state.curIndex].tasks.push(newTask);
      }
      return { workflows: updatedWorkflows };
    }),

  updateWorkflowTasks: (tasks) =>
    set((state) => {
      const updatedWorkflows = [...state.workflows];
      updatedWorkflows[state.curIndex].tasks = tasks;
      return { workflows: updatedWorkflows };
    }),

  setWorkFlows: (workflows) => set({ workflows }),
}));
