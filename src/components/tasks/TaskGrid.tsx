"use client";
import { Task } from "@/types/task";
import { FiShare2 } from "react-icons/fi";
import { formatDate } from "@/lib/formatDate";

interface TaskGridProps {
  tasks: Task[];
  onSelect: (task: Task) => void;
}

export default function TaskGrid({ tasks, onSelect }: TaskGridProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No tasks yet. Create one!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {tasks.map((task) => {
        const hasTitle = !!task.title?.trim();
        const hasContent = !!task.content?.trim();

        const displayTitle = hasTitle
          ? task.title
          : hasContent
          ? task.content?.substring(0, 50)
          : "Untitled";

        const displayContent = hasTitle && hasContent ? task.content : "";

        const formattedDateTime = formatDate(task.updated_at || task.created_at);

        return (
          <div
            key={task.todo_id}
            onClick={() => onSelect(task)}
            className="relative bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-xl hover:scale-105 transform transition-all flex flex-col"
          >
            {task.shared && (
              <div
                className="absolute top-2 right-2 flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded cursor-pointer hover:bg-blue-200"
                title="Shared note - click to copy link"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(
                    `${window.location.origin}/shared/${task.todo_id}`
                  );
                  alert("Link copied to clipboard!");
                }}
              >
                <FiShare2 className="w-4 h-4" />
                <span className="text-xs font-medium">Shared</span>
              </div>
            )}

            <h3 className="font-bold text-lg mb-1 text-gray-900 truncate">
              {displayTitle}
            </h3>

            {displayContent && (
              <p className="text-gray-700 text-sm line-clamp-3 flex-1 mb-2">
                {displayContent}
              </p>
            )}

            {(task.tags ?? []).length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {task.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#0F766E] text-white px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <span className="text-xs text-gray-500 mt-2">
              {formattedDateTime}
            </span>
          </div>
        );
      })}
    </div>
  );
}
