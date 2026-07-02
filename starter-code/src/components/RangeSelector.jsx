const ranges = ["1D", "1W", "1M", "3M", "1Y", "5Y"];

export default function RangeSelector({ activeRange, onRangeChange }) {
  return (
    <div className="grid w-full grid-cols-6 rounded-xl bg-neutral-900 p-1 sm:w-[300px]">
      {ranges.map((range) => (
        <button
          type="button"
          key={range}
          onClick={() => onRangeChange(range)}
          className={`h-10 cursor-pointer rounded-lg text-xs font-bold tracking-widest transition-colors ${
            range === activeRange
              ? "bg-neutral-700 text-white"
              : "text-neutral-500 hover:text-neutral-300"
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
}
