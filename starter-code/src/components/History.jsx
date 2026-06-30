import StatCards from "./StatCards";
import RangeSelector from "./RangeSelector";
import RateChart from "./RateChart";

export default function History() {
  return (
    <div className="px-4 py-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <StatCards />
        <RangeSelector />
      </div>

      <RateChart />
    </div>
  );
}
