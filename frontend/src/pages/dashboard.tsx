import { Line } from "react-chartjs-2"
import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import "chartjs-adapter-date-fns";
import Button from "@mui/material/Button";
import { CSSProperties, useEffect, useState } from "react";
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
  const [apiResponse, setApiResponse] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  let [color, setColor] = useState("#000000");
  const [data, setData] = useState<any>({});

  // let data = {
  //   labels: [
  //     "2024-02-01T00:00:00Z",
  //     "2024-02-02T00:00:00Z",
  //     "2024-02-03T00:00:00Z",
  //     "2024-02-04T00:00:00Z",
  //   ],
  //   datasets: [
  //     {
  //       label: "Dataset",
  //       data: [
  //         { x: "2024-02-01T00:00:00Z", y: 10 },
  //         { x: "2024-02-02T00:00:00Z", y: 30 },
  //         { x: "2024-02-03T00:00:00Z", y: 20 },
  //         { x: "2024-02-04T00:00:00Z", y: 50 },
  //       ],
  //       borderColor: "blue",
  //       backgroundColor: "rgba(0, 0, 255, 0.5)",
  //       tension: 0.4,
  //     },
  //   ],
  // };

  useEffect(() => {
    fetch("http://localhost:3001/metrics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + getLocalStorageItem("mii-jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setApiResponse(data);
      })
      .catch((error) => console.error("Error fetching metrics:", error));
  }, []);

  useEffect(() => {
    if (apiResponse.length === 0) return;

    console.log("Update data", apiResponse);
    let tmp = { labels: [], datasets: [] };
    let labels: any[] = [];
    let datasets = [
      {
        label: "Dataset",
        data: [],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.5)",
        tension: 0.4,
      },
      {
        label: "Meeting Duration (min)",
        data: [],
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.65)",
        tension: 0.4,
      },
      {
        label: "Cost per minute",
        data: [],
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        tension: 0.4,
      },
    ];

    apiResponse.forEach((element: any) => {
      labels.push(element.id);
      // @ts-ignore
      datasets[0].data.push({ x: element.id, y: element.total_cost });
      // @ts-ignore
      datasets[1].data.push({ x: element.id, y: element.total_meeting_hours });
      // @ts-ignore
      datasets[2].data.push({ x: element.id, y: element.total_cost / element.total_meeting_hours });
    });
    // @ts-ignore
    tmp.labels = labels;
    // @ts-ignore
    tmp.datasets = datasets;
    setData(tmp);
  }, [apiResponse]);

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "linear",
        title: {
          display: true,
          text: "Meeting ID",
        },
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
      y: {
        title: {
          display: true,
          text: "Cost of meeting in €",
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
      <div className="flex flex-col justify-between">

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
        <p className="p4 border m-8" dangerouslySetInnerHTML={{ __html: parseResponse(response) }} />
      </div>


      {/* @ts-ignore */}
      {
        data.datasets && (
          // @ts-ignore
          <Line data={data} options={options} />
        )
      }
    </>
  )
}