export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
      <div className="flex items-center gap-2">
        <span className="bg-lime-400 text-black text-xs font-bold rounded px-1.5 py-1">
          ⚡
        </span>
        <span className="text-white font-bold tracking-widest text-sm lg:text-xl cursor-pointer">
          FX_CHECKER
        </span>
      </div>

      <p className="text-neutral-500 text-[10px] sm:text-xs lg:text-lg tracking-widest">
        55 CURRENCIES · ECB · ECB DATA
      </p>
    </header>
  );
}
