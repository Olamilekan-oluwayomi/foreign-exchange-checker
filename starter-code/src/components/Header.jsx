export default function Header() {
  return (
    <header className="flex items-center justify-between px-2 py-5 sm:px-8 lg:px-10">
      <div className="flex items-center gap-2">
        <span className="bg-brand-lime text-black text-lg font-bold rounded-lg w-7 h-7 flex items-center justify-center shrink-0">
          /
        </span>
        <span className="text-white font-bold tracking-widest text-base sm:text-lg">
          FX_CHECKER
        </span>
      </div>

      <p className=" text-neutral-400 text-[10px] sm:block sm:text-sm tracking-widest">
        55 CURRENCIES - EOD - ECB DATA
      </p>
    </header>
  );
}
