import chevronDown from "../assets/images/icon-chevron-down.svg";

const tabs = [
  { id: "history", label: "HISTORY" },
  { id: "compare", label: "COMPARE" },
  { id: "favorites", label: "FAVORITES", count: 30 },
  { id: "log", label: "LOG", count: 8 },
];

export default function Tabs() {
  const activeTab = "history"; // hardcoded for now, static phase only

  return (
    <div className="px-4">
      {/* Mobile: dropdown-style button */}
      <button className="sm:hidden w-full flex items-center justify-between bg-neutral-900 rounded-xl px-4 py-3 text-lg font-bold tracking-widest text-white">
        <span>{tabs.find((t) => t.id === activeTab).label}</span>
        <img src={chevronDown} alt="" className="w-6 h-6" />
      </button>

      {/* Tablet/Desktop: horizontal tab row */}
      <div className="hidden sm:flex items-center gap-6 border-b border-neutral-900">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              className={`flex items-center gap-1.5 pb-3 text-lg font-bold tracking-widest border-b-2 -mb-px ${
                isActive
                  ? "text-white border-lime-400"
                  : "text-neutral-500 border-transparent"
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="bg-lime-900/40 text-lime-400 text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
