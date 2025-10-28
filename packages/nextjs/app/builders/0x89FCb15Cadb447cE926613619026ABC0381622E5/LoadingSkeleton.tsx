export const AvatarSkeleton = () => (
  <div className="flex flex-col items-center mb-8">
    <div className="relative mb-6">
      <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-pink-300 dark:ring-pink-600 ring-offset-4 ring-offset-white dark:ring-offset-base-300 shadow-lg">
        <div className="w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-700 dark:to-purple-700 animate-pulse" />
      </div>
    </div>
    <div className="w-48 h-10 bg-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-700 dark:to-purple-700 rounded-2xl animate-pulse mb-2" />
    <div className="w-36 h-8 bg-pink-100 dark:bg-pink-900/30 rounded-full animate-pulse" />
  </div>
);

export const BadgeSkeleton = () => (
  <div className="absolute -bottom-2 -right-2">
    <div className="w-24 h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full animate-pulse" />
  </div>
);

export const DescriptionSkeleton = () => (
  <div className="mb-8">
    <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-3xl p-6 border-2 border-pink-200 dark:border-pink-700">
      <div className="w-24 h-6 bg-pink-300 dark:bg-pink-700 rounded-full animate-pulse mb-3" />
      <div className="space-y-2">
        <div className="w-full h-4 bg-pink-200 dark:bg-pink-800 rounded-full animate-pulse" />
        <div className="w-5/6 h-4 bg-pink-200 dark:bg-pink-800 rounded-full animate-pulse" />
        <div className="w-4/6 h-4 bg-pink-200 dark:bg-pink-800 rounded-full animate-pulse" />
      </div>
    </div>
  </div>
);

export const SocialLinksSkeleton = () => (
  <div>
    <div className="w-32 h-6 bg-purple-300 dark:bg-purple-700 rounded-full animate-pulse mb-4" />
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl border-2 border-gray-300 dark:border-gray-600 animate-pulse"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full" />
            <div className="flex-1">
              <div className="w-16 h-3 bg-gray-300 dark:bg-gray-600 rounded-full mb-2" />
              <div className="w-24 h-3 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
