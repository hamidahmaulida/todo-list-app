// app/shared/[id]/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex justify-center mb-6">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 
                   1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 
                   0L4.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 
                   1h3m10-11l2 2m-2-2v10a1 1 0 01-1 
                   1h-3m-6 0a1 1 0 001-1v-4a1 1 0 
                   011-1h2a1 1 0 011 1v4a1 1 0 001 
                   1m-6 0h6"
              />
            </svg>
            Back to App
          </Link>
        </div>
      </div>
    </div>
  );
}
