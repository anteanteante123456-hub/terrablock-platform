"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Wallet, TrendingUp, TrendingDown, PieChart, Activity,
  DollarSign, Clock, ArrowUpRight, ArrowDownRight, 
  Download, Filter, Search, Copy, ExternalLink,
  Shield, Bell, Settings, ChevronRight
} from "lucide-react";
import { formatCurrency, formatPercentage, formatAddress, cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const PortfolioChart = dynamic(() => import("@/components/DashboardChart"), { 
  ssr: false,
  loading: () => <div className="h-64 bg-background-secondary animate-pulse rounded" />
});

const portfolio = {
  totalValue: 125430.50,
  totalInvested: 100000,
  totalReturn: 25430.50,
  returnPercentage: 25.43,
  dailyChange: 1234.56,
  dailyChangePercentage: 0.99,
  availableBalance: 15670.80,
  pendingDividends: 2450.00,
};

const holdings = [
  {
    symbol: "NTS",
    name: "Nordic Tower Stockholm",
    tokens: 125,
    avgPrice: 100.00,
    currentPrice: 105.20,
    value: 13150.00,
    pnl: 650.00,
    pnlPercentage: 5.20,
    allocation: 10.48,
  },
  {
    symbol: "OTP",
    name: "Oslo Tech Park",
    tokens: 250,
    avgPrice: 190.00,
    currentPrice: 198.50,
    value: 49625.00,
    pnl: 2125.00,
    pnlPercentage: 4.47,
    allocation: 39.54,
  },
  {
    symbol: "HMC",
    name: "Helsinki Marina Complex",
    tokens: 180,
    avgPrice: 145.00,
    currentPrice: 148.90,
    value: 26802.00,
    pnl: 702.00,
    pnlPercentage: 2.69,
    allocation: 21.36,
  },
  {
    symbol: "GBG",
    name: "Gothenburg Port Complex",
    tokens: 100,
    avgPrice: 200.00,
    currentPrice: 215.80,
    value: 21580.00,
    pnl: 1580.00,
    pnlPercentage: 7.90,
    allocation: 17.20,
  },
  {
    symbol: "CPR",
    name: "Copenhagen Residences",
    tokens: 280,
    avgPrice: 50.00,
    currentPrice: 52.30,
    value: 14644.00,
    pnl: 644.00,
    pnlPercentage: 4.60,
    allocation: 11.67,
  },
];

const transactions = [
  { id: "1", type: "buy", symbol: "NTS", amount: 125, price: 100.00, total: 12500.00, date: "2024-02-15 14:32", status: "completed" },
  { id: "2", type: "dividend", symbol: "OTP", amount: 450.00, date: "2024-02-10 09:00", status: "completed" },
  { id: "3", type: "buy", symbol: "OTP", amount: 250, price: 190.00, total: 47500.00, date: "2024-02-05 11:23", status: "completed" },
  { id: "4", type: "sell", symbol: "REA", amount: 50, price: 62.00, total: 3100.00, date: "2024-02-01 16:45", status: "completed" },
  { id: "5", type: "dividend", symbol: "HMC", amount: 320.00, date: "2024-01-31 09:00", status: "completed" },
];

const dividendSchedule = [
  { symbol: "NTS", name: "Nordic Tower", nextPayment: "2024-03-31", estimatedAmount: 234.50, yield: 7.5 },
  { symbol: "OTP", name: "Oslo Tech", nextPayment: "2024-03-31", estimatedAmount: 987.50, yield: 8.2 },
  { symbol: "HMC", name: "Helsinki Marina", nextPayment: "2024-03-31", estimatedAmount: 524.20, yield: 7.8 },
  { symbol: "GBG", name: "Gothenburg Port", nextPayment: "2024-03-31", estimatedAmount: 489.75, yield: 9.1 },
  { symbol: "CPR", name: "Copenhagen Res", nextPayment: "2024-03-31", estimatedAmount: 248.90, yield: 6.8 },
];

export default function PortfolioPage() {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<"overview" | "holdings" | "transactions" | "dividends">("overview");
  const [timeRange, setTimeRange] = useState("1M");

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Wallet className="w-16 h-16 text-foreground-secondary mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Connect Your Wallet</h1>
          <p className="text-foreground-secondary mb-6">Please connect your wallet to view your portfolio</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Portfolio Overview</h1>
            <div className="flex items-center gap-4 text-sm text-foreground-secondary">
              <span className="flex items-center gap-1">
                <Wallet className="w-4 h-4" />
                {formatAddress(address || "")}
              </span>
              <button className="hover:text-foreground transition-colors">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-background-secondary rounded transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-background-secondary rounded transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="btn-secondary text-sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-foreground-secondary">Total Value</span>
              <DollarSign className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold mb-1">{formatCurrency(portfolio.totalValue)}</div>
            <div className={cn(
              "flex items-center text-sm",
              portfolio.dailyChange > 0 ? "text-success" : "text-danger"
            )}>
              {portfolio.dailyChange > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              <span>{formatCurrency(Math.abs(portfolio.dailyChange))} ({portfolio.dailyChangePercentage}%)</span>
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-foreground-secondary">Total P&L</span>
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
            <div className={cn(
              "text-2xl font-bold mb-1",
              portfolio.totalReturn > 0 ? "text-success" : "text-danger"
            )}>
              {portfolio.totalReturn > 0 ? "+" : ""}{formatCurrency(portfolio.totalReturn)}
            </div>
            <div className="text-sm text-foreground-secondary">
              {portfolio.returnPercentage > 0 ? "+" : ""}{portfolio.returnPercentage}% all time
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-foreground-secondary">Available Balance</span>
              <Wallet className="w-4 h-4 text-foreground-secondary" />
            </div>
            <div className="text-2xl font-bold mb-1">{formatCurrency(portfolio.availableBalance)}</div>
            <div className="text-sm text-foreground-secondary">EURC</div>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-foreground-secondary">Pending Dividends</span>
              <Clock className="w-4 h-4 text-warning" />
            </div>
            <div className="text-2xl font-bold mb-1">{formatCurrency(portfolio.pendingDividends)}</div>
            <button className="text-sm text-primary hover:underline">Claim Now →</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-8">
            {/* Tabs */}
            <div className="flex gap-1 mb-4 border-b border-border">
              {["overview", "holdings", "transactions", "dividends"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as "overview" | "holdings" | "transactions" | "dividends")}
                  className={cn(
                    "px-4 py-2 text-sm font-medium capitalize transition-all",
                    activeTab === tab
                      ? "text-primary border-b-2 border-primary"
                      : "text-foreground-secondary hover:text-foreground"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Portfolio Performance</h3>
                    <div className="flex gap-2">
                      {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((range) => (
                        <button
                          key={range}
                          onClick={() => setTimeRange(range)}
                          className={cn(
                            "px-3 py-1 text-xs rounded transition-all",
                            timeRange === range
                              ? "bg-primary text-background"
                              : "bg-background-tertiary hover:bg-background-secondary"
                          )}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>
                  <PortfolioChart />
                </div>

                <div className="card p-6">
                  <h3 className="font-semibold mb-4">Asset Allocation</h3>
                  <div className="space-y-3">
                    {holdings.map((holding) => (
                      <div key={holding.symbol} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center font-bold text-sm">
                            {holding.symbol}
                          </div>
                          <div>
                            <div className="font-medium">{holding.name}</div>
                            <div className="text-xs text-foreground-secondary">
                              {holding.tokens} tokens
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{formatCurrency(holding.value)}</div>
                          <div className="text-xs text-foreground-secondary">
                            {holding.allocation}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "holdings" && (
              <div className="card overflow-hidden">
                <table className="w-full">
                  <thead className="bg-background-tertiary">
                    <tr>
                      <th className="text-left p-4 text-xs font-medium text-foreground-secondary">Asset</th>
                      <th className="text-right p-4 text-xs font-medium text-foreground-secondary">Holdings</th>
                      <th className="text-right p-4 text-xs font-medium text-foreground-secondary">Avg Price</th>
                      <th className="text-right p-4 text-xs font-medium text-foreground-secondary">Current Price</th>
                      <th className="text-right p-4 text-xs font-medium text-foreground-secondary">Value</th>
                      <th className="text-right p-4 text-xs font-medium text-foreground-secondary">P&L</th>
                      <th className="text-center p-4 text-xs font-medium text-foreground-secondary">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdings.map((holding) => (
                      <tr key={holding.symbol} className="border-b border-border hover:bg-background-tertiary/30">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="font-semibold">{holding.symbol}</div>
                            <div className="text-xs text-foreground-secondary">{holding.name}</div>
                          </div>
                        </td>
                        <td className="p-4 text-right">{holding.tokens}</td>
                        <td className="p-4 text-right">€{holding.avgPrice.toFixed(2)}</td>
                        <td className="p-4 text-right">€{holding.currentPrice.toFixed(2)}</td>
                        <td className="p-4 text-right font-semibold">{formatCurrency(holding.value)}</td>
                        <td className="p-4 text-right">
                          <div className={cn(
                            "font-semibold",
                            holding.pnl > 0 ? "text-success" : "text-danger"
                          )}>
                            {holding.pnl > 0 ? "+" : ""}{formatCurrency(holding.pnl)}
                          </div>
                          <div className={cn(
                            "text-xs",
                            holding.pnlPercentage > 0 ? "text-success" : "text-danger"
                          )}>
                            {holding.pnlPercentage > 0 ? "+" : ""}{holding.pnlPercentage}%
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <Link href={`/trade/${holding.symbol}-EURC`} className="text-primary hover:underline text-sm">
                            Trade
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "transactions" && (
              <div className="card overflow-hidden">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-secondary" />
                      <input
                        type="text"
                        placeholder="Search transactions..."
                        className="input-field pl-10 py-2 text-sm"
                      />
                    </div>
                    <button className="btn-secondary text-sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </button>
                  </div>
                </div>
                <table className="w-full">
                  <thead className="bg-background-tertiary">
                    <tr>
                      <th className="text-left p-4 text-xs font-medium text-foreground-secondary">Type</th>
                      <th className="text-left p-4 text-xs font-medium text-foreground-secondary">Asset</th>
                      <th className="text-right p-4 text-xs font-medium text-foreground-secondary">Amount</th>
                      <th className="text-right p-4 text-xs font-medium text-foreground-secondary">Price</th>
                      <th className="text-right p-4 text-xs font-medium text-foreground-secondary">Total</th>
                      <th className="text-left p-4 text-xs font-medium text-foreground-secondary">Date</th>
                      <th className="text-center p-4 text-xs font-medium text-foreground-secondary">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-border hover:bg-background-tertiary/30">
                        <td className="p-4">
                          <span className={cn(
                            "px-2 py-1 rounded text-xs font-medium",
                            tx.type === "buy" ? "bg-success/20 text-success" :
                            tx.type === "sell" ? "bg-danger/20 text-danger" :
                            "bg-primary/20 text-primary"
                          )}>
                            {tx.type}
                          </span>
                        </td>
                        <td className="p-4">{tx.symbol || "—"}</td>
                        <td className="p-4 text-right">{tx.amount}</td>
                        <td className="p-4 text-right">{tx.price ? `€${tx.price.toFixed(2)}` : "—"}</td>
                        <td className="p-4 text-right font-semibold">
                          {tx.total ? formatCurrency(tx.total) : formatCurrency(tx.amount)}
                        </td>
                        <td className="p-4 text-sm">{tx.date}</td>
                        <td className="p-4 text-center">
                          <span className="text-success text-xs">✓ {tx.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "dividends" && (
              <div className="card p-6">
                <h3 className="font-semibold mb-4">Upcoming Dividend Payments</h3>
                <div className="space-y-4">
                  {dividendSchedule.map((dividend) => (
                    <div key={dividend.symbol} className="flex items-center justify-between p-4 bg-background-tertiary rounded">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center font-bold text-sm">
                          {dividend.symbol}
                        </div>
                        <div>
                          <div className="font-medium">{dividend.name}</div>
                          <div className="text-xs text-foreground-secondary">
                            Next payment: {dividend.nextPayment}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-success">
                          {formatCurrency(dividend.estimatedAmount)}
                        </div>
                        <div className="text-xs text-foreground-secondary">
                          {dividend.yield}% APY
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-primary/10 rounded border border-primary/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Total Pending Dividends</div>
                      <div className="text-sm text-foreground-secondary">Next payment in 15 days</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {formatCurrency(portfolio.pendingDividends)}
                      </div>
                      <button className="btn-primary text-sm mt-2">Claim All</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Quick Actions */}
            <div className="card p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/markets" className="flex items-center justify-between p-3 bg-background-tertiary rounded hover:bg-background-secondary transition-colors">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span>Buy Properties</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-foreground-secondary" />
                </Link>
                <button className="w-full flex items-center justify-between p-3 bg-background-tertiary rounded hover:bg-background-secondary transition-colors">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-success" />
                    <span>Deposit EURC</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-foreground-secondary" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-background-tertiary rounded hover:bg-background-secondary transition-colors">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-foreground-secondary" />
                    <span>Withdraw</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-foreground-secondary" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-background-tertiary rounded hover:bg-background-secondary transition-colors">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-primary" />
                    <span>Stake Tokens</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-foreground-secondary" />
                </button>
              </div>
            </div>

            {/* Security */}
            <div className="card p-6">
              <h3 className="font-semibold mb-4">Security</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-success" />
                    <span className="text-sm">2FA Enabled</span>
                  </div>
                  <span className="text-xs text-success">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-foreground-secondary" />
                    <span className="text-sm">Whitelist</span>
                  </div>
                  <button className="text-xs text-primary hover:underline">Setup</button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-success" />
                    <span className="text-sm">Email Verified</span>
                  </div>
                  <span className="text-xs text-success">✓</span>
                </div>
              </div>
            </div>

            {/* Market News */}
            <div className="card p-6">
              <h3 className="font-semibold mb-4">Latest Updates</h3>
              <div className="space-y-3">
                <div className="pb-3 border-b border-border">
                  <div className="text-sm font-medium mb-1">New Property Listed: Bergen Office Complex</div>
                  <div className="text-xs text-foreground-secondary">2 hours ago</div>
                </div>
                <div className="pb-3 border-b border-border">
                  <div className="text-sm font-medium mb-1">Q1 2024 Dividends Distributed</div>
                  <div className="text-xs text-foreground-secondary">5 hours ago</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Platform Maintenance Scheduled</div>
                  <div className="text-xs text-foreground-secondary">1 day ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}