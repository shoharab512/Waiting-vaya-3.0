import { Skeleton } from "@/components/ui/skeleton"

const SolveSkeleton = () => {
    return (
        <div className="bg-white shadow-md shadow-slate-400 dark:bg-gray-700 p-4 rounded-lg text-center transition-transform transform ">
            <div>
                <Skeleton className="mx-auto mb-4 h-48 max-w-xs object-cover rounded-md" />
            </div>
            <div className="text-xl font-bold flex items-center space-x-1 text-gray-900 dark:text-gray-100 mb-2 mt-2">
                <Skeleton className="h-6 w-24" />
            </div>
            <div className="flex space-x-2 items-center mb-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
            </div>
            <div className="bg-[#FFFFFF] dark:bg-gray-800 p-6 rounded-lg shadow-md shadow-slate-400">
                <Skeleton className="mx-auto mb-4 h-48 max-w-xs rounded-lg" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-3/4" />
            </div>
        </div>
    );
}

export default SolveSkeleton;