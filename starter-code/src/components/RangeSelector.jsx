const ranges = ["1D", "1W", "1M", "3M", "1Y", "5Y"];

export default function RangeSelector({ range, setRange }) {
  return (
    <div className="flex gap-1 bg-neutral-900 rounded-lg p-1 w-fit">
      {ranges.map((r) => (
        <button
          key={r}
          onClick={() => setRange(r)}
          className={`text-[12px] sm:text-sm font-bold tracking-wide px-2.5 py-1 rounded-md cursor-pointer ${
            r === range ? "bg-neutral-700 text-white" : "text-neutral-500"
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
