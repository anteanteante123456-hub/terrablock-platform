export interface Property {
  id: string;
  name: string;
  location: {
    address: string;
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  images: string[];
  description: string;
  details: {
    type: "residential" | "commercial" | "mixed";
    size: number;
    yearBuilt: number;
    units?: number;
    floors?: number;
    tenants?: {
      name: string;
      leaseEnd: string;
      rent: number;
    }[];
  };
  financials: {
    totalValue: number;
    tokenPrice: number;
    totalTokens: number;
    availableTokens: number;
    minimumInvestment: number;
    estimatedYield: number;
    annualRent?: number;
    expenses?: number;
  };
  status: "funding" | "funded" | "trading";
  fundingDeadline?: string;
  fundingProgress: number;
  blockchain: {
    contractAddress?: string;
    tokenSymbol?: string;
    network: string;
  };
}