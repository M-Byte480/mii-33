import { Line } from "react-chartjs-2"
import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import "chartjs-adapter-date-fns";
import Button from "@mui/material/Button";
import { CSSProperties, useState } from "react";
import { getLocalStorageItem } from "../funcs/storage";
import { ClipLoader } from "react-spinners";
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
  const [response, setResponse] = useState<string>("Analysis Result");
  let apiResponse = {}; // todo: query data from api
  const [loading, setLoading] = useState<boolean>(false);
  let [color, setColor] = useState("#000000");
  /*
    {
      data: [
        { start: "2024-02-01T12:00:00Z", end: "2024-02-01T13:00:00Z", meaningful: True, role: d,  },
        { start: "2024-02-01T12:00:00Z", end: "2024-02-01T13:00:00Z", meaningful: True, role: d,  },
        { start: "2024-02-01T12:00:00Z", end: "2024-02-01T13:00:00Z", meaningful: True, role: d,  },
      ]
    }
  */

  apiResponse = {
    "meeting_details": {
      "topic": "Sprint Planning",
      "current_meeting_time": "10:00",
      "duration": 60
    },
    "participants": [
      {
        "id": "P-001",
        "role": "Manager",
        "hourly_rate": 100,
        "free_time": [
          "09:00",
          "10:00"
        ],
        "preferred_time": [
          "09:00",
          "10:00"
        ]
      },
      {
        "id": "P-002",
        "role": "Developer",
        "hourly_rate": 80,
        "free_time": [
          "10:00",
          "11:00"
        ],
        "preferred_time": [
          "10:00",
          "11:00"
        ]
      }
    ],
    "additional_metrics": {
      "flow_time_interrupted": 15,
      "previous_meetings_effectiveness": 75,
      "calculated_meeting_cost": 90.0
    }
  };

  let data = {
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

  const handleClick = () => {
    setLoading(true);
    fetch("http://localhost:3001/chat/analysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + getLocalStorageItem("mii-jwt")
      },
      body: JSON.stringify({
        data: apiResponse
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.analysis);
      }).finally(() => {
        setLoading(false);
      });;
  }

  const parseResponse = (response: string) => {
    return response.replaceAll("#", "").replaceAll("*", "").replace(/(?:\r\n|\r|\n)/g, '<br>');
  }

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <>
      <h2>Time Scale Graph (Chart.js 2)</h2>
      <Button onClick={handleClick}>Analyse</Button>
      {loading && (
        <ClipLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      <p className="p4" dangerouslySetInnerHTML={{ __html: parseResponse(response) }} />


      {/* @ts-ignore */}
      <Line data={data} options={options} />
    </>
  )
}