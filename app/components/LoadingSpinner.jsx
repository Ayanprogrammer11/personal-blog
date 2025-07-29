export default function LoadingSpinner({
  size = "md",
  text = "Loading...",
  showText = true,
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Outer ring */}
        <div
          className={`${sizeClasses[size]} border-4 border-sage-200 rounded-full animate-spin`}
        >
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-brand-500 rounded-full animate-spin"></div>
        </div>

        {/* Inner ring */}
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
            size === "sm"
              ? "w-2 h-2"
              : size === "md"
                ? "w-4 h-4"
                : size === "lg"
                  ? "w-6 h-6"
                  : "w-8 h-8"
          } border-2 border-cream-300 border-t-brand-400 rounded-full animate-spin`}
          style={{ animationDirection: "reverse", animationDuration: "1s" }}
        ></div>
      </div>

      {text && showText ? (
        <p className="mt-4 text-sage-600 font-medium animate-pulse">{text}</p>
      ) : null}
    </div>
  );
}
