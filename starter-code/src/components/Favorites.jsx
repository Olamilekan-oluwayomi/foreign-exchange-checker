import { useState, useEffect } from "react";

export default function Favorites({ favorites, onUnfavorite, onLoadPair }) {
  const [rates, setRates] = useState({});
  const [changes, setChanges] = useState({});

  useEffect(() => {
    if (favorites.length === 0) return;

    async function fetchData() {
      try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const dateStr = yesterday.toISOString().split("T")[0];

        const results = await Promise.all(
          favorites.map(async (fav) => {
            const [latestRes, prevRes] = await Promise.all([
              fetch(
                `https://api.frankfurter.dev/v1/latest?from=${fav.from}&to=${fav.to}`,
              ),
              fetch(
                `https://api.frankfurter.dev/v1/${dateStr}?from=${fav.from}&to=${fav.to}`,
              ),
            ]);
            const latest = await latestRes.json();
            const prev = await prevRes.json();
            return { fav, latest, prev };
          }),
        );

        const ratesMap = {};
        const changesMap = {};

        results.forEach(({ fav, latest, prev }) => {
          const key = `${fav.from}/${fav.to}`;
          const currentRate = latest.rates?.[fav.to];
          const prevRate = prev.rates?.[fav.to];
          ratesMap[key] = currentRate ?? null;
          if (currentRate && prevRate) {
            changesMap[key] = ((currentRate - prevRate) / prevRate) * 100;
          }
        });

        setRates(ratesMap);
        setChanges(changesMap);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [favorites]);

  if (favorites.length === 0) {
    return (
      <div className="rounded-2xl bg-neutral-900 px-5 py-16 text-center">
        <p className="mb-2 text-sm font-bold tracking-widest text-white">
          NO PINNED PAIRS YET
        </p>
        <p className="mx-auto max-w-sm text-xs leading-relaxed text-neutral-400">
          Pin a pair to track its rate here. Tap the star icon on any conversion
          or comparison row.
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-2xl bg-neutral-900 p-5">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-lg font-bold tracking-widest text-white">
          PINNED PAIRS
        </p>
        <p className="text-sm tracking-widest text-neutral-400">
          {favorites.length} FAVORITES
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {favorites.map((fav) => {
          const key = `${fav.from}/${fav.to}`;
          const rate = rates[key];
          const pct = changes[key];
          const up = pct >= 0;

          return (
            <button
              type="button"
              key={key}
              onClick={() => onLoadPair(fav.from, fav.to)}
              className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-neutral-800 bg-neutral-800 px-4 py-4 text-left transition-colors hover:bg-neutral-700"
            >
              <p className="text-base font-bold tracking-widest text-white">
                {fav.from} {"->"} {fav.to}
              </p>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-base font-bold text-white">
                    {rate ? rate.toFixed(4) : "-"}
                  </p>
                  {pct !== undefined ? (
                    <p
                      className={`text-xs font-bold ${
                        up ? "text-brand-green" : "text-brand-red"
                      }`}
                    >
                      {up ? "+" : "-"}
                      {Math.abs(pct).toFixed(2)}%
                    </p>
                  ) : (
                    <p className="text-xs text-neutral-500">-</p>
                  )}
                </div>

                <span
                  onClick={(event) => {
                    event.stopPropagation();
                    onUnfavorite(fav.from, fav.to);
                  }}
                  className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-brand-lime bg-brand-lime-dark text-sm text-brand-lime"
                >
                  &#9733;
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
