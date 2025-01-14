import { TaskType } from "../../types";

interface TaskCardProps {
  task: TaskType | null;
  onClick?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const getTaskIcon = (type: string) => {
    switch (type) {
      case "CalculationTask":
        return "🔢";
      case "LogMessageTask":
        return "📝";
      case "SendEmailTask":
        return "📧";
      default:
        return "❓";
    }
  };

  return task ? (
    <div
      onClick={onClick}
      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <span>{getTaskIcon(task.type)}</span>
        <span className="font-medium">{task.type}</span>
      </div>
    </div>
  ) : (
    <div
      onClick={onClick}
      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer border-2 border-dashed border-gray-300"
    >
      <div className="flex items-center gap-2 justify-center text-gray-500">
        <span>➕</span>
        <span className="font-medium">Add New Task</span>
      </div>
    </div>
  );
};
