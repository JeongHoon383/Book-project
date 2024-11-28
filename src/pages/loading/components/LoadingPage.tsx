export const LoadingPage = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-700 rounded-lg p-5 flex gap-2 justify-center items-center">
        <span className="w-3 h-3 bg-green-400 rounded-full animate-bounce"></span>
        <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-200"></span>
        <span className="w-3 h-3 bg-red-400 rounded-full animate-bounce delay-400"></span>
      </div>
    </div>
  );
};
