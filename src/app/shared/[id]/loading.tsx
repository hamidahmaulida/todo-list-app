// app/shared/[id]/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-sm p-8 animate-pulse">
          {/* Title */}
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

          {/* Content */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>

          {/* Footer (user info + permission) */}
          <div className="mt-6 flex items-center justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
