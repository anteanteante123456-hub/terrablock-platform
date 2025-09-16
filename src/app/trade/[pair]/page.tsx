"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { 
  TrendingUp, TrendingDown, Clock, DollarSign, 
  BarChart3, Settings, Info, Star, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { formatCurrency, formatPercentage, cn } from "@/lib/utils";

const TradingViewChart = dynamic(() => import("@/components/TradingChart"), { 
  ssr: false,
  loading: () => <div className="h-full bg-background-secondary animate-pulse" />
});

const marketData = {
  "NTS-EURC": {
    name: "Nordic Tower Stockholm",
    symbol: "NTS",
    price: 105.20,
    change24h: 2.45,
    high24h: 106.50,
    low24h: 102.30,
    volume24h: 2456789,
    marketCap: 45000000,
    yield: 7.5,
  },
};

const orderBook = {
  asks: [
    { price: 105.25, amount: 234, total: 24628.50 },
    { price: 105.30, amount: 567, total: 59705.10 },
    { price: 105.35, amount: 123, total: 12958.05 },
    { price: 105.40, amount: 890, total: 93806.00 },
    { price: 105.45, amount: 456, total: 48085.20 },
    { price: 105.50, amount: 789, total: 83239.50 },
    { price: 105.55, amount: 321, total: 33881.55 },
    { price: 105.60, amount: 654, total: 69062.40 },
  ],
  bids: [
    { price: 105.15, amount: 432, total: 45424.80 },
    { price: 105.10, amount: 876, total: 92067.60 },
    { price: 105.05, amount: 234, total: 24581.70 },
    { price: 105.00, amount: 567, total: 59535.00 },
    { price: 104.95, amount: 890, total: 93405.50 },
    { price: 104.90, amount: 123, total: 12902.70 },
    { price: 104.85, amount: 456, total: 47811.60 },
    { price: 104.80, amount: 789, total: 82687.20 },
  ],
};

const recentTrades = [
  { price: 105.20, amount: 125, time: "14:32:45", type: "buy" },
  { price: 105.18, amount: 230, time: "14:32:42", type: "sell" },
  { price: 105.21, amount: 450, time: "14:32:38", type: "buy" },
  { price: 105.19, amount: 180, time: "14:32:35", type: "sell" },
  { price: 105.22, amount: 320, time: "14:32:31", type: "buy" },
  { price: 105.20, amount: 275, time: "14:32:28", type: "sell" },
  { price: 105.23, amount: 190, time: "14:32:24", type: "buy" },
  { price: 105.21, amount: 410, time: "14:32:20", type: "buy" },
];

export default function TradingPage() {
  const params = useParams();
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const [tradeType, setTradeType] = useState<"limit" | "market">("limit");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [activeView, setActiveView] = useState<"orderbook" | "trades">("orderbook");

  const pair = params.pair as string;
  const market = marketData[pair as keyof typeof marketData] || marketData["NTS-EURC"];

  const total = price && amount ? (parseFloat(price) * parseFloat(amount)).toFixed(2) : "0.00";

  return (
    <div className="min-h-screen bg-background">
      <div className="grid grid-cols-12 h-[calc(100vh-128px)]">
        {/* Left Sidebar - Order Book */}
        <div className="col-span-3 border-r border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveView("orderbook")}
                className={cn(
                  "px-3 py-1 rounded text-sm font-medium transition-all",
                  activeView === "orderbook" 
                    ? "bg-background-tertiary text-foreground" 
                    : "text-foreground-secondary"
                )}
              >
                Order Book
              </button>
              <button
                onClick={() => setActiveView("trades")}
                className={cn(
                  "px-3 py-1 rounded text-sm font-medium transition-all",
                  activeView === "trades" 
                    ? "bg-background-tertiary text-foreground" 
                    : "text-foreground-secondary"
                )}
              >
                Trades
              </button>
            </div>
            <Settings className="w-4 h-4 text-foreground-secondary cursor-pointer" />
          </div>

          {activeView === "orderbook" ? (
            <div>
              <div className="grid grid-cols-3 text-xs text-foreground-secondary mb-2 px-2">
                <div>Price</div>
                <div className="text-right">Amount</div>
                <div className="text-right">Total</div>
              </div>
              
              {/* Asks */}
              <div className="mb-4">
                {orderBook.asks.slice().reverse().map((ask, i) => (
                  <div 
                    key={i} 
                    className="grid grid-cols-3 text-xs py-1 px-2 hover:bg-background-tertiary cursor-pointer relative"
                  >
                    <div 
                      className="absolute inset-0 bg-danger/10 origin-right"
                      style={{ transform: `scaleX(${ask.amount / 1000})` }}
                    />
                    <div className="text-danger relative z-10">{ask.price.toFixed(2)}</div>
                    <div className="text-right relative z-10">{ask.amount}</div>
                    <div className="text-right relative z-10">{formatCurrency(ask.total)}</div>
                  </div>
                ))}
              </div>

              {/* Current Price */}
              <div className="py-2 px-2 bg-background-tertiary mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-success">€{market.price.toFixed(2)}</span>
                  <span className={cn(
                    "text-xs flex items-center",
                    market.change24h > 0 ? "text-success" : "text-danger"
                  )}>
                    {market.change24h > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(market.change24h)}%
                  </span>
                </div>
              </div>

              {/* Bids */}
              <div>
                {orderBook.bids.map((bid, i) => (
                  <div 
                    key={i} 
                    className="grid grid-cols-3 text-xs py-1 px-2 hover:bg-background-tertiary cursor-pointer relative"
                  >
                    <div 
                      className="absolute inset-0 bg-success/10 origin-right"
                      style={{ transform: `scaleX(${bid.amount / 1000})` }}
                    />
                    <div className="text-success relative z-10">{bid.price.toFixed(2)}</div>
                    <div className="text-right relative z-10">{bid.amount}</div>
                    <div className="text-right relative z-10">{formatCurrency(bid.total)}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-3 text-xs text-foreground-secondary mb-2 px-2">
                <div>Price</div>
                <div className="text-right">Amount</div>
                <div className="text-right">Time</div>
              </div>
              
              {recentTrades.map((trade, i) => (
                <div 
                  key={i} 
                  className="grid grid-cols-3 text-xs py-1 px-2 hover:bg-background-tertiary"
                >
                  <div className={trade.type === "buy" ? "text-success" : "text-danger"}>
                    {trade.price.toFixed(2)}
                  </div>
                  <div className="text-right">{trade.amount}</div>
                  <div className="text-right text-foreground-secondary">{trade.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Center - Chart */}
        <div className="col-span-6 border-r border-border">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold">{market.symbol}/EURC</h1>
                    <Star className="w-4 h-4 text-foreground-secondary cursor-pointer hover:text-primary" />
                  </div>
                  <div className="text-xs text-foreground-secondary">{market.name}</div>
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-xs text-foreground-secondary">24h Change</div>
                    <div className={cn(
                      "font-semibold",
                      market.change24h > 0 ? "text-success" : "text-danger"
                    )}>
                      {market.change24h > 0 ? "+" : ""}{market.change24h}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-foreground-secondary">24h High</div>
                    <div className="font-semibold">€{market.high24h.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-foreground-secondary">24h Low</div>
                    <div className="font-semibold">€{market.low24h.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-foreground-secondary">24h Volume</div>
                    <div className="font-semibold">{formatCurrency(market.volume24h)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[calc(100%-80px)]">
            <TradingViewChart />
          </div>
        </div>

        {/* Right Sidebar - Trading Form */}
        <div className="col-span-3 p-4">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setOrderType("buy")}
              className={cn(
                "flex-1 py-2 rounded font-semibold transition-all",
                orderType === "buy" 
                  ? "bg-success text-white" 
                  : "bg-background-tertiary text-foreground-secondary"
              )}
            >
              Buy
            </button>
            <button
              onClick={() => setOrderType("sell")}
              className={cn(
                "flex-1 py-2 rounded font-semibold transition-all",
                orderType === "sell" 
                  ? "bg-danger text-white" 
                  : "bg-background-tertiary text-foreground-secondary"
              )}
            >
              Sell
            </button>
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setTradeType("limit")}
              className={cn(
                "px-3 py-1 text-xs rounded transition-all",
                tradeType === "limit" 
                  ? "bg-background-tertiary text-foreground" 
                  : "text-foreground-secondary"
              )}
            >
              Limit
            </button>
            <button
              onClick={() => setTradeType("market")}
              className={cn(
                "px-3 py-1 text-xs rounded transition-all",
                tradeType === "market" 
                  ? "bg-background-tertiary text-foreground" 
                  : "text-foreground-secondary"
              )}
            >
              Market
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-foreground-secondary">Available</label>
                <span className="text-xs font-semibold">10,000.00 EURC</span>
              </div>
            </div>

            {tradeType === "limit" && (
              <div>
                <label className="text-xs text-foreground-secondary mb-2 block">Price</label>
                <div className="relative">
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="input-field pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-secondary text-sm">
                    EURC
                  </span>
                </div>
              </div>
            )}

            <div>
              <label className="text-xs text-foreground-secondary mb-2 block">Amount</label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="input-field pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-secondary text-sm">
                  {market.symbol}
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                {[25, 50, 75, 100].map((percent) => (
                  <button
                    key={percent}
                    onClick={() => setAmount(((10000 * percent) / 100 / (parseFloat(price) || market.price)).toFixed(0))}
                    className="flex-1 py-1 bg-background-tertiary hover:bg-background rounded text-xs"
                  >
                    {percent}%
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-foreground-secondary">Total</span>
                <span className="font-semibold">€{total}</span>
              </div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-foreground-secondary">Fee (0.1%)</span>
                <span>€{(parseFloat(total) * 0.001).toFixed(2)}</span>
              </div>
            </div>

            <button
              className={cn(
                "w-full py-3 rounded font-semibold transition-all",
                orderType === "buy" ? "btn-success" : "btn-danger"
              )}
            >
              {orderType === "buy" ? "Buy" : "Sell"} {market.symbol}
            </button>

            <div className="mt-6 p-3 bg-background-tertiary rounded">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-foreground-secondary">Property Yield</span>
                <span className="text-success font-semibold">{market.yield}% APY</span>
              </div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-foreground-secondary">Market Cap</span>
                <span>{formatCurrency(market.marketCap)}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground-secondary">Next Dividend</span>
                <span>15 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}