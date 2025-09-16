"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin, Calendar, Home, Users, TrendingUp, Shield,
  ChevronLeft, ChevronRight, Info, Copy, ExternalLink,
  Clock, DollarSign, Building2, Layers
} from "lucide-react";
import { mockProperties } from "@/data/mockProperties";
import { formatCurrency, formatPercentage, formatAddress, cn } from "@/lib/utils";
import InvestmentModal from "@/components/InvestmentModal";

export default function PropertyDetailsPage() {
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "financials" | "documents" | "activity">("overview");

  const property = mockProperties.find(p => p.id === params.id);

  if (!property) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">Property Not Found</h1>
          <p className="text-gray-400 mb-8">The property you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/properties" className="btn-primary">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <Link
          href="/properties"
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Properties
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-xl overflow-hidden mb-8"
            >
              <div className="relative h-96 bg-gradient-to-br from-primary/20 to-primary/5">
                <Image
                  src={property.images[currentImageIndex] || "/placeholder.jpg"}
                  alt={property.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.jpg";
                  }}
                />
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
                <div className="absolute bottom-4 left-4">
                  <span className={cn(
                    "status-badge",
                    property.status === "funding" ? "status-funding" :
                    property.status === "funded" ? "status-funded" : "status-trading"
                  )}>
                    {property.status === "funding" ? "Funding Now" :
                     property.status === "funded" ? "Fully Funded" : "Trading Soon"}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="glass rounded-xl p-6 mb-8"
            >
              <h1 className="font-heading text-3xl font-bold mb-4">{property.name}</h1>
              
              <div className="flex items-center text-gray-400 mb-6">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{property.location.address}, {property.location.city}, {property.location.country}</span>
              </div>

              <p className="text-gray-300 mb-6">{property.description}</p>

              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-all",
                    activeTab === "overview"
                      ? "bg-primary text-white"
                      : "bg-navy-light text-gray-300 hover:text-white"
                  )}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("financials")}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-all",
                    activeTab === "financials"
                      ? "bg-primary text-white"
                      : "bg-navy-light text-gray-300 hover:text-white"
                  )}
                >
                  Financials
                </button>
                <button
                  onClick={() => setActiveTab("documents")}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-all",
                    activeTab === "documents"
                      ? "bg-primary text-white"
                      : "bg-navy-light text-gray-300 hover:text-white"
                  )}
                >
                  Documents
                </button>
                <button
                  onClick={() => setActiveTab("activity")}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-all",
                    activeTab === "activity"
                      ? "bg-primary text-white"
                      : "bg-navy-light text-gray-300 hover:text-white"
                  )}
                >
                  Activity
                </button>
              </div>

              {activeTab === "overview" && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-navy-light rounded-lg p-4">
                    <div className="flex items-center text-gray-400 mb-1">
                      <Building2 className="w-4 h-4 mr-1" />
                      <span className="text-sm">Type</span>
                    </div>
                    <div className="font-semibold capitalize">{property.details.type}</div>
                  </div>
                  <div className="bg-navy-light rounded-lg p-4">
                    <div className="flex items-center text-gray-400 mb-1">
                      <Layers className="w-4 h-4 mr-1" />
                      <span className="text-sm">Size</span>
                    </div>
                    <div className="font-semibold">{property.details.size} m²</div>
                  </div>
                  <div className="bg-navy-light rounded-lg p-4">
                    <div className="flex items-center text-gray-400 mb-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="text-sm">Year Built</span>
                    </div>
                    <div className="font-semibold">{property.details.yearBuilt}</div>
                  </div>
                  <div className="bg-navy-light rounded-lg p-4">
                    <div className="flex items-center text-gray-400 mb-1">
                      <Home className="w-4 h-4 mr-1" />
                      <span className="text-sm">Units</span>
                    </div>
                    <div className="font-semibold">{property.details.units || property.details.floors || "N/A"}</div>
                  </div>
                </div>
              )}

              {activeTab === "financials" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-navy-light rounded-lg p-4">
                      <div className="text-gray-400 text-sm mb-1">Annual Rent</div>
                      <div className="font-semibold text-lg">
                        {formatCurrency(property.financials.annualRent || 0)}
                      </div>
                    </div>
                    <div className="bg-navy-light rounded-lg p-4">
                      <div className="text-gray-400 text-sm mb-1">Operating Expenses</div>
                      <div className="font-semibold text-lg">
                        {formatCurrency(property.financials.expenses || 0)}
                      </div>
                    </div>
                    <div className="bg-navy-light rounded-lg p-4">
                      <div className="text-gray-400 text-sm mb-1">Net Operating Income</div>
                      <div className="font-semibold text-lg text-success">
                        {formatCurrency((property.financials.annualRent || 0) - (property.financials.expenses || 0))}
                      </div>
                    </div>
                    <div className="bg-navy-light rounded-lg p-4">
                      <div className="text-gray-400 text-sm mb-1">Cap Rate</div>
                      <div className="font-semibold text-lg text-success">
                        {formatPercentage(
                          ((property.financials.annualRent || 0) - (property.financials.expenses || 0)) /
                          property.financials.totalValue * 100
                        )}
                      </div>
                    </div>
                  </div>

                  {property.details.tenants && (
                    <div>
                      <h3 className="font-heading text-lg font-semibold mb-3">Current Tenants</h3>
                      <div className="space-y-2">
                        {property.details.tenants.map((tenant, index) => (
                          <div key={index} className="bg-navy-light rounded-lg p-3 flex justify-between items-center">
                            <div>
                              <div className="font-medium">{tenant.name}</div>
                              <div className="text-sm text-gray-400">Lease ends: {tenant.leaseEnd}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">{formatCurrency(tenant.rent)}/mo</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "documents" && (
                <div className="space-y-3">
                  <div className="bg-navy-light rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Property Prospectus</div>
                      <div className="text-sm text-gray-400">Detailed investment information</div>
                    </div>
                    <button className="text-primary hover:text-primary-light transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="bg-navy-light rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Legal Structure</div>
                      <div className="text-sm text-gray-400">SPV documentation</div>
                    </div>
                    <button className="text-primary hover:text-primary-light transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="bg-navy-light rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Smart Contract Audit</div>
                      <div className="text-sm text-gray-400">Security audit report</div>
                    </div>
                    <button className="text-primary hover:text-primary-light transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "activity" && (
                <div className="space-y-3">
                  <div className="text-center py-8 text-gray-400">
                    <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Transaction history will appear here once trading begins</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-xl p-6 sticky top-24"
            >
              <h2 className="font-heading text-xl font-semibold mb-4">Investment Details</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Value</span>
                  <span className="font-semibold">{formatCurrency(property.financials.totalValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Token Price</span>
                  <span className="font-semibold">{formatCurrency(property.financials.tokenPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Tokens</span>
                  <span className="font-semibold">{property.financials.totalTokens.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Available</span>
                  <span className="font-semibold text-success">{property.financials.availableTokens.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Min. Investment</span>
                  <span className="font-semibold">{formatCurrency(property.financials.minimumInvestment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Est. Annual Yield</span>
                  <span className="font-semibold text-success">{formatPercentage(property.financials.estimatedYield)}</span>
                </div>
              </div>

              {property.status === "funding" && property.fundingDeadline && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Funding Progress</span>
                    <span className="font-medium">{property.fundingProgress}%</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary-light transition-all duration-500"
                      style={{ width: `${property.fundingProgress}%` }}
                    />
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>Ends {new Date(property.fundingDeadline).toLocaleDateString()}</span>
                  </div>
                </div>
              )}

              {property.blockchain.contractAddress && (
                <div className="mb-6 p-3 bg-navy-light rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Contract Address</div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm">{formatAddress(property.blockchain.contractAddress)}</span>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={() => setShowInvestModal(true)}
                disabled={property.financials.availableTokens === 0}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {property.financials.availableTokens === 0 ? "Fully Funded" : "Invest Now"}
              </button>

              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                <div className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium text-primary mb-1">MiCA Compliant</div>
                    <div className="text-gray-400">This investment is fully compliant with EU regulations</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {showInvestModal && (
        <InvestmentModal
          property={property}
          onClose={() => setShowInvestModal(false)}
        />
      )}
    </div>
  );
}