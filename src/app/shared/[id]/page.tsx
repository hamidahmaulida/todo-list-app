import { notFound } from "next/navigation";
import Link from "next/link";
import { getSharedTask } from "@/lib/shared";

interface SharedTaskPageProps {
  params: {
    id: string;
  };
}

export default async function SharedTaskPage({ params }: SharedTaskPageProps) {
  const sharedTask = await getSharedTask(params.id);

  if (!sharedTask) {
    notFound();
  }

  const task = sharedTask.task;
  const isReadOnly = sharedTask.permission === "read";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              ← Back
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              Shared Task
            </h1>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              isReadOnly
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {isReadOnly ? "View Only" : "Can Edit"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-4">
            {task.title || "Untitled Task"}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Shared by <span className="font-medium">{task.user?.email || "Unknown"}</span>
          </p>
          <div className="text-gray-700 whitespace-pre-wrap">
            {task.content || "No content available"}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-2">
          <Link
            href="/"
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Go to App
          </Link>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: SharedTaskPageProps) {
  const sharedTask = await getSharedTask(params.id);

  if (!sharedTask) {
    return {
      title: "Shared Task Not Found",
      description: "The requested shared task could not be found.",
    };
  }

  const task = sharedTask.task;
  return {
    title: `${task.title || "Shared Task"} | Shared by ${
      task.user?.email || "Unknown"
    }`,
    description: task.content
      ? task.content.substring(0, 160) + "..."
      : "A task shared with you",
  };
}
