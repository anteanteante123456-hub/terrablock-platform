"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp, Shield, DollarSign, Users, ArrowRight,
  CheckCircle, BarChart3, Building2, Globe, Award,
  Clock, Zap, Calculator, FileText, ChevronRight,
  PieChart, Lock, Wallet, CreditCard
} from "lucide-react";

export default function Investors() {
  const [investmentAmount, setInvestmentAmount] = useState("10000");
  const [activeTab, setActiveTab] = useState<"benefits" | "process" | "portfolio">("benefits");

  const benefits = [
    {
      icon: DollarSign,
      title: "Start from €500",
      description: "Access institutional-grade real estate with minimal capital",
      highlight: "1000x lower than traditional"
    },
    {
      icon: TrendingUp,
      title: "6-8% Annual Yield",
      description: "Earn quarterly dividends from rental income",
      highlight: "Paid every 3 months"
    },
    {
      icon: Clock,
      title: "24/7 Liquidity",
      description: "Trade your tokens anytime on our secondary market",
      highlight: "No lock-up periods"
    },
    {
      icon: Shield,
      title: "MiCA Regulated",
      description: "Full regulatory compliance and investor protection",
      highlight: "Swedish FSA supervised"
    },
    {
      icon: Building2,
      title: "Direct Ownership",
      description: "Own actual property shares, not just fund units",
      highlight: "Real asset backing"
    },
    {
      icon: Globe,
      title: "Portfolio Diversification",
      description: "Invest across multiple properties and locations",
      highlight: "Reduce concentration risk"
    }
  ];

  const investmentProcess = [
    {
      step: "1",
      title: "Create Account",
      description: "Simple KYC process takes 5 minutes",
      time: "5 min"
    },
    {
      step: "2",
      title: "Browse Properties",
      description: "Explore vetted commercial properties",
      time: "Your pace"
    },
    {
      step: "3",
      title: "Analyze Returns",
      description: "Review detailed financial projections",
      time: "15 min"
    },
    {
      step: "4",
      title: "Invest",
      description: "Simple bank transfer or card payment",
      time: "2 min"
    },
    {
      step: "5",
      title: "Receive Tokens",
      description: "Digital tokens sent to your wallet",
      time: "Instant"
    },
    {
      step: "6",
      title: "Earn & Trade",
      description: "Collect dividends or sell anytime",
      time: "Ongoing"
    }
  ];

  const samplePortfolio = [
    {
      property: "Stockholm Office Tower",
      location: "Stockholm, Sweden",
      investment: "€5,000",
      tokens: 50,
      yield: "6.8%",
      value: "€5,340"
    },
    {
      property: "Copenhagen Retail Center",
      location: "Copenhagen, Denmark",
      investment: "€3,000",
      tokens: 30,
      yield: "7.2%",
      value: "€3,216"
    },
    {
      property: "Oslo Logistics Hub",
      location: "Oslo, Norway",
      investment: "€2,000",
      tokens: 20,
      yield: "8.1%",
      value: "€2,162"
    }
  ];

  const riskFactors = [
    {
      risk: "Market Risk",
      mitigation: "Diversify across multiple properties and locations"
    },
    {
      risk: "Liquidity Risk",
      mitigation: "Secondary market provides exit opportunities"
    },
    {
      risk: "Property Risk",
      mitigation: "Professional management and insurance coverage"
    },
    {
      risk: "Regulatory Risk",
      mitigation: "Full MiCA compliance and legal structure"
    }
  ];

  const calculateReturns = (amount: string) => {
    const principal = parseFloat(amount) || 0;
    const annualYield = 0.072; // 7.2% average
    const quarterlyDividend = (principal * annualYield) / 4;
    const annualDividend = principal * annualYield;
    const fiveYearValue = principal * Math.pow(1.072, 5);
    
    return {
      quarterly: quarterlyDividend.toFixed(2),
      annual: annualDividend.toFixed(2),
      fiveYear: fiveYearValue.toFixed(2)
    };
  };

  const returns = calculateReturns(investmentAmount);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-hover to-[#002850] text-white">
        <div className="container-width py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
              <Users className="w-4 h-4" />
              For Investors
            </div>
            
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Invest in Nordic Real Estate from €500
            </h1>
            
            <p className="text-xl opacity-90 mb-8">
              Access institutional-grade commercial properties previously reserved for the ultra-wealthy. 
              Earn 6-8% annual yields with full liquidity.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-3xl font-bold mb-1">€500</div>
                <div className="text-sm opacity-80">Minimum Investment</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-3xl font-bold mb-1">6-8%</div>
                <div className="text-sm opacity-80">Annual Yield</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-3xl font-bold mb-1">24/7</div>
                <div className="text-sm opacity-80">Trading Available</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/properties" className="px-8 py-4 bg-white text-primary font-semibold rounded-md hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2">
                <Building2 className="w-5 h-5" />
                Browse Properties
              </Link>
              <Link href="#calculator" className="px-8 py-4 bg-transparent text-white font-semibold rounded-md border-2 border-white hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2">
                <Calculator className="w-5 h-5" />
                Calculate Returns
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Why Invest Through TerraBlock?
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Democratizing access to premium Nordic commercial real estate
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl border border-border hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-foreground-secondary mb-4">{benefit.description}</p>
                <div className="text-sm font-semibold text-primary">{benefit.highlight}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="section-padding bg-background-secondary">
        <div className="container-width">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Your Investment Journey
            </h2>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveTab("benefits")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === "benefits"
                  ? "bg-primary text-white"
                  : "bg-white hover:bg-background-tertiary"
              }`}
            >
              Investment Process
            </button>
            <button
              onClick={() => setActiveTab("portfolio")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === "portfolio"
                  ? "bg-primary text-white"
                  : "bg-white hover:bg-background-tertiary"
              }`}
            >
              Sample Portfolio
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "benefits" && (
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {investmentProcess.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 border border-border relative"
                  >
                    <div className="absolute -top-3 -left-3 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                    <div className="ml-6">
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-foreground-secondary mb-3">{step.description}</p>
                      <div className="text-xs text-primary font-medium">⏱ {step.time}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "portfolio" && (
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-xl p-8 border border-border">
                <h3 className="text-2xl font-heading font-bold mb-6">
                  Example €10,000 Portfolio
                </h3>
                
                <div className="space-y-4 mb-8">
                  {samplePortfolio.map((property, index) => (
                    <div key={index} className="p-4 bg-background-secondary rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{property.property}</h4>
                          <p className="text-sm text-foreground-secondary">{property.location}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-success">{property.value}</div>
                          <div className="text-sm text-foreground-secondary">+{property.yield} APY</div>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground-secondary">Investment: {property.investment}</span>
                        <span className="text-foreground-secondary">Tokens: {property.tokens}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-6">
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">€10,718</div>
                      <div className="text-sm text-foreground-secondary">Current Value</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-success">+7.18%</div>
                      <div className="text-sm text-foreground-secondary">Total Return</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">€180</div>
                      <div className="text-sm text-foreground-secondary">Quarterly Dividend</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Returns Calculator */}
      <section id="calculator" className="section-padding">
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold mb-6">
                Calculate Your Returns
              </h2>
              <p className="text-xl text-foreground-secondary mb-8">
                See how your investment could grow with TerraBlock&apos;s average 7.2% annual yield 
                from Nordic commercial real estate.
              </p>

              <div className="bg-white rounded-xl p-8 border border-border">
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Investment Amount (€)</label>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    className="input-field"
                    min="500"
                    step="100"
                  />
                  <p className="text-xs text-foreground-secondary mt-1">Minimum €500</p>
                </div>

                <div className="space-y-4 pt-6 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground-secondary">Quarterly Dividend</span>
                    <span className="text-xl font-semibold">€{returns.quarterly}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground-secondary">Annual Income</span>
                    <span className="text-xl font-semibold text-success">€{returns.annual}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground-secondary">5-Year Value</span>
                    <span className="text-xl font-semibold text-primary">€{returns.fiveYear}</span>
                  </div>
                </div>

                <Link href="/properties" className="btn-primary w-full mt-6 text-center inline-block">
                  Start Investing Now
                </Link>
              </div>
            </div>

            <div>
              <div className="bg-primary-light rounded-xl p-8">
                <h3 className="text-2xl font-heading font-bold mb-6">
                  Investment Features
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Quarterly Dividends</h4>
                      <p className="text-sm text-foreground-secondary">
                        Receive rental income distributions every 3 months
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Capital Appreciation</h4>
                      <p className="text-sm text-foreground-secondary">
                        Benefit from property value increases over time
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Full Transparency</h4>
                      <p className="text-sm text-foreground-secondary">
                        Access detailed property reports and financials
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Professional Management</h4>
                      <p className="text-sm text-foreground-secondary">
                        Properties managed by leading Nordic firms
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Disclosure */}
      <section className="section-padding bg-background-secondary">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-6 text-center">
              Understanding the Risks
            </h2>
            
            <div className="bg-white rounded-xl p-8 border border-border">
              <p className="text-foreground-secondary mb-6">
                All investments carry risk. We believe in full transparency about potential risks 
                and how we work to mitigate them.
              </p>
              
              <div className="space-y-4">
                {riskFactors.map((factor, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-background-secondary rounded-lg">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">{factor.risk}</h4>
                      <p className="text-sm text-foreground-secondary">{factor.mitigation}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-warning-light rounded-lg">
                <p className="text-sm">
                  <strong>Important:</strong> Past performance does not guarantee future results. 
                  Property values can go down as well as up. Only invest what you can afford to lose.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Steps */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Ready to Start?
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Join thousands of investors already earning passive income from Nordic real estate
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">1. Sign Up</h3>
                <p className="text-sm text-foreground-secondary">
                  Create your account and complete KYC in minutes
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">2. Fund Account</h3>
                <p className="text-sm text-foreground-secondary">
                  Add funds via bank transfer or card
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">3. Invest</h3>
                <p className="text-sm text-foreground-secondary">
                  Choose properties and start earning
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary-hover to-[#002850] text-white">
        <div className="container-width text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Start Building Your Real Estate Portfolio Today
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join the waitlist for early access and exclusive launch benefits
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/waitlist" className="px-8 py-4 bg-white text-primary font-semibold rounded-md hover:bg-gray-100 transition-all inline-flex items-center gap-2">
              <Users className="w-5 h-5" />
              Join Waitlist
            </Link>
            <Link href="/resources/investor-guide" className="px-8 py-4 bg-transparent text-white font-semibold rounded-md border-2 border-white hover:bg-white/10 transition-all inline-flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Download Investor Guide
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <PieChart className="w-10 h-10 mx-auto mb-3 opacity-80" />
              <div className="text-2xl font-bold mb-1">€500</div>
              <div className="text-sm opacity-80">Min. Investment</div>
            </div>
            <div>
              <Award className="w-10 h-10 mx-auto mb-3 opacity-80" />
              <div className="text-2xl font-bold mb-1">10,000+</div>
              <div className="text-sm opacity-80">Target Investors</div>
            </div>
            <div>
              <TrendingUp className="w-10 h-10 mx-auto mb-3 opacity-80" />
              <div className="text-2xl font-bold mb-1">7.2%</div>
              <div className="text-sm opacity-80">Avg. Annual Yield</div>
            </div>
            <div>
              <Globe className="w-10 h-10 mx-auto mb-3 opacity-80" />
              <div className="text-2xl font-bold mb-1">500+</div>
              <div className="text-sm opacity-80">Properties by 2029</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}