// components/LoadingSpinner.jsx
export default function LoadingSpinner() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-12 w-12">
        {/* Animated gradient ring */}
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-transparent border-b-purple-500 border-l-blue-500 border-r-blue-500 border-t-purple-500"></div>

        {/* Center dot */}
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
      </div>
    </div>
  );
}
