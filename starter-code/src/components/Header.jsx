import logo from "../assets/images/logo.svg";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-2 px-2 md:px-4 py-5 border-b border-neutral-800">
      <div className="flex items-center shrink-0">
        <img src={logo} alt="FX Checker logo" className="h-7 w-auto" />
      </div>

      <p className="text-neutral-200 text-[10px] sm:text-sm lg:text-md tracking-widest leading-none whitespace-nowrap">
        55 CURRENCIES · ECB · ECB DATA
      </p>
    </header>
  );
}
