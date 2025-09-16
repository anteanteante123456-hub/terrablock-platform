"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { 
  TrendingUp, BarChart3, Wallet, Building2, Users, 
  Download, Globe, Bell, Menu, X, ArrowUpRight, ArrowDownRight,
  Activity, CreditCard, History, Settings, HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency, formatPercentage } from "@/lib/utils";

const navItems = [
  { name: "Markets", href: "/markets", icon: TrendingUp },
  { name: "Trade", href: "/trade", icon: BarChart3 },
  { name: "Properties", href: "/properties", icon: Building2 },
  { name: "Portfolio", href: "/portfolio", icon: Wallet },
  { name: "Earn", href: "/earn", icon: Activity },
];

const marketStats = [
  { label: "24h Volume", value: 15234567, change: 12.5, prefix: "€" },
  { label: "Properties Listed", value: 127, change: 3.2 },
  { label: "Total Investors", value: 48291, change: 8.7 },
  { label: "Avg. Yield", value: 7.8, change: 0.3, suffix: "%" },
];

export default function ExchangeNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Stats Bar */}
      <div className="bg-background border-b border-border py-2 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
              {marketStats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2 whitespace-nowrap">
                  <span className="text-foreground-secondary">{stat.label}:</span>
                  <span className="font-semibold text-foreground">
                    {stat.prefix}{stat.value.toLocaleString()}{stat.suffix}
                  </span>
                  <span className={cn(
                    "flex items-center",
                    stat.change > 0 ? "text-success" : "text-danger"
                  )}>
                    {stat.change > 0 ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {Math.abs(stat.change)}%
                  </span>
                </div>
              ))}
            </div>
            <div className="hidden lg:flex items-center gap-4">
              <button className="text-foreground-secondary hover:text-foreground transition-colors">
                <Globe className="w-4 h-4" />
              </button>
              <button className="text-foreground-secondary hover:text-foreground transition-colors">
                <Download className="w-4 h-4" />
              </button>
              <button className="text-foreground-secondary hover:text-foreground transition-colors relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={cn(
        "sticky top-0 z-50 bg-background-secondary border-b border-border transition-all duration-200",
        scrolled && "shadow-lg"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-background" />
                </div>
                <span className="font-bold text-xl">TerraBlock</span>
                <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-semibold rounded">
                  PRO
                </span>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded transition-all duration-200",
                      pathname === item.href
                        ? "bg-background text-primary"
                        : "text-foreground-secondary hover:text-foreground hover:bg-background/50"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="hidden lg:block">
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="px-3 py-1.5 bg-background border border-border rounded text-sm w-48 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Wallet Connection */}
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  mounted,
                }) => {
                  const ready = mounted;
                  const connected = ready && account && chain;

                  return (
                    <div
                      {...(!ready && {
                        "aria-hidden": true,
                        style: {
                          opacity: 0,
                          pointerEvents: "none",
                          userSelect: "none",
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <button
                              onClick={openConnectModal}
                              className="btn-primary text-sm"
                            >
                              Connect Wallet
                            </button>
                          );
                        }

                        if (chain.unsupported) {
                          return (
                            <button
                              onClick={openChainModal}
                              className="px-4 py-2 bg-danger text-white rounded text-sm"
                            >
                              Wrong network
                            </button>
                          );
                        }

                        return (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={openChainModal}
                              className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded hover:bg-background-tertiary transition-colors"
                            >
                              {chain.hasIcon && chain.iconUrl && (
                                <img
                                  alt={chain.name ?? "Chain icon"}
                                  src={chain.iconUrl}
                                  className="w-4 h-4"
                                />
                              )}
                              <span className="text-sm">{chain.name}</span>
                            </button>

                            <button
                              onClick={openAccountModal}
                              className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded hover:bg-background-tertiary transition-colors"
                            >
                              <Wallet className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                {account.displayName}
                              </span>
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>

              {/* User Menu */}
              <div className="hidden lg:flex items-center gap-2">
                <button className="p-2 hover:bg-background rounded transition-colors">
                  <Settings className="w-4 h-4 text-foreground-secondary" />
                </button>
                <button className="p-2 hover:bg-background rounded transition-colors">
                  <HelpCircle className="w-4 h-4 text-foreground-secondary" />
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background-secondary">
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded transition-all",
                    pathname === item.href
                      ? "bg-background text-primary"
                      : "text-foreground-secondary hover:text-foreground hover:bg-background/50"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}