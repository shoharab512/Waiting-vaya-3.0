import { Skeleton } from "@/components/ui/skeleton"

const ProblemSkeleton = () => {
    return (
        <div className="bg-white shadow-md shadow-slate-400 dark:bg-gray-700 p-4 rounded-lg text-center transition-transform transform hover:scale-105">
            <div>
                <Skeleton className="mx-auto mb-4 h-48 max-w-xs object-cover rounded-md" />
            </div>
            <div className="flex justify-between mb-2">
                <Skeleton className="w-20 h-6" />
                <Skeleton className="w-20 h-6" />
            </div>
            <div className="mb-4 text-start text-gray-900 dark:text-gray-100">
                <Skeleton className="w-full h-6" />
            </div>
            <div className="space-x-3 flex items-center justify-center">
                <Skeleton className="w-32 h-10" />
                <Skeleton className="w-32 h-10" />
            </div>
        </div>
    );
}

export default ProblemSkeleton;