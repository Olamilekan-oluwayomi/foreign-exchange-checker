const stats = [
  { label: "OPEN", value: "0.8516" },
  { label: "LAST", value: "0.8530" },
  { label: "CHANGE", value: "+0.0014", accent: true },
  { label: "% CHANGE", value: "▲ +0.16%", accent: true },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
      {stats.map((s) => (
        <div key={s.label} className="bg-neutral-900 rounded-xl p-3 sm:w-fit">
          <p className="text-neutral-500 text-[10px] tracking-widest mb-1">
            {s.label}
          </p>
          <p
            className={`text-sm font-bold whitespace-nowrap ${s.accent ? "text-lime-400" : "text-white"}`}
          >
            {s.value}
          </p>
        </div>
      ))}
    </div>
  );
}
