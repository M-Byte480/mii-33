import { Line } from "react-chartjs-2";

export function Dashboard() {
  const config = {
    type: 'line',
    data: data,
    options: {
      plugins: {
        title: {
          text: 'Chart.js Time Scale',
          display: true
        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            // Luxon format string
            tooltipFormat: 'DD T'
          },
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'value'
          }
        }
      },
    },
  };

  const data = {
    labels: ["2024-02-01", "2024-02-05", "2024-02-10", "2024-02-15"],
    datasets: [
      {
        label: "Sales Over Time",
        data: [
          { x: "2024-02-01", y: 100 },
          { x: "2024-02-05", y: 150 },
          { x: "2024-02-10", y: 80 },
          { x: "2024-02-15", y: 200 },
        ],
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
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
          tooltipFormat: "YYYY-MM-DD",
          displayFormats: {
            day: "MMM D",
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="mt-4 text-lg">Track your analytics and insights.</p>
      </header>

      {/* Analytics Section */}
      <Line data={data} options={options} />;

    </div>
  )
}

export function Graph() {
  const DATA_COUNT = 7;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

  const data = {
    labels: [ // Date Objects
      Utils.newDate(0),
        Utils.newDate(1),
      Utils.newDate(2),
      Utils.newDate(3),
      Utils.newDate(4),
      Utils.newDate(5),
      Utils.newDate(6)
    ],
    datasets: [{
      label: 'My First dataset',
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
      borderColor: Utils.CHART_COLORS.red,
      fill: false,
      data: Utils.numbers(NUMBER_CFG),
    }, {
      label: 'My Second dataset',
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
      borderColor: Utils.CHART_COLORS.blue,
      fill: false,
      data: Utils.numbers(NUMBER_CFG),
    }, {
      label: 'Dataset with point data',
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.green, 0.5),
      borderColor: Utils.CHART_COLORS.green,
      fill: false,
      data: [{
        x: Utils.newDateString(0),
        y: Utils.rand(0, 100)
      }, {
        x: Utils.newDateString(5),
        y: Utils.rand(0, 100)
      }, {
        x: Utils.newDateString(7),
        y: Utils.rand(0, 100)
      }, {
        x: Utils.newDateString(15),
        y: Utils.rand(0, 100)
      }],
    }]
  };


  return (
    
  )
}