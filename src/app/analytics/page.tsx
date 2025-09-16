"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, DollarSign, PieChart, BarChart3, 
  Calendar, Download, Filter 
} from "lucide-react";
import DashboardChart, { PropertyDistributionChart } from "@/components/DashboardChart";
import { formatCurrency, formatPercentage } from "@/lib/utils";

const analyticsData = {
  totalInvested: 125000,
  totalReturns: 12500,
  roi: 10.0,
  averageHoldTime: "8 months",
  topPerformer: {
    name: "Oslo Tech Park",
    returns: 15.2,
  },
  yearlyDividends: 9750,
  projectedAnnualReturn: 11250,
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("year");
  const [chartType, setChartType] = useState<"area" | "line" | "bar">("area");

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Investment Analytics
          </h1>
          <p className="text-gray-400 text-lg">
            Deep insights into your real estate portfolio performance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <span className="text-gray-400 text-sm">Total Invested</span>
            </div>
            <div className="text-2xl font-bold">
              {formatCurrency(analyticsData.totalInvested)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <span className="text-gray-400 text-sm">Total Returns</span>
            </div>
            <div className="text-2xl font-bold text-success">
              +{formatCurrency(analyticsData.totalReturns)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-gray-400 text-sm">ROI</span>
            </div>
            <div className="text-2xl font-bold">
              {formatPercentage(analyticsData.roi)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-warning" />
              </div>
              <span className="text-gray-400 text-sm">Avg Hold Time</span>
            </div>
            <div className="text-2xl font-bold">
              {analyticsData.averageHoldTime}
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="lg:col-span-2 glass rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-semibold">Portfolio Growth</h2>
              <div className="flex gap-2">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-1 bg-navy-light rounded-lg text-sm"
                >
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                  <option value="year">Last Year</option>
                  <option value="all">All Time</option>
                </select>
                <select
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value as "area" | "line" | "bar")}
                  className="px-3 py-1 bg-navy-light rounded-lg text-sm"
                >
                  <option value="area">Area Chart</option>
                  <option value="line">Line Chart</option>
                  <option value="bar">Bar Chart</option>
                </select>
              </div>
            </div>
            <DashboardChart type={chartType} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="glass rounded-xl p-6"
          >
            <h2 className="font-heading text-xl font-semibold mb-6">Portfolio Distribution</h2>
            <PropertyDistributionChart />
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="glass rounded-xl p-6"
          >
            <h2 className="font-heading text-xl font-semibold mb-4">Performance Metrics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Yearly Dividends</span>
                <span className="font-semibold">{formatCurrency(analyticsData.yearlyDividends)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Projected Annual Return</span>
                <span className="font-semibold text-success">
                  {formatCurrency(analyticsData.projectedAnnualReturn)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Top Performing Property</span>
                <div className="text-right">
                  <div className="font-semibold">{analyticsData.topPerformer.name}</div>
                  <div className="text-sm text-success">
                    +{formatPercentage(analyticsData.topPerformer.returns)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="glass rounded-xl p-6"
          >
            <h2 className="font-heading text-xl font-semibold mb-4">Export Reports</h2>
            <p className="text-gray-400 mb-6">
              Download detailed reports of your investment performance and tax documents.
            </p>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-navy-light rounded-lg text-left hover:bg-card-hover transition-colors flex items-center justify-between">
                <span>Annual Performance Report</span>
                <Download className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full px-4 py-3 bg-navy-light rounded-lg text-left hover:bg-card-hover transition-colors flex items-center justify-between">
                <span>Tax Documents</span>
                <Download className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full px-4 py-3 bg-navy-light rounded-lg text-left hover:bg-card-hover transition-colors flex items-center justify-between">
                <span>Transaction History</span>
                <Download className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}