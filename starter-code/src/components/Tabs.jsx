import { useState } from "react";
import chevronDown from "../assets/images/icon-chevron-down.svg";

export default function Tabs({
  activeTab,
  setActiveTab,
  favoritesCount,
  logCount,
}) {
  const tabs = [
    { id: "history", label: "HISTORY" },
    { id: "compare", label: "COMPARE" },
    { id: "favorites", label: "FAVORITES", count: favoritesCount },
    { id: "log", label: "LOG", count: logCount },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const active = tabs.find((tab) => tab.id === activeTab);

  return (
    <nav className="mb-5">
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-neutral-700 bg-neutral-900 px-5 py-4 text-lg font-bold tracking-widest text-white sm:hidden"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          <span>{active.label}</span>
          {active.count > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-lime-dark px-1.5 text-[10px] text-brand-lime">
              {active.count}
            </span>
          )}
        </div>
        <img src={chevronDown} alt="" className="h-5 w-5" />
      </button>

      {isDropdownOpen && (
        <div className="mt-2 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 sm:hidden">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                type="button"
                key={tab.id}
                className={`flex w-full cursor-pointer items-center justify-between px-5 py-4 text-sm font-bold tracking-widest ${
                  isActive ? "text-white" : "text-neutral-500"
                }`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsDropdownOpen(false);
                }}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-lime-dark px-1.5 text-[10px] text-brand-lime">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      <div className="hidden items-center gap-10 border-b border-neutral-800 sm:flex">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              type="button"
              key={tab.id}
              className={`flex cursor-pointer items-center gap-2 border-b-2 pb-3 text-lg font-bold tracking-widest transition-colors ${
                isActive
                  ? "border-brand-lime text-white"
                  : "border-transparent text-neutral-400 hover:text-white"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-lime-dark px-1.5 text-[10px] text-brand-lime">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
