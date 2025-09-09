// app/shared/[id]/page.tsx
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
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6">
            <div className="mx-auto h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
              <svg
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Shared Task Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The shared task you are looking for does not exist or the link is invalid.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to App
          </Link>
        </div>
      </div>
    );
  }

  const task = sharedTask.task;
  const isReadOnly = sharedTask.permission === "read";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
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
            Shared by{" "}
            <span className="font-medium">
              {task.user?.email || "Unknown"}
            </span>
            {task.updated_at && (
              <>
                {" • "}
                <span>
                  Updated {new Date(task.updated_at).toLocaleDateString("id-ID")}
                </span>
              </>
            )}
          </p>
          <div className="text-gray-700 whitespace-pre-wrap border-t pt-4">
            {task.content || "No content available"}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-2">
          <Link
            href="/"
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Go to App
          </Link>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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