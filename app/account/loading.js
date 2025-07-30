import LoadingSpinner from "../_components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <LoadingSpinner size="xl" showText={false} />
    </div>
  );
}
