import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function RateChart({
  data = [],
  isLoading,
  fromCurrency,
  toCurrency,
  lastRate,
}) {
  const lastEntry = data[data.length - 1];

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="text-xl font-bold tracking-widest text-white">
          {fromCurrency}/{toCurrency}
        </span>

        <span className="text-right text-xs tracking-widest text-neutral-400">
          {lastEntry
            ? `${lastEntry.rate.toFixed(4)} - ${new Date(lastEntry.date)
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                })
                .toUpperCase()} CET`
            : lastRate}
        </span>
      </div>

      {isLoading ? (
        <div className="flex h-[260px] items-center justify-center text-xs tracking-widest text-neutral-600 sm:h-[320px]">
          LOADING...
        </div>
      ) : data.length === 0 ? (
        <div className="flex h-[260px] flex-col items-center justify-center gap-2 text-center sm:h-[320px]">
          <p className="text-base font-bold text-white">
            No chart data available
          </p>
          <p className="max-w-md text-sm leading-relaxed text-neutral-400">
            We couldn't load rate history for {fromCurrency}/{toCurrency} right
            now. This usually clears up in a minute.
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={340}>
          <AreaChart
            data={data}
            margin={{ top: 18, right: 4, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#cef739" stopOpacity={0.85} />
                <stop offset="95%" stopColor="#cef739" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#343434"
              strokeDasharray="3 7"
              strokeWidth={0.7}
            />

            <XAxis
              dataKey="date"
              tick={{ fill: "#9d9d9d", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              dy={12}
            />

            <YAxis
              tick={{ fill: "#9d9d9d", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              domain={["auto", "auto"]}
              width={58}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#171719",
                border: "1px solid #2e2e2e",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#9d9d9d" }}
              itemStyle={{ color: "#cef739" }}
            />

            <Area
              type="monotone"
              dataKey="rate"
              stroke="#cef739"
              strokeWidth={3}
              fill="url(#rateGradient)"
              dot={false}
              activeDot={{ r: 4, fill: "#cef739", stroke: "#0a0a0a" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
