import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TimeScale, ChartOptions } from "chart.js";
import 'chartjs-adapter-date-fns';
import { CSSProperties, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { ClipLoader } from "react-spinners";
import { getLocalStorageItem } from "../funcs/storage";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TimeScale);

export function Dashboard() {
  const generateRandomData = () => {
    return Array.from({ length: 7 }, (_, i) => ({
      date: `2025-02-${20 + i}`,
      hr: Math.floor(Math.random() * 50),
      developers: Math.floor(Math.random() * 50),
      managers: Math.floor(Math.random() * 50),
    }));
  };

  const hardcodedData = generateRandomData();

  const [data, setData] = useState<any>({
    labels: hardcodedData.map((item) => item.date),
    datasets: [
      {
        label: "HR",
        data: hardcodedData.map((item) => item.hr),
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
      {
        label: "Developers",
        data: hardcodedData.map((item) => item.developers),
        backgroundColor: "rgba(54, 162, 235, 0.8)",
      },
      {
        label: "Managers",
        data: hardcodedData.map((item) => item.managers),
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
    ],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("Analysis Result");
  const handleClick = () => {
    setLoading(true);
    fetch("http://localhost:3001/chat/analysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + getLocalStorageItem("mii-jwt"),
      },
      body: JSON.stringify({
        data: hardcodedData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.analysis);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const parseResponse = (response: string) => {
    return response.replaceAll("#", "").replaceAll("*", "").replace(/(?:\r\n|\r|\n)/g, "<br>");
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="mt-4 text-lg">Track your analytics and insights.</p>
      </header>
      <Button onClick={handleClick}>Analyse</Button>
      <p className="p4 border m-8" dangerouslySetInnerHTML={{ __html: parseResponse(response) }} />

      {/* Analytics Section */}
      <div className="container mx-auto py-10 px-4 overflow-auto" style={{ maxHeight: '80vh' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Graph title="Hours in Meetings" />
          <Graph title="Effectiveness of Meetings" />
          <Graph title="Meetings That Could Have Been an Email" />
          <Graph title="Total Cost of Meetings" />
          <Graph title="Meeting Attendance" />
          <Graph title="Meeting Satisfaction" />
        </div>
      </div>
    </div>
  );
}

interface GraphProps {
  title: string;
}

export function Graph({ title }: GraphProps) {
  const [loading, setLoading] = useState<boolean>(false);
  let [color, setColor] = useState("#000000");

  // Generate random data for demonstration
  const generateRandomData = () => {
    return Array.from({ length: 7 }, (_, i) => ({
      date: `2025-02-${20 + i}`,
      hr: Math.floor(Math.random() * 50),
      developers: Math.floor(Math.random() * 50),
      managers: Math.floor(Math.random() * 50),
    }));
  };

  const hardcodedData = generateRandomData();

  const [data, setData] = useState<any>({
    labels: hardcodedData.map((item) => item.date),
    datasets: [
      {
        label: "HR",
        data: hardcodedData.map((item) => item.hr),
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
      {
        label: "Developers",
        data: hardcodedData.map((item) => item.developers),
        backgroundColor: "rgba(54, 162, 235, 0.8)",
      },
      {
        label: "Managers",
        data: hardcodedData.map((item) => item.managers),
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
    ],
  });

  const options: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'MMM dd, yyyy',
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Value",
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      
    },
  };

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-center text-lg font-bold">{title}</h2>
      <div className="">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}