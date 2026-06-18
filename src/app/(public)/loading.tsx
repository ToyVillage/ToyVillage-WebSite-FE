export default function HomeLoading() {
  return (
    <main>
      <section className="relative w-full h-[50vh] md:h-195.5 bg-gray-200 animate-pulse" />

      <section className="w-full p-4 md:p-20">
        <div className="flex justify-between items-center mb-6">
          <div className="h-7 w-44 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="border border-gray-200 rounded-xl p-4 shadow-md">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="border-b-2 border-dashed border-gray-200 flex justify-between px-8 py-4.5"
            >
              <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-16 md:mt-31.5 mb-6">
          <div className="h-7 w-44 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col">
              <div className="w-full h-55 rounded-xl bg-gray-200 animate-pulse mb-2" />
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
        <hr className="w-full mt-14 border-none h-0.5 bg-[#E5E5E5]" />
      </section>

      <section className="w-full">
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="h-7 w-52 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-7 w-48 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-8 w-36 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="py-8 flex flex-col gap-5 overflow-hidden px-4">
          <div className="h-55 bg-gray-200 animate-pulse rounded-xl" />
          <div className="h-55 bg-gray-200 animate-pulse rounded-xl" />
        </div>
      </section>
    </main>
  );
}
