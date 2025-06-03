"use client";

import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DrawerLayout from "../../DrawerLayout";
import Track from "./components/track";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const tabs = [
  "Daily",
  "Weekly",
  "Monthly",
  "Yearly",
  "6 months",
  "3 months",
  "Lifetime",
];

const data = {
  labels: [
    "May 18",
    "May 18",
    "May 18",
    "May 18",
    "May 18",
    "May 18",
    "May 18",
    "May 18",
    "May 18",
  ],
  datasets: [
    {
      label: "Activity",
      data: [70, 60, 58, 50, 45, 44, 43, 42, 41],
      backgroundColor: [
        "#f87171",
        "#fbbf24",
        "#34d399",
        "#60a5fa",
        "#a78bfa",
        "#f472b6",
        "#9ca3af",
        "#f59e0b",
        "#38bdf8",
      ],
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Pray Activity",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function Pray() {
  const [tracking, setTracking] = useState(false);
  return (
    <DrawerLayout>
      <div>track your pray</div>
      {!tracking && (
        <div className="min-h-screen p-4 flex flex-col bg-white">
          <div className="flex flex-wrap gap-2 mb-4">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`px-3 py-1 border rounded text-sm shadow-sm ${
                  tab === "Weekly" ? "bg-gray-300 font-semibold" : "bg-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="w-full max-w-3xl">
            <Bar options={options} data={data} />
          </div>

          <div className="w-full max-w-3xl mt-10">
            <div
              className="bg-gray-200 rounded shadow flex items-center justify-between px-4 py-3"
              onClick={() => setTracking(!tracking)}
            >
              <span className="text-lg">Today</span>
              <span className="text-xl">→</span>
            </div>
          </div>
        </div>
      )}
      {tracking && <Track />}
    </DrawerLayout>
  );
}
