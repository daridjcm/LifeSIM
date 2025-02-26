import { ExclamationCircleIcon, HomeIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex items-center justify-center text-center p-6 max-w-sm min-w-[50%] min-h-[60%] bg-white rounded-lg shadow-lg">
        <div>
          <ExclamationCircleIcon className="w-32 h-32 text-red-500 mx-auto mb-4 animate-move-up-down" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            404 - Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Sorry, we couldn't find the page you are looking for.
          </p>
          <Button
            variant="flat"
            size="lg"
            onPress={() => (window.location.href = "/")}
            className="text-primary-500 hover:scale-105 hover:bg-primary-600 hover:text-primary-50 transition-all duration-300 ease-in-out"
          >
            <span className="animate-appear-from-left">Teleport Back Home</span>
            <HomeIcon className="size-7 animate-appear-from-bottom" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
