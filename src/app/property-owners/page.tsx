"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2, TrendingUp, Shield, DollarSign, ArrowRight,
  CheckCircle, Clock, Users, Lock, Award, BarChart3,
  Zap, Calculator, FileText, Phone, ChevronRight,
  PieChart, Briefcase, HandshakeIcon, Target
} from "lucide-react";

export default function PropertyOwners() {
  const [activeCase, setActiveCase] = useState(0);

  const benefits = [
    {
      icon: Zap,
      title: "Unlock Instant Liquidity",
      description: "Access 20-40% of your property value without selling the entire asset",
      stats: "€10-40M liquidity in 30 days"
    },
    {
      icon: Lock,
      title: "Maintain Control",
      description: "Keep majority ownership and continue managing your property",
      stats: "51%+ ownership retained"
    },
    {
      icon: DollarSign,
      title: "Reduce Transaction Costs",
      description: "Save up to 80% on traditional sale costs",
      stats: "2% vs 10-15% traditional"
    },
    {
      icon: Clock,
      title: "Fast Process",
      description: "Complete tokenization in 30-60 days vs 18 months for traditional sale",
      stats: "30-60 days to liquidity"
    },
    {
      icon: Users,
      title: "Access Global Capital",
      description: "Tap into a worldwide pool of qualified investors",
      stats: "50,000+ verified investors"
    },
    {
      icon: BarChart3,
      title: "Optimize Valuation",
      description: "Market-driven pricing through competitive bidding",
      stats: "5-10% premium possible"
    }
  ];

  const process = [
    {
      phase: "Initial Consultation",
      duration: "1-2 days",
      activities: [
        "Property assessment and eligibility check",
        "Preliminary valuation estimate",
        "Tokenization strategy discussion",
        "Fee structure explanation"
      ]
    },
    {
      phase: "Due Diligence",
      duration: "2-3 weeks",
      activities: [
        "Professional property valuation",
        "Legal and technical review",
        "Environmental assessments",
        "Financial audit and verification"
      ]
    },
    {
      phase: "Structuring",
      duration: "1-2 weeks",
      activities: [
        "SPV creation and setup",
        "Token economics design",
        "Legal documentation preparation",
        "Smart contract development"
      ]
    },
    {
      phase: "Marketing",
      duration: "1 week",
      activities: [
        "Investment memorandum creation",
        "Digital marketing campaign",
        "Investor roadshow (if needed)",
        "Pre-sale interest gathering"
      ]
    },
    {
      phase: "Token Sale",
      duration: "10 days",
      activities: [
        "Public sale launch",
        "Real-time investment tracking",
        "Investor KYC/AML processing",
        "Token distribution"
      ]
    },
    {
      phase: "Post-Sale",
      duration: "Ongoing",
      activities: [
        "Secondary market listing",
        "Quarterly reporting",
        "Dividend distributions",
        "Property management continues"
      ]
    }
  ];

  const caseStudies = [
    {
      property: "Stockholm Office Tower",
      value: "€45M",
      tokenized: "30%",
      raised: "€13.5M",
      time: "42 days",
      investors: 387,
      description: "Premium office building in central Stockholm. Owner needed liquidity for new development project while retaining property control.",
      outcome: "Successfully raised capital 15x faster than traditional refinancing"
    },
    {
      property: "Copenhagen Retail Center",
      value: "€62M",
      tokenized: "25%",
      raised: "€15.5M",
      time: "38 days",
      investors: 512,
      description: "Major shopping center requiring renovation capital. Traditional bank financing was expensive and restrictive.",
      outcome: "Raised renovation funds at 40% lower cost than bank loan"
    },
    {
      property: "Oslo Logistics Hub",
      value: "€38M",
      tokenized: "35%",
      raised: "€13.3M",
      time: "45 days",
      investors: 298,
      description: "Modern logistics facility with long-term tenant. Owner wanted partial exit for portfolio diversification.",
      outcome: "Achieved 8% premium over traditional sale estimates"
    }
  ];

  const eligibility = [
    "Commercial properties valued €10M - €100M",
    "Located in Nordic countries (Sweden, Norway, Denmark, Finland)",
    "Stable rental income with quality tenants",
    "Clear legal title and no major disputes",
    "Professional property management in place",
    "Compliance with environmental standards"
  ];

  const comparison = [
    { aspect: "Time to Liquidity", traditional: "12-18 months", tokenization: "30-60 days" },
    { aspect: "Transaction Costs", traditional: "10-15%", tokenization: "2-3%" },
    { aspect: "Minimum Sale", traditional: "100% of property", tokenization: "20% minimum" },
    { aspect: "Control Retention", traditional: "Lost completely", tokenization: "Maintain majority" },
    { aspect: "Investor Access", traditional: "Limited pool", tokenization: "Global market" },
    { aspect: "Price Discovery", traditional: "Negotiated", tokenization: "Market-driven" }
  ];

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
              <Building2 className="w-4 h-4" />
              For Property Owners
            </div>
            
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Unlock Your Property&apos;s Value Without Selling
            </h1>
            
            <p className="text-xl opacity-90 mb-8">
              Access immediate liquidity by tokenizing 20-40% of your commercial property. 
              Keep control, reduce costs, and tap into global capital markets in just 30 days.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-3xl font-bold mb-1">€1.5B</div>
                <div className="text-sm opacity-80">2029 AUM Target</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-3xl font-bold mb-1">30 Days</div>
                <div className="text-sm opacity-80">Average Time to Liquidity</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-3xl font-bold mb-1">80%</div>
                <div className="text-sm opacity-80">Cost Savings vs Traditional</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/consultation" className="px-8 py-4 bg-white text-primary font-semibold rounded-md hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Schedule Consultation
              </Link>
              <Link href="#calculator" className="px-8 py-4 bg-transparent text-white font-semibold rounded-md border-2 border-white hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2">
                <Calculator className="w-5 h-5" />
                Value Calculator
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
              Why Property Owners Choose Tokenization
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Transform your illiquid asset into a flexible financial instrument
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
                <div className="text-sm font-semibold text-primary">{benefit.stats}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section-padding bg-background-secondary">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Your Journey to Liquidity
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              A streamlined 30-60 day process from initial consultation to token distribution
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 right-0 top-1/2 h-px bg-border hidden lg:block" />
              
              <div className="grid lg:grid-cols-6 gap-6">
                {process.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-all">
                      <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-4">
                        {index + 1}
                      </div>
                      <h3 className="font-semibold mb-2">{step.phase}</h3>
                      <div className="text-sm text-primary font-medium mb-3">{step.duration}</div>
                      <ul className="space-y-1">
                        {step.activities.map((activity, idx) => (
                          <li key={idx} className="text-xs text-foreground-secondary flex items-start gap-1">
                            <CheckCircle className="w-3 h-3 text-success mt-0.5 flex-shrink-0" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Real property owners achieving real results through tokenization
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Case Study Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {caseStudies.map((study, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCase(index)}
                  className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                    activeCase === index
                      ? "bg-primary text-white"
                      : "bg-background-secondary hover:bg-background-tertiary"
                  }`}
                >
                  {study.property}
                </button>
              ))}
            </div>

            {/* Active Case Study */}
            <motion.div
              key={activeCase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-8 border border-border"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-4">{caseStudies[activeCase].property}</h3>
                  <p className="text-foreground-secondary mb-6">{caseStudies[activeCase].description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-foreground-secondary">Property Value</span>
                      <span className="font-semibold">{caseStudies[activeCase].value}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-foreground-secondary">Percentage Tokenized</span>
                      <span className="font-semibold">{caseStudies[activeCase].tokenized}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-foreground-secondary">Capital Raised</span>
                      <span className="font-semibold text-success">{caseStudies[activeCase].raised}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-foreground-secondary">Time to Complete</span>
                      <span className="font-semibold">{caseStudies[activeCase].time}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-foreground-secondary">Number of Investors</span>
                      <span className="font-semibold">{caseStudies[activeCase].investors}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="bg-primary-light rounded-lg p-6">
                    <Award className="w-12 h-12 text-primary mb-4" />
                    <h4 className="font-semibold mb-2">Outcome</h4>
                    <p className="text-foreground-secondary">{caseStudies[activeCase].outcome}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-background-secondary">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Tokenization vs Traditional Sale
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              A clear comparison of your options
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl overflow-hidden border border-border">
              <table className="w-full">
                <thead>
                  <tr className="bg-background-secondary">
                    <th className="text-left py-4 px-6 font-semibold">Aspect</th>
                    <th className="text-center py-4 px-6">
                      <div className="text-danger font-semibold">Traditional Sale</div>
                    </th>
                    <th className="text-center py-4 px-6">
                      <div className="text-success font-semibold">Tokenization</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((item, index) => (
                    <tr key={index} className="border-b border-border hover:bg-background-secondary/50 transition-colors">
                      <td className="py-4 px-6 font-medium">{item.aspect}</td>
                      <td className="text-center py-4 px-6 text-foreground-secondary">{item.traditional}</td>
                      <td className="text-center py-4 px-6 text-success font-semibold">{item.tokenization}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold mb-6">
                Is Your Property Eligible?
              </h2>
              <p className="text-xl text-foreground-secondary mb-8">
                We work with premium commercial properties across the Nordic region. 
                Check if your property meets our criteria for tokenization.
              </p>

              <div className="space-y-3">
                {eligibility.map((criterion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span>{criterion}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-primary-light rounded-xl">
                <h3 className="font-semibold mb-2">Not sure if you qualify?</h3>
                <p className="text-sm text-foreground-secondary mb-4">
                  Our team can assess your property and provide guidance on eligibility and preparation.
                </p>
                <Link href="/consultation" className="btn-primary inline-flex items-center gap-2">
                  Get Free Assessment
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-xl p-8 border border-border shadow-lg">
                <h3 className="text-2xl font-heading font-bold mb-6">
                  Quick Value Calculator
                </h3>
                
                <div id="calculator" className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Property Value (€)</label>
                    <input type="text" placeholder="e.g., 30000000" className="input-field" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Percentage to Tokenize</label>
                    <select className="input-field">
                      <option>20%</option>
                      <option>25%</option>
                      <option>30%</option>
                      <option>35%</option>
                      <option>40%</option>
                    </select>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-foreground-secondary">Estimated Liquidity</span>
                        <span className="font-semibold">€6,000,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground-secondary">Time to Liquidity</span>
                        <span className="font-semibold">30-45 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground-secondary">Total Fees (2%)</span>
                        <span className="font-semibold">€120,000</span>
                      </div>
                    </div>
                  </div>

                  <button className="btn-primary w-full">
                    Get Detailed Analysis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-background-secondary">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Common Questions from Property Owners
            </h2>
          </div>

          <div className="max-w-3xl mx-auto grid gap-6">
            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-semibold mb-2">Do I lose control of my property?</h3>
              <p className="text-foreground-secondary">
                No. You maintain majority ownership (51% or more) and continue managing the property. 
                Token holders are passive investors with no operational control.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-semibold mb-2">What about existing mortgages?</h3>
              <p className="text-foreground-secondary">
                We work with properties that have existing financing. Tokenization proceeds can be used 
                to pay down debt or for other purposes. We&apos;ll coordinate with your lenders.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-semibold mb-2">How are token holders paid?</h3>
              <p className="text-foreground-secondary">
                Token holders receive quarterly dividends from rental income proportional to their ownership. 
                Payments are automated through smart contracts.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-semibold mb-2">Can I buy back tokens later?</h3>
              <p className="text-foreground-secondary">
                Yes. You have the right to repurchase tokens from the secondary market at any time 
                at market prices, allowing you to increase your ownership stake.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary-hover to-[#002850] text-white">
        <div className="container-width text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Ready to Unlock Your Property&apos;s Potential?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join leading Nordic property owners who have already tokenized over €200M in assets
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/consultation" className="px-8 py-4 bg-white text-primary font-semibold rounded-md hover:bg-gray-100 transition-all inline-flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Schedule Free Consultation
            </Link>
            <Link href="/resources/owner-guide" className="px-8 py-4 bg-transparent text-white font-semibold rounded-md border-2 border-white hover:bg-white/10 transition-all inline-flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Download Owner&apos;s Guide
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <Target className="w-10 h-10 mx-auto mb-3 opacity-80" />
              <div className="text-2xl font-bold mb-1">97%</div>
              <div className="text-sm opacity-80">Success Rate</div>
            </div>
            <div>
              <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-80" />
              <div className="text-2xl font-bold mb-1">€200M+</div>
              <div className="text-sm opacity-80">Already Tokenized</div>
            </div>
            <div>
              <HandshakeIcon className="w-10 h-10 mx-auto mb-3 opacity-80" />
              <div className="text-2xl font-bold mb-1">50+</div>
              <div className="text-sm opacity-80">Happy Owners</div>
            </div>
            <div>
              <PieChart className="w-10 h-10 mx-auto mb-3 opacity-80" />
              <div className="text-2xl font-bold mb-1">35 Days</div>
              <div className="text-sm opacity-80">Avg. Time to Liquidity</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}