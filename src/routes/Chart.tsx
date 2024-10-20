import { fethchCoinChart } from "../api";
import { useQuery } from "react-query";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IChart {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IChart[]>(
    ["chart", coinId],
    () => fethchCoinChart(coinId),
    {
      refetchInterval: 10000,
    }
  );
  console.log(data?.map((price) => parseFloat(price.close)) ?? []);
  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => parseFloat(price.close)) ?? [],
            },
          ]}
          options={{
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["red"] },
            },
            colors: ["yellow"],

            tooltip: {
              x: {
                format: "dd/MM/yy HH:mm",
              },
              y: {
                formatter: (price) => `$${price.toFixed(3)}`,
              },
            },

            chart: {
              height: 500,
              width: 500,

              toolbar: {
                show: false,
              },
            },
            stroke: {
              curve: "smooth",
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: { show: false },
              categories: data?.map((date) =>
                new Date(date?.time_close).toUTCString()
              ),
            },
            yaxis: {
              labels: {
                show: false,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
