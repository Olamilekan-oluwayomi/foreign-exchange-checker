import { formatDistanceToNow } from "date-fns";
import { useFavorites } from "../context/FavoritesContext";

function formatTime(timestamp) {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return "-";

  return formatDistanceToNow(date, { addSuffix: false })
    .replace("about ", "")
    .replace(" minutes", "M")
    .replace(" minute", "M")
    .replace(" hours", "H")
    .replace(" hour", "H")
    .replace(" days", "D")
    .replace(" day", "D")
    .toUpperCase();
}

export default function Log() {
  const { log, deleteLogEntry, clearLog } = useFavorites();

  if (log.length === 0) {
    return (
      <div className="rounded-2xl bg-neutral-900 px-5 py-16 text-center">
        <p className="mb-2 text-base font-bold text-white">
          No conversions logged yet
        </p>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-neutral-400">
          Every conversion is recorded here automatically when you tap LOG
          CONVERSION. Your log is private to this session and this browser.
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-2xl bg-neutral-900 p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <p className="text-lg font-bold tracking-widest text-white">
          CONVERSION LOG
        </p>
        <div className="flex items-center justify-between w-full md:w-fit gap-4">
          <span className="text-sm tracking-widest text-neutral-400">
            {log.length} LOGGED
          </span>
          <button
            type="button"
            onClick={clearLog}
            className="cursor-pointer rounded-lg border border-neutral-700 px-4 py-2 text-xs font-bold tracking-widest text-neutral-400 transition-colors hover:border-brand-red hover:text-brand-red"
          >
            CLEAR ALL
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {log.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-800 px-4 py-4"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
              <p className="text-sm tracking-widest text-neutral-400 sm:w-12">
                {formatTime(entry.timestamp)}
              </p>
              <p className="text-sm font-bold tracking-widest text-white sm:text-base">
                {entry.from} {"->"} {entry.to}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-6">
                <p className="text-sm tracking-widest text-white sm:text-base">
                  {Number(entry.amount).toLocaleString()}
                </p>
                <p className="text-sm font-bold tracking-widest text-brand-lime sm:text-base">
                  {Number(entry.convertedAmount).toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => deleteLogEntry(entry.id)}
                aria-label="Delete log entry"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 text-xs font-bold text-neutral-400 transition-colors hover:border-brand-red hover:text-brand-red"
              >
                DEL
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
