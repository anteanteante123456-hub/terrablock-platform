"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Wallet, TrendingUp, Building2, Clock, ArrowUpRight, ArrowDownRight,
  BarChart3, PieChart, Activity, DollarSign, Home, Settings,
  FileText, Bell, ChevronRight, AlertCircle
} from "lucide-react";
import { formatCurrency, formatPercentage, formatAddress } from "@/lib/utils";
import { mockProperties } from "@/data/mockProperties";
import DashboardChart from "@/components/DashboardChart";

const sidebarItems = [
  { icon: Home, label: "Overview", href: "/dashboard", active: true },
  { icon: Building2, label: "My Properties", href: "/dashboard/properties" },
  { icon: Activity, label: "Transactions", href: "/dashboard/transactions" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: FileText, label: "Documents", href: "/dashboard/documents" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

const mockPortfolio = {
  totalValue: 125000,
  totalProperties: 5,
  pendingDividends: 2450,
  averageYield: 7.8,
  monthlyChange: 5.2,
  yearlyReturn: 9750,
};

const mockTransactions = [
  {
    id: "tx-001",
    type: "investment",
    property: "Nordic Tower Stockholm",
    amount: 5000,
    tokens: 50,
    date: "2024-02-15",
    status: "completed",
  },
  {
    id: "tx-002",
    type: "dividend",
    property: "Copenhagen Residences",
    amount: 450,
    date: "2024-02-10",
    status: "completed",
  },
  {
    id: "tx-003",
    type: "investment",
    property: "Oslo Tech Park",
    amount: 10000,
    tokens: 50,
    date: "2024-02-05",
    status: "completed",
  },
];

const mockOwnedProperties = [
  {
    property: mockProperties[0],
    tokens: 50,
    investedAmount: 5000,
    currentValue: 5260,
    returns: 260,
  },
  {
    property: mockProperties[1],
    tokens: 100,
    investedAmount: 5000,
    currentValue: 5400,
    returns: 400,
  },
  {
    property: mockProperties[2],
    tokens: 50,
    investedAmount: 10000,
    currentValue: 10820,
    returns: 820,
  },
];

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState("overview");

  if (!isConnected) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="font-heading text-3xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-gray-400 mb-8">Please connect your wallet to access your dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64">
            <div className="glass rounded-xl p-6 sticky top-24">
              <div className="mb-6">
                <div className="text-sm text-gray-400 mb-1">Connected Wallet</div>
                <div className="font-mono text-sm">{formatAddress(address || "")}</div>
              </div>
              
              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      item.active
                        ? "bg-primary text-white"
                        : "text-gray-400 hover:text-white hover:bg-navy-light"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="font-heading text-3xl font-bold mb-2">Welcome Back!</h1>
              <p className="text-gray-400">Here&apos;s an overview of your real estate portfolio</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex items-center text-success text-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>{mockPortfolio.monthlyChange}%</span>
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">
                  {formatCurrency(mockPortfolio.totalValue)}
                </div>
                <div className="text-gray-400 text-sm">Portfolio Value</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-success" />
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">
                  {mockPortfolio.totalProperties}
                </div>
                <div className="text-gray-400 text-sm">Properties Owned</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-warning" />
                  </div>
                  <button className="text-xs text-primary hover:text-primary-light transition-colors">
                    Claim
                  </button>
                </div>
                <div className="text-2xl font-bold mb-1">
                  {formatCurrency(mockPortfolio.pendingDividends)}
                </div>
                <div className="text-gray-400 text-sm">Pending Dividends</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">
                  {formatPercentage(mockPortfolio.averageYield)}
                </div>
                <div className="text-gray-400 text-sm">Average Yield</div>
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
                  <h2 className="font-heading text-xl font-semibold">Portfolio Performance</h2>
                  <select className="px-3 py-1 bg-navy-light rounded-lg text-sm">
                    <option>Last 30 Days</option>
                    <option>Last 3 Months</option>
                    <option>Last Year</option>
                  </select>
                </div>
                <DashboardChart />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="glass rounded-xl p-6"
              >
                <h2 className="font-heading text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {mockTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          tx.type === "investment" ? "bg-primary/20" : "bg-success/20"
                        }`}>
                          {tx.type === "investment" ? (
                            <ArrowUpRight className="w-4 h-4 text-primary" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-success" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{tx.property}</div>
                          <div className="text-xs text-gray-400">{tx.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">
                          {tx.type === "investment" ? "-" : "+"}{formatCurrency(tx.amount)}
                        </div>
                        {tx.tokens && (
                          <div className="text-xs text-gray-400">{tx.tokens} tokens</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/dashboard/transactions"
                  className="flex items-center justify-center gap-2 mt-4 text-sm text-primary hover:text-primary-light transition-colors"
                >
                  View All Transactions
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="glass rounded-xl p-6"
            >
              <h2 className="font-heading text-xl font-semibold mb-6">My Properties</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                      <th className="pb-3">Property</th>
                      <th className="pb-3">Tokens</th>
                      <th className="pb-3">Invested</th>
                      <th className="pb-3">Current Value</th>
                      <th className="pb-3">Returns</th>
                      <th className="pb-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOwnedProperties.map((item, index) => (
                      <tr key={index} className="border-b border-gray-700/50">
                        <td className="py-4">
                          <div>
                            <div className="font-medium">{item.property.name}</div>
                            <div className="text-sm text-gray-400">{item.property.location.city}</div>
                          </div>
                        </td>
                        <td className="py-4">{item.tokens}</td>
                        <td className="py-4">{formatCurrency(item.investedAmount)}</td>
                        <td className="py-4 font-semibold">{formatCurrency(item.currentValue)}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-1 text-success">
                            <ArrowUpRight className="w-4 h-4" />
                            <span>{formatCurrency(item.returns)}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <Link
                            href={`/properties/${item.property.id}`}
                            className="text-primary hover:text-primary-light transition-colors"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}