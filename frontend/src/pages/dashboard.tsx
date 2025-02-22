import { Line } from "react-chartjs-2"
import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import "chartjs-adapter-date-fns";
// Register necessary Chart.js components
ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="mt-4 text-lg">Track your analytics and insights.</p>
      </header>

      {/* Analytics Section */}
      <Graph />
    </div>
  )
}

export function Graph() {
  const data = {
    labels: [
      "2024-02-01T00:00:00Z",
      "2024-02-02T00:00:00Z",
      "2024-02-03T00:00:00Z",
      "2024-02-04T00:00:00Z",
    ],
    datasets: [
      {
        label: "Dataset",
        data: [
          { x: "2024-02-01T00:00:00Z", y: 10 },
          { x: "2024-02-02T00:00:00Z", y: 30 },
          { x: "2024-02-03T00:00:00Z", y: 20 },
          { x: "2024-02-04T00:00:00Z", y: 50 },
        ],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          tooltipFormat: "yyyy-MM-dd",
          displayFormats: {
            day: "MMM dd",
          },
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return (
    <>
      <h2>Time Scale Graph (Chart.js 2)</h2>
      {/* @ts-ignore */}
      <Line data={data} options={options} />
    </>
  )
}