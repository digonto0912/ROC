"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronUp,
  ChevronDown,
  Settings,
  Bell,
  MessageCircle,
  X,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  Eye,
  RotateCcw,
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

  // Section Component
  const MetricSection = ({ title, color, children, bgColor }) => (
    <div
      className="min-h-screen flex flex-col justify-center py-12 px-6"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold text-gray-800 mb-2"
            style={{ color }}
          >
            {title}
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: color }}
          ></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
      </div>
    </div>
  );

  const statusColors = {
    Stable: "bg-blue-400",
    Growing: "bg-green-400",
    "At Risk": "bg-red-400",
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ position: "relative" }}>
      {/* Top Bar */}
      <div
        className="fixed top-0 left-0 right-0 bg-white shadow-sm z-30 border-b"
        style={{ position: "absolute" }}
      >
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
        {/* Financial Metrics */}
        <MetricSection
          title="Financial Metrics"
          color="#3B82F6"
          bgColor="#F8FAFC"
        >
          <MetricCard
            title="Revenue"
            value="$128,400"
            trend="up"
            trendPercent="+12.5%"
            color="#3B82F6"
            icon="💰"
            data={generateTrendData()}
            category="financial"
          />
          <MetricCard
            title="Customer Acquisition Cost"
            value="$45.20"
            trend="down"
            trendPercent="-8.3%"
            color="#3B82F6"
            icon="🎯"
            data={generateTrendData()}
            category="financial"
          />
          <MetricCard
            title="Customer Lifetime Value"
            value="$2,340"
            trend="up"
            trendPercent="+15.7%"
            color="#3B82F6"
            icon="🔁"
            data={generateTrendData()}
            category="financial"
          />
          <MetricCard
            title="Gross Profit Margin"
            value="68.5%"
            trend="up"
            trendPercent="+2.1%"
            color="#3B82F6"
            icon="📈"
            data={generateTrendData()}
            category="financial"
          />
          <MetricCard
            title="Net Profit Margin"
            value="24.3%"
            trend="stable"
            trendPercent="0.0%"
            color="#3B82F6"
            icon="💼"
            data={generateTrendData()}
            category="financial"
          />
          <MetricCard
            title="Burn Rate"
            value="$18,500"
            trend="down"
            trendPercent="-5.2%"
            color="#3B82F6"
            icon="🔥"
            data={generateTrendData()}
            category="financial"
          />
        </MetricSection>

        {/* Product/Tech Metrics */}
        <MetricSection
          title="Product / Tech Metrics"
          color="#8B5CF6"
          bgColor="#FAF5FF"
        >
          <MetricCard
            title="DAU / MAU"
            value="12.5K / 45.2K"
            trend="up"
            trendPercent="+18.2%"
            color="#8B5CF6"
            icon="👥"
            data={generateTrendData()}
            category="product"
          />
          <MetricCard
            title="Bug Rate"
            value="2.3%"
            trend="down"
            trendPercent="-12.1%"
            color="#8B5CF6"
            icon="🐞"
            data={generateTrendData()}
            category="product"
          />
          <MetricCard
            title="Feature Adoption"
            value="76.8%"
            trend="up"
            trendPercent="+9.4%"
            color="#8B5CF6"
            icon="📌"
            data={generateTrendData()}
            category="product"
          />
          <MetricCard
            title="Deployment Frequency"
            value="14/week"
            trend="up"
            trendPercent="+25.0%"
            color="#8B5CF6"
            icon="🚀"
            data={generateTrendData()}
            category="product"
          />
          <MetricCard
            title="Time to Market"
            value="23 days"
            trend="down"
            trendPercent="-15.3%"
            color="#8B5CF6"
            icon="⏱"
            data={generateTrendData()}
            category="product"
          />
          <MetricCard
            title="Uptime"
            value="99.94%"
            trend="stable"
            trendPercent="+0.1%"
            color="#8B5CF6"
            icon="📡"
            data={generateTrendData()}
            category="product"
          />
        </MetricSection>

        {/* Marketing Metrics */}
        <MetricSection
          title="Marketing Metrics"
          color="#F97316"
          bgColor="#FFF7ED"
        >
          <MetricCard
            title="Cost Per Lead"
            value="$28.50"
            trend="down"
            trendPercent="-11.7%"
            color="#F97316"
            icon="🎣"
            data={generateTrendData()}
            category="marketing"
          />
          <MetricCard
            title="Website Traffic"
            value="125.4K"
            trend="up"
            trendPercent="+22.8%"
            color="#F97316"
            icon="📊"
            data={generateTrendData()}
            category="marketing"
          />
          <MetricCard
            title="Conversion Rate"
            value="3.2%"
            trend="up"
            trendPercent="+7.5%"
            color="#F97316"
            icon="🔄"
            data={generateTrendData()}
            category="marketing"
          />
          <MetricCard
            title="Bounce Rate"
            value="32.1%"
            trend="down"
            trendPercent="-4.3%"
            color="#F97316"
            icon="🔙"
            data={generateTrendData()}
            category="marketing"
          />
          <MetricCard
            title="Email Open Rate"
            value="24.7%"
            trend="up"
            trendPercent="+3.2%"
            color="#F97316"
            icon="📩"
            data={generateTrendData()}
            category="marketing"
          />
          <MetricCard
            title="Social Engagement"
            value="8.9K"
            trend="up"
            trendPercent="+16.4%"
            color="#F97316"
            icon="💬"
            data={generateTrendData()}
            category="marketing"
          />
        </MetricSection>

        {/* Sales Metrics */}
        <MetricSection title="Sales Metrics" color="#10B981" bgColor="#F0FDF4">
          <MetricCard
            title="Monthly Recurring Revenue"
            value="$89,230"
            trend="up"
            trendPercent="+19.6%"
            color="#10B981"
            icon="💸"
            data={generateTrendData()}
            category="sales"
          />
          <MetricCard
            title="Sales Growth Rate"
            value="14.2%"
            trend="up"
            trendPercent="+2.8%"
            color="#10B981"
            icon="📈"
            data={generateTrendData()}
            category="sales"
          />
          <MetricCard
            title="Average Deal Size"
            value="$4,850"
            trend="up"
            trendPercent="+8.9%"
            color="#10B981"
            icon="💼"
            data={generateTrendData()}
            category="sales"
          />
          <MetricCard
            title="Win Rate"
            value="67.3%"
            trend="up"
            trendPercent="+5.1%"
            color="#10B981"
            icon="🏆"
            data={generateTrendData()}
            category="sales"
          />
          <MetricCard
            title="Sales Cycle Length"
            value="34 days"
            trend="down"
            trendPercent="-6.7%"
            color="#10B981"
            icon="⏳"
            data={generateTrendData()}
            category="sales"
          />
          <MetricCard
            title="Churn Rate"
            value="2.1%"
            trend="down"
            trendPercent="-12.5%"
            color="#10B981"
            icon="🔄"
            data={generateTrendData()}
            category="sales"
          />
        </MetricSection>

        {/* Customer Metrics */}
        <MetricSection
          title="Customer Metrics"
          color="#EF4444"
          bgColor="#FEF2F2"
        >
          <MetricCard
            title="Net Promoter Score"
            value="72"
            trend="up"
            trendPercent="+8.5%"
            color="#EF4444"
            icon="❤️"
            data={generateTrendData()}
            category="customer"
          />
          <MetricCard
            title="Customer Retention Rate"
            value="94.7%"
            trend="up"
            trendPercent="+1.2%"
            color="#EF4444"
            icon="🔁"
            data={generateTrendData()}
            category="customer"
          />
          <MetricCard
            title="Customer Satisfaction"
            value="4.6/5"
            trend="stable"
            trendPercent="+0.1"
            color="#EF4444"
            icon="😀"
            data={generateTrendData()}
            category="customer"
          />
          <MetricCard
            title="First Response Time"
            value="2.3 hrs"
            trend="down"
            trendPercent="-18.7%"
            color="#EF4444"
            icon="⌚"
            data={generateTrendData()}
            category="customer"
          />
          <MetricCard
            title="Resolution Time"
            value="4.7 hrs"
            trend="down"
            trendPercent="-23.1%"
            color="#EF4444"
            icon="🛠"
            data={generateTrendData()}
            category="customer"
          />
        </MetricSection>

        {/* Operations Metrics */}
        <MetricSection
          title="Operations Metrics"
          color="#6B7280"
          bgColor="#F9FAFB"
        >
          <MetricCard
            title="Inventory Turnover"
            value="8.4x"
            trend="up"
            trendPercent="+12.3%"
            color="#6B7280"
            icon="📦"
            data={generateTrendData()}
            category="operations"
          />
          <MetricCard
            title="Order Fulfillment Time"
            value="1.8 days"
            trend="down"
            trendPercent="-15.6%"
            color="#6B7280"
            icon="📬"
            data={generateTrendData()}
            category="operations"
          />
          <MetricCard
            title="Employee Productivity"
            value="87.2%"
            trend="up"
            trendPercent="+4.8%"
            color="#6B7280"
            icon="⚙"
            data={generateTrendData()}
            category="operations"
          />
          <MetricCard
            title="Utilization Rate"
            value="82.5%"
            trend="stable"
            trendPercent="+0.3%"
            color="#6B7280"
            icon="📐"
            data={generateTrendData()}
            category="operations"
          />
          <MetricCard
            title="Defect Rate"
            value="0.8%"
            trend="down"
            trendPercent="-25.0%"
            color="#6B7280"
            icon="🧪"
            data={generateTrendData()}
            category="operations"
          />
        </MetricSection>
      </div>

      {/* Floating Elements */}
      <ChatAssistant />
      <ComparisonOverlay />
    </div>
  );
};

export default Pulseboard;
