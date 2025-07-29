// import LoadingSpinner from "./components/LoadingSpinner";

import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="xl" text="Loading..." />;
    </div>
  );
}
