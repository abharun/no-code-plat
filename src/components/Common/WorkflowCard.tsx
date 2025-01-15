interface WorkflowCardProps {
  title: string;
  description?: string;
  onClick?: () => void;
  onExecute?: () => void;
  isPlaceholder?: boolean;
}

export const WorkflowCard: React.FC<WorkflowCardProps> = ({
  title,
  description,
  onClick,
  onExecute,
  isPlaceholder = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        p-4 rounded-lg cursor-pointer
        aspect-square
        w-48
        flex flex-col
        ${
          isPlaceholder
            ? "border-2 border-dashed border-gray-300 hover:border-gray-400"
            : "bg-gray-200 hover:bg-gray-300"
        }
      `}
    >
      <h3 className="font-semibold">{title}</h3>
      {description && <p className="text-sm text-gray-600">{description}</p>}
      {onExecute && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onExecute();
          }}
          className="mt-24 bg-blue-500 text-white py-1 px-3 rounded"
        >
          Execute
        </button>
      )}
    </div>
  );
};
