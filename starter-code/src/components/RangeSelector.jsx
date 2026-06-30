const ranges = ["1D", "1W", "1M", "3M", "1Y", "5Y"];

export default function RangeSelector() {
  const activeRange = "1M"; // hardcoded for now, static phase only

  return (
    <div className="flex gap-1 bg-neutral-900 rounded-lg p-1 w-fit">
      {ranges.map((r) => (
        <button
          key={r}
          className={`text-[11px] font-bold tracking-wide px-2.5 py-1 rounded-md ${
            r === activeRange ? "bg-neutral-700 text-white" : "text-neutral-500"
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
