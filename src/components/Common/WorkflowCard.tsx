interface WorkflowCardProps {
  title: string;
  description?: string;
  onClick?: () => void;
  isPlaceholder?: boolean;
}

export const WorkflowCard: React.FC<WorkflowCardProps> = ({
  title,
  description,
  onClick,
  isPlaceholder = false,
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        p-4 rounded-lg cursor-pointer
        ${isPlaceholder 
          ? 'border-2 border-dashed border-gray-300 hover:border-gray-400' 
          : 'bg-gray-200 hover:bg-gray-300'}
      `}
    >
      <h3 className="font-semibold">{title}</h3>
      {description && <p className="text-sm text-gray-600">{description}</p>}
    </div>
  );
}; 