export default function RateChart() {
  return (
    <div className="bg-neutral-900 rounded-xl p-4 mt-3">
      <div className="flex items-center justify-between mb-3">
        <span className="text-neutral-300 text-xs font-bold tracking-widest">
          USD/EUR
        </span>
        <span className="text-neutral-500 text-[10px]">
          0.8530 · MAY 14 16:00 CET
        </span>
      </div>
      <div className="h-48 flex items-center justify-center text-neutral-600 text-xs">
        Chart goes here
      </div>
    </div>
  );
}
