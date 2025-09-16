"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Clock, Users, ArrowRight } from "lucide-react";
import { formatCurrency, formatPercentage, cn } from "@/lib/utils";
import { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const getStatusColor = (status: Property["status"]) => {
    switch (status) {
      case "funding":
        return "status-funding";
      case "funded":
        return "status-funded";
      case "trading":
        return "status-trading";
      default:
        return "";
    }
  };

  const getStatusLabel = (status: Property["status"]) => {
    switch (status) {
      case "funding":
        return "Funding Now";
      case "funded":
        return "Fully Funded";
      case "trading":
        return "Trading Soon";
      default:
        return status;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative"
    >
      <Link href={`/properties/${property.id}`}>
        <div className="glass glass-hover rounded-xl overflow-hidden card-shadow">
          <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
            {!imageError && property.images[0] ? (
              <Image
                src={property.images[0]}
                alt={property.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-heading font-bold text-primary/20">
                  {property.name.charAt(0)}
                </div>
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span className={cn("status-badge", getStatusColor(property.status))}>
                {getStatusLabel(property.status)}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="p-6">
            <h3 className="font-heading text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {property.name}
            </h3>
            
            <div className="flex items-center text-gray-400 text-sm mb-4">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{property.location.city}, {property.location.country}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-gray-400 text-xs mb-1">Total Value</div>
                <div className="font-semibold text-lg">
                  {formatCurrency(property.financials.totalValue)}
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-xs mb-1">Est. Yield</div>
                <div className="font-semibold text-lg text-success">
                  {formatPercentage(property.financials.estimatedYield)}
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-xs mb-1">Min. Investment</div>
                <div className="font-semibold">
                  {formatCurrency(property.financials.minimumInvestment)}
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-xs mb-1">Available</div>
                <div className="font-semibold">
                  {property.financials.availableTokens} tokens
                </div>
              </div>
            </div>

            {property.status === "funding" && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Funding Progress</span>
                  <span className="font-medium">{property.fundingProgress}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${property.fundingProgress}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-primary-light"
                    style={{ "--progress-width": `${property.fundingProgress}%` } as React.CSSProperties}
                  />
                </div>
                {property.fundingDeadline && (
                  <div className="flex items-center text-xs text-gray-400 mt-2">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>Ends {new Date(property.fundingDeadline).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            )}

            <button className="w-full btn-primary flex items-center justify-center group/btn">
              <span>Quick Invest</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}