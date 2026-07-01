import chevronDown from "../assets/images/icon-chevron-down.svg";

import { useState, useEffect, useRef } from "react";

export default function Tabs({
  activeTab,
  setActiveTab,
  favoritesCount,
  logCount,
}) {
  const [isDropedDown, setIsDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const tabs = [
    { id: "history", label: "HISTORY" },
    { id: "compare", label: "COMPARE" },
    { id: "favorites", label: "FAVORITES", count: favoritesCount },
    { id: "log", label: "LOG", count: logCount },
  ];

  return (
    <div className="px-4" ref={dropdownRef}>
      {/* Mobile: dropdown-style button */}
      <button
        className="sm:hidden w-full flex items-center justify-between bg-neutral-900 rounded-xl px-4 py-3 text-lg font-bold tracking-widest text-white"
        onClick={() => setIsDropdown((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setIsDropdown(false);
        }}
      >
        <span>{tabs.find((t) => t.id === activeTab).label}</span>
        <img src={chevronDown} alt="" className="w-6 h-6" />
      </button>

      {isDropedDown && (
        <div className="sm:hidden mt-1 bg-neutral-900 rounded-xl overflow-hidden">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                className={`w-full flex items-center justify-between px-4 py-3 text-[0.95rem] font-bold tracking-widest ${
                  isActive ? "text-white" : "text-neutral-500"
                }`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsDropdown(false);
                }}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="bg-lime-900/40 text-lime-400 text-[11px] rounded-full w-5 h-5 flex items-center justify-center">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Tablet/Desktop: horizontal tab row */}
      <div className="hidden sm:flex items-center gap-6 border-b border-neutral-900">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              className={`flex items-center gap-1.5 pb-3 text-[0.95rem] sm:text-base font-bold tracking-widest border-b-2 -mb-px cursor-pointer ${
                isActive
                  ? "text-white border-lime-400"
                  : "text-neutral-500 border-transparent"
              }`}
              onClick={() => setActiveTab(tab.id)}
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
