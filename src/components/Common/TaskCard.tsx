import { TaskType } from '../../types';

interface TaskCardProps {
  task: TaskType;
  onClick?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'CalcTask': return '🔢';
      case 'LogMsgTask': return '📝';
      case 'SendEmailTask': return '📧';
      default: return '❓';
    }
  };

  return (
    <div
      onClick={onClick}
      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <span>{getTaskIcon(task.type)}</span>
        <span className="font-medium">{task.type}</span>
      </div>
    </div>
  );
}; 