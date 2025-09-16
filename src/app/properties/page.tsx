"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Search, Filter, MapPin, Grid3x3, Map as MapIcon, 
  SlidersHorizontal, X, ChevronDown 
} from "lucide-react";
import PropertiesGrid from "@/components/PropertiesGrid";
import { mockProperties } from "@/data/mockProperties";
import { Property } from "@/types/property";
import { formatCurrency } from "@/lib/utils";

const locations = ["All", "Stockholm", "Copenhagen", "Oslo", "Helsinki", "Malmö", "Reykjavik"];
const propertyTypes = ["All", "Residential", "Commercial", "Mixed"];
const statusOptions = ["All", "Funding", "Funded", "Trading"];
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "yield", label: "Highest Yield" },
  { value: "funded", label: "Most Funded" },
  { value: "closing", label: "Closing Soon" },
];

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [minInvestment, setMinInvestment] = useState(0);
  const [maxInvestment, setMaxInvestment] = useState(10000);
  const [minYield, setMinYield] = useState(0);

  const filteredProperties = useMemo(() => {
    let filtered = [...mockProperties];

    if (searchQuery) {
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.location.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedLocation !== "All") {
      filtered = filtered.filter(p => p.location.city === selectedLocation);
    }

    if (selectedType !== "All") {
      filtered = filtered.filter(p => 
        p.details.type === selectedType.toLowerCase()
      );
    }

    if (selectedStatus !== "All") {
      filtered = filtered.filter(p => 
        p.status === selectedStatus.toLowerCase()
      );
    }

    filtered = filtered.filter(
      p => p.financials.minimumInvestment >= minInvestment &&
           p.financials.minimumInvestment <= maxInvestment &&
           p.financials.estimatedYield >= minYield
    );

    switch (sortBy) {
      case "yield":
        filtered.sort((a, b) => b.financials.estimatedYield - a.financials.estimatedYield);
        break;
      case "funded":
        filtered.sort((a, b) => b.fundingProgress - a.fundingProgress);
        break;
      case "closing":
        filtered = filtered.filter(p => p.fundingDeadline);
        filtered.sort((a, b) => 
          new Date(a.fundingDeadline!).getTime() - new Date(b.fundingDeadline!).getTime()
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedLocation, selectedType, selectedStatus, sortBy, minInvestment, maxInvestment, minYield]);

  return (
    <div className="pt-24 pb-20">
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Investment Properties
          </h1>
          <p className="text-gray-400 text-lg">
            Discover tokenized real estate opportunities across the Nordic region
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="glass rounded-xl p-4 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by property name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-navy-light rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 bg-navy-light rounded-lg text-white hover:bg-card-hover transition-colors flex items-center gap-2"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
                {showFilters && <X className="w-4 h-4" />}
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-navy-light rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="flex gap-1 bg-navy-light rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "grid" ? "bg-primary text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "map" ? "bg-primary text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <MapIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-gray-700"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-navy-light rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {locations.map(location => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Property Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 bg-navy-light rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-navy-light rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Min. Yield (%)</label>
                  <input
                    type="number"
                    value={minYield}
                    onChange={(e) => setMinYield(Number(e.target.value))}
                    min="0"
                    max="15"
                    step="0.5"
                    className="w-full px-3 py-2 bg-navy-light rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Min. Investment: {formatCurrency(minInvestment)}
                  </label>
                  <input
                    type="range"
                    value={minInvestment}
                    onChange={(e) => setMinInvestment(Number(e.target.value))}
                    min="0"
                    max="10000"
                    step="100"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Max. Investment: {formatCurrency(maxInvestment)}
                  </label>
                  <input
                    type="range"
                    value={maxInvestment}
                    onChange={(e) => setMaxInvestment(Number(e.target.value))}
                    min="0"
                    max="10000"
                    step="100"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => {
                    setSelectedLocation("All");
                    setSelectedType("All");
                    setSelectedStatus("All");
                    setMinInvestment(0);
                    setMaxInvestment(10000);
                    setMinYield(0);
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-400">
            Found <span className="text-white font-semibold">{filteredProperties.length}</span> properties
          </p>
        </div>

        {viewMode === "grid" ? (
          <PropertiesGrid properties={filteredProperties} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="glass rounded-xl p-8 text-center"
          >
            <MapIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="font-heading text-xl font-semibold mb-2">Map View Coming Soon</h3>
            <p className="text-gray-400">
              Interactive map view with property locations will be available soon.
            </p>
          </motion.div>
        )}
      </section>
    </div>
  );
}