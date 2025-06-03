'use client'
import React, { useState } from "react";
import DrawerLayout from "../../DrawerLayout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartDataOptions = {
  Daily: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      { label: 'Duniya', backgroundColor: '#3B82F6', data: [1, 2, 3, 2, 5, 4, 6] },
      { label: 'Deen', backgroundColor: '#10B981', data: [0, 1, 1, 2, 1, 3, 2] },
    ],
  },
  Weekly: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      { label: 'Duniya', backgroundColor: '#3B82F6', data: [5, 6, 4, 7] },
      { label: 'Deen', backgroundColor: '#10B981', data: [2, 3, 1, 4] },
    ],
  },
  Monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      { label: 'Duniya', backgroundColor: '#3B82F6', data: [10, 20, 30, 40, 50] },
      { label: 'Deen', backgroundColor: '#10B981', data: [5, 8, 6, 10, 12] },
    ],
  },
  Yearly: {
    labels: ['Jun 24', 'Jul 24', 'Aug 24', 'Sep 24', 'Oct 24', 'Nov 24', 'Dec 24', 'Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'May 25'],
    datasets: [
      { label: 'Duniya', backgroundColor: '#3B82F6', data: [10, 12, 14, 11, 25, 16, 22, 30, 40, 90, 10, 5] },
      { label: 'Deen', backgroundColor: '#10B981', data: [1, 2, 1, 1, 3, 2, 2, 3, 4, 5, 8, 1] },
    ],
  },
  '6 months': {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { label: 'Duniya', backgroundColor: '#3B82F6', data: [15, 18, 25, 22, 30, 28] },
      { label: 'Deen', backgroundColor: '#10B981', data: [3, 4, 5, 4, 6, 5] },
    ],
  },
  '3 months': {
    labels: ['Apr', 'May', 'Jun'],
    datasets: [
      { label: 'Duniya', backgroundColor: '#3B82F6', data: [22, 30, 28] },
      { label: 'Deen', backgroundColor: '#10B981', data: [4, 6, 5] },
    ],
  },
  Lifetime: {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      { label: 'Duniya', backgroundColor: '#3B82F6', data: [5, 10, 30, 40, 60, 70] },
      { label: 'Deen', backgroundColor: '#10B981', data: [1, 3, 5, 6, 10, 14] },
    ],
  }
};

const OneBetterEveryDay = () => {
  const [selectedTab, setSelectedTab] = useState("Yearly");

  const historyText = {
    Daily: ['Prayed Fajr', 'Read Quran', 'Worked out', 'Helped someone'],
    Weekly: ['Attended Jummah', 'Finished 1 book', 'Worked on project'],
    Monthly: ['Gave sadaqah', 'Memorized Surah', 'Fast 3 days'],
    Yearly: ['Improved health', 'Saved money', 'Learned coding'],
    '6 months': ['Started new habit', 'Completed a course'],
    '3 months': ['Daily journaling', 'No missed prayer'],
    Lifetime: ['Graduated', 'Built business', 'Grew spiritually'],
  }

  return (
    <DrawerLayout>
      <div>
        what you improve today. show that you improving everyday or not if yes
        then what about you improving speed. Alhamdulillah
      </div>
      <div className="p-4 md:p-8 bg-white min-h-screen text-black">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {Object.keys(chartDataOptions).map((label, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedTab(label)}
              className={`px-4 py-1 rounded border ${
                label === selectedTab
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Chart and Update Box */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Chart Section */}
          <div className="flex-1 bg-gray-100 p-4 rounded shadow">
            <h2 className="font-semibold mb-2">1% Improvement Everyday</h2>
            <p className="text-sm text-gray-600 mb-4">({selectedTab})</p>
            <div className="bg-white rounded shadow-inner">
              <Bar data={chartDataOptions[selectedTab]} />
            </div>
          </div>

          {/* Update Prompt */}
          <div className="w-full md:w-64 bg-green-400 text-white rounded shadow flex items-center justify-center text-center text-lg font-bold p-6">
            1% UPDATE TODAY?
          </div>
        </div>

        {/* Search and history information */}
        <div className="mt-10">
          <h2 className="font-semibold">1% Improvement Everyday</h2>
          <p className="text-sm text-gray-600 mb-4">({selectedTab})</p>

          {/* Search Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <input
              type="text"
              placeholder="Search"
              className="flex-grow min-w-[200px] p-2 rounded border"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Search
            </button>
          </div>

          {/* history information */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {historyText[selectedTab].map((item, idx) => (
              <button
                key={idx}
                className="bg-white border rounded px-3 py-2 hover:bg-gray-100"
              >
                {item}
              </button>
            ))}
          </div>

          {/* See More */}
          <div className="mt-6 text-center">
            <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600">
              See More →
            </button>
          </div>
        </div>
      </div>
    </DrawerLayout>
  );
};

export default OneBetterEveryDay;
