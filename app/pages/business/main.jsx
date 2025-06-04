"use client";

import React, { useState, useEffect } from "react";
import InputDrawer from "./InputDrawer";
import { useMetrics } from "../../hooks/useMetrics";
import {
  ChevronUp,
  ChevronDown,
  Settings,
  Bell,
  MessageCircle,
  X,
  BarChart2,
  TrendingUp,
  TrendingDown,
  Minus,
  Eye,
  RotateCcw,
  Upload,
  Database,
  Calculator,
  Calendar,
  FileText,
  RefreshCw,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const Pulseboard = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [compareMode, setCompareMode] = useState(null);
  const [businessStatus, setBusinessStatus] = useState("Growing");

  const categories = {
    financial: {
      title: "Financial Metrics",
      color: "#3B82F6",
      bgColor: "#F8FAFC"
    },
    product: {
      title: "Product / Tech Metrics",
      color: "#8B5CF6",
      bgColor: "#FAF5FF"
    },
    marketing: {
      title: "Marketing Metrics",
      color: "#F97316",
      bgColor: "#FFF7ED"
    },
    sales: {
      title: "Sales Metrics",
      color: "#10B981",
      bgColor: "#F0FDF4"
    },
    customer: {
      title: "Customer Metrics",
      color: "#EF4444",
      bgColor: "#FEF2F2"
    },
    operations: {
      title: "Operations Metrics",
      color: "#6B7280",
      bgColor: "#F9FAFB"
    }
  };

  // Sample data for charts
  const generateTrendData = () => {
    return Array.from({ length: 7 }, (_, i) => ({
      day: i + 1,
      value: Math.floor(Math.random() * 100 + 50),
    }));
  };

  // Metric Card Component
  const MetricCard = ({
    title,
    value,
    trend,
    trendPercent,
    color,
    icon,
    data,
    category,
  }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const trendColor =
      trend === "up"
        ? "text-green-500"
        : trend === "down"
        ? "text-red-500"
        : "text-gray-500";
    const TrendIcon =
      trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
    const statusColor =
      trend === "up"
        ? "bg-green-400"
        : trend === "down"
        ? "bg-red-400"
        : "bg-orange-400";

    return (
      <div
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 relative border-l-4"
        style={{ borderLeftColor: color }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white px-3 py-2 rounded-md text-sm z-10 whitespace-nowrap">
            {title} - Key performance indicator
          </div>
        )}

        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{icon}</span>
            <h3 className="font-semibold text-gray-700">{title}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${statusColor}`}></div>
            <button
              onClick={() =>
                setCompareMode(compareMode === title ? null : title)
              }
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-3xl font-bold text-gray-800 mb-1">{value}</div>
          <div className={`flex items-center space-x-1 ${trendColor}`}>
            <TrendIcon size={16} />
            <span className="text-sm font-medium">{trendPercent}</span>
          </div>
        </div>

        <div className="h-16">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  // Chat Component
  const ChatAssistant = () => (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        chatOpen ? "w-80 h-96" : "w-14 h-14"
      }`}
    >
      {chatOpen ? (
        <div className="bg-white rounded-lg shadow-xl border flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold text-gray-800">Business Assistant</h3>
            <button
              onClick={() => setChatOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-3">
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm text-gray-700">
                  Hi! I can help you understand your metrics. Try asking:
                </p>
                <ul className="mt-2 text-xs text-gray-600 space-y-1">
                  <li>• "What's causing revenue drop?"</li>
                  <li>• "How does CAC compare to last quarter?"</li>
                  <li>• "Summarize business health"</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              placeholder="Ask about your metrics..."
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      ) : (
        <button
          onClick={() => setChatOpen(true)}
          className="w-full h-full bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );

  // Comparison Overlay
  const ComparisonOverlay = () => {
    if (!compareMode) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Comparing: {compareMode}</h3>
            <button
              onClick={() => setCompareMode(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Current Period</h4>
              <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                <BarChart size={48} className="text-gray-400" />
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">
                Previous Period
              </h4>
              <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                <BarChart size={48} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MetricSection = ({ title, color, bgColor, category }) => {
    const { metrics, loading, error } = useMetrics(category);
    const [isInputOpen, setIsInputOpen] = useState(false);

    if (loading) {
      return (
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          <div
            className="animate-spin rounded-full h-32 w-32 border-b-2"
            style={{ borderColor: color }}
          ></div>
        </div>
      );
    }

    if (error) {
      return (
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          <div className="text-red-500">
            Error loading metrics: {error.message}
          </div>
        </div>
      );
    }

    return (
      <div
        className="min-h-screen flex flex-col justify-center py-12 px-6"
        style={{ backgroundColor: bgColor }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2
                className="text-4xl font-bold text-gray-800 mb-2"
                style={{ color }}
              >
                {title}
              </h2>
              <div
                className="w-24 h-1 rounded-full"
                style={{ backgroundColor: color }}
              ></div>
            </div>
            <button
              onClick={() => setIsInputOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <Settings size={16} />
              <span>✏️ Inputs</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.id}
                title={metric.title}
                value={metric.value}
                trend={metric.trend}
                trendPercent={metric.trendPercent}
                color={color}
                icon={metric.icon}
                data={metric.rawData}
                category={category}
              />
            ))}
          </div>
        </div>

        <InputDrawer
          isOpen={isInputOpen}
          onClose={() => setIsInputOpen(false)}
          category={category}
          metrics={metrics}
          color={color}
        />
      </div>
    );
  };

  const statusColors = {
    Stable: "bg-blue-400",
    Growing: "bg-green-400",
    "At Risk": "bg-red-400",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-30 border-b">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Status:</span>
              <div
                className={`w-3 h-3 rounded-full ${statusColors[businessStatus]}`}
              ></div>
              <span className="text-sm font-medium text-gray-700">
                {businessStatus}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20">
        {Object.entries(categories).map(([key, category]) => (
          <MetricSection
            key={key}
            title={category.title}
            color={category.color}
            bgColor={category.bgColor}
            category={key}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <ChatAssistant />
      <ComparisonOverlay />
    </div>
  );
};

export default Pulseboard;
