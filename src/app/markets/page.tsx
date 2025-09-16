"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, Star, TrendingUp, TrendingDown, Filter, 
  ArrowUpRight, ArrowDownRight, BarChart3, Info
} from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatPercentage, cn } from "@/lib/utils";

const marketData = [
  {
    id: "NTS-EURC",
    name: "Nordic Tower Stockholm",
    symbol: "NTS",
    price: 105.20,
    change24h: 2.45,
    high24h: 106.50,
    low24h: 102.30,
    volume24h: 2456789,
    marketCap: 45000000,
    yield: 7.5,
    location: "Stockholm",
    type: "Commercial",
    isFavorite: false,
  },
  {
    id: "CPR-EURC",
    name: "Copenhagen Residences",
    symbol: "CPR",
    price: 52.30,
    change24h: -1.23,
    high24h: 53.50,
    low24h: 51.80,
    volume24h: 1234567,
    marketCap: 32000000,
    yield: 6.8,
    location: "Copenhagen",
    type: "Residential",
    isFavorite: true,
  },
  {
    id: "OTP-EURC",
    name: "Oslo Tech Park",
    symbol: "OTP",
    price: 198.50,
    change24h: 5.67,
    high24h: 201.00,
    low24h: 188.20,
    volume24h: 4567890,
    marketCap: 58000000,
    yield: 8.2,
    location: "Oslo",
    type: "Commercial",
    isFavorite: true,
  },
  {
    id: "HMC-EURC",
    name: "Helsinki Marina Complex",
    symbol: "HMC",
    price: 148.90,
    change24h: 3.21,
    high24h: 150.00,
    low24h: 144.50,
    volume24h: 3456789,
    marketCap: 75000000,
    yield: 7.8,
    location: "Helsinki",
    type: "Mixed",
    isFavorite: false,
  },
  {
    id: "MBC-EURC",
    name: "Malmö Business Center",
    symbol: "MBC",
    price: 78.40,
    change24h: -0.89,
    high24h: 79.50,
    low24h: 77.80,
    volume24h: 987654,
    marketCap: 28000000,
    yield: 6.5,
    location: "Malmö",
    type: "Commercial",
    isFavorite: false,
  },
  {
    id: "REA-EURC",
    name: "Reykjavik Eco Apartments",
    symbol: "REA",
    price: 61.20,
    change24h: 1.45,
    high24h: 62.00,
    low24h: 60.00,
    volume24h: 654321,
    marketCap: 24000000,
    yield: 7.2,
    location: "Reykjavik",
    type: "Residential",
    isFavorite: false,
  },
  {
    id: "GBG-EURC",
    name: "Gothenburg Port Complex",
    symbol: "GBG",
    price: 215.80,
    change24h: 7.89,
    high24h: 218.00,
    low24h: 200.50,
    volume24h: 5678901,
    marketCap: 92000000,
    yield: 9.1,
    location: "Gothenburg",
    type: "Commercial",
    isFavorite: true,
  },
  {
    id: "AAR-EURC",
    name: "Aarhus Student Housing",
    symbol: "AAR",
    price: 42.10,
    change24h: -2.34,
    high24h: 43.50,
    low24h: 41.50,
    volume24h: 345678,
    marketCap: 18000000,
    yield: 5.9,
    location: "Aarhus",
    type: "Residential",
    isFavorite: false,
  },
];

const categories = ["All", "Favorites", "Commercial", "Residential", "Mixed"];
const sortOptions = ["Market Cap", "24h Change", "Volume", "Yield", "Price"];

export default function MarketsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Market Cap");
  const [favorites, setFavorites] = useState<string[]>(
    marketData.filter(m => m.isFavorite).map(m => m.id)
  );

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  };

  const filteredMarkets = marketData
    .filter(market => {
      if (searchQuery && !market.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !market.symbol.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (selectedCategory === "Favorites" && !favorites.includes(market.id)) {
        return false;
      }
      if (selectedCategory !== "All" && selectedCategory !== "Favorites" && 
          market.type !== selectedCategory) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "24h Change":
          return b.change24h - a.change24h;
        case "Volume":
          return b.volume24h - a.volume24h;
        case "Yield":
          return b.yield - a.yield;
        case "Price":
          return b.price - a.price;
        default:
          return b.marketCap - a.marketCap;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Property Markets</h1>
            <p className="text-foreground-secondary text-sm">
              Real-time tokenized property trading pairs
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-secondary text-sm">
              <Filter className="w-4 h-4 mr-2" />
              Advanced
            </button>
            <Link href="/trade" className="btn-primary text-sm">
              Start Trading
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-secondary" />
            <input
              type="text"
              placeholder="Search properties or symbols..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded text-sm font-medium transition-all",
                  selectedCategory === category
                    ? "bg-primary text-background"
                    : "bg-background-tertiary text-foreground-secondary hover:text-foreground"
                )}
              >
                {category === "Favorites" && <Star className="w-3 h-3 inline mr-1" />}
                {category}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-background-tertiary border border-border rounded text-sm"
          >
            {sortOptions.map(option => (
              <option key={option} value={option}>Sort: {option}</option>
            ))}
          </select>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <div className="text-foreground-secondary text-xs mb-1">Total Market Cap</div>
            <div className="text-xl font-bold">{formatCurrency(492000000)}</div>
            <div className="flex items-center text-success text-sm mt-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>+4.2%</span>
            </div>
          </div>
          <div className="card p-4">
            <div className="text-foreground-secondary text-xs mb-1">24h Volume</div>
            <div className="text-xl font-bold">{formatCurrency(23456789)}</div>
            <div className="flex items-center text-success text-sm mt-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>+12.5%</span>
            </div>
          </div>
          <div className="card p-4">
            <div className="text-foreground-secondary text-xs mb-1">Active Properties</div>
            <div className="text-xl font-bold">127</div>
            <div className="flex items-center text-success text-sm mt-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>+3</span>
            </div>
          </div>
          <div className="card p-4">
            <div className="text-foreground-secondary text-xs mb-1">Avg. Yield</div>
            <div className="text-xl font-bold">7.2%</div>
            <div className="flex items-center text-danger text-sm mt-1">
              <ArrowDownRight className="w-3 h-3" />
              <span>-0.1%</span>
            </div>
          </div>
        </div>

        {/* Market Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background-tertiary border-b border-border">
                <tr>
                  <th className="text-left p-4 text-xs font-medium text-foreground-secondary"></th>
                  <th className="text-left p-4 text-xs font-medium text-foreground-secondary">Name</th>
                  <th className="text-right p-4 text-xs font-medium text-foreground-secondary">Price</th>
                  <th className="text-right p-4 text-xs font-medium text-foreground-secondary">24h Change</th>
                  <th className="text-right p-4 text-xs font-medium text-foreground-secondary">24h Volume</th>
                  <th className="text-right p-4 text-xs font-medium text-foreground-secondary">Market Cap</th>
                  <th className="text-right p-4 text-xs font-medium text-foreground-secondary">Yield</th>
                  <th className="text-center p-4 text-xs font-medium text-foreground-secondary">Chart</th>
                  <th className="text-center p-4 text-xs font-medium text-foreground-secondary"></th>
                </tr>
              </thead>
              <tbody>
                {filteredMarkets.map((market, index) => (
                  <motion.tr
                    key={market.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border hover:bg-background-tertiary/30 transition-colors"
                  >
                    <td className="p-4">
                      <button
                        onClick={() => toggleFavorite(market.id)}
                        className="text-foreground-secondary hover:text-primary transition-colors"
                      >
                        <Star 
                          className={cn(
                            "w-4 h-4",
                            favorites.includes(market.id) && "fill-primary text-primary"
                          )}
                        />
                      </button>
                    </td>
                    <td className="p-4">
                      <Link href={`/trade/${market.id}`} className="hover:text-primary transition-colors">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-semibold">{market.symbol}/EURC</div>
                            <div className="text-xs text-foreground-secondary">{market.name}</div>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="p-4 text-right font-semibold">
                      €{market.price.toFixed(2)}
                    </td>
                    <td className="p-4 text-right">
                      <span className={cn(
                        "flex items-center justify-end gap-1",
                        market.change24h > 0 ? "text-success" : "text-danger"
                      )}>
                        {market.change24h > 0 ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        {Math.abs(market.change24h).toFixed(2)}%
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {formatCurrency(market.volume24h)}
                    </td>
                    <td className="p-4 text-right">
                      {formatCurrency(market.marketCap)}
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-success font-semibold">
                        {market.yield.toFixed(1)}%
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="inline-flex items-center gap-1">
                        {[...Array(7)].map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              "w-1 rounded-full",
                              market.change24h > 0 ? "bg-success" : "bg-danger"
                            )}
                            style={{
                              height: `${Math.random() * 20 + 10}px`
                            }}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <Link
                        href={`/trade/${market.id}`}
                        className="btn-primary text-xs px-4 py-1.5"
                      >
                        Trade
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-6 card p-4 bg-primary/10 border-primary/30">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-primary mb-1">New to Property Trading?</div>
              <div className="text-sm text-foreground-secondary">
                Learn how tokenized real estate works and start investing with as little as €500.
                <Link href="/how-it-works" className="text-primary hover:underline ml-2">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}