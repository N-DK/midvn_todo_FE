import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  Point,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

type IChartDataType = ChartData<"line", (number | Point | null)[], unknown>

interface ILineChartC {
  data: any
}

export const LineChartTimeC: React.FC<ILineChartC> = ({ data }) => {
  const options: any = {
    animation: {
      duration: 0,
    },

    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
        pointHoverRadius: 4,
        pointBorderWidth: 0,
      },
    },
    hover: {
      mode: "index",
      intersect: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            padding: 25,
          },
        },
      ],
      //   xAxes: [
      //     {
      //       title: "time",
      //       type: "time",
      //       gridLines: {
      //         lineWidth: 2,
      //       },
      //       time: {
      //         unit: "day",
      //         unitStepSize: 1000,
      //         displayFormats: {
      //           millisecond: "MMM DD",
      //           second: "MMM DD",
      //           minute: "MMM DD",
      //           hour: "MMM DD",
      //           day: "MMM DD",
      //           week: "MMM DD",
      //           month: "MMM DD",
      //           quarter: "MMM DD",
      //           year: "MMM DD",
      //         },
      //       },
      //     },
      //   ],
      y: {
        ticks: {
          maxTicksLimit: 5,
        },
        // max: (scale) =>
        //   scale.chart.data.datasets.reduce((acc, curr) => {
        //     const max = Math.max(...curr.data);
        //     acc = max > acc ? max : acc;
        //     return acc + Math.min(20, acc / 2);
        //   }, Number.MIN_SAFE_INTEGER),
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 10,
        },
      },
    },

    plugins: {
      legend: {
        // display: false,
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      title: {
        display: false,
        text: "",
      },
    },
  }
  return <Line options={options} data={data || {}} />
}
