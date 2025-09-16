"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2, Users, Shield, TrendingUp, ArrowRight,
  CheckCircle, FileText, DollarSign, Clock, Globe,
  BookOpen, Play, ChevronRight, Lock, Award,
  BarChart3, Zap, HelpCircle, ChevronDown
} from "lucide-react";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const processSteps = [
    {
      title: "Property Selection",
      icon: Building2,
      description: "We identify premium Nordic commercial properties with stable rental income",
      details: [
        "Properties valued between €10M - €100M",
        "Prime locations in major Nordic cities",
        "Long-term tenants with strong credit ratings",
        "Professional third-party valuation"
      ]
    },
    {
      title: "Legal Structuring",
      icon: FileText,
      description: "Each property is placed in a Special Purpose Vehicle (SPV) for legal clarity",
      details: [
        "SPV owns 100% of the property",
        "Clear legal title and ownership structure",
        "Regulatory compliance with MiCA framework",
        "Audited financial statements"
      ]
    },
    {
      title: "Tokenization",
      icon: Shield,
      description: "Property ownership is divided into digital tokens on the blockchain",
      details: [
        "ERC-3643 compliant security tokens",
        "Each token represents fractional ownership",
        "Smart contracts enforce compliance",
        "Immutable ownership records"
      ]
    },
    {
      title: "Investment",
      icon: Users,
      description: "Investors can buy tokens starting from just €500",
      details: [
        "KYC/AML verification process",
        "Simple bank transfer or crypto payment",
        "Instant token delivery to digital wallet",
        "Full transparency on property details"
      ]
    },
    {
      title: "Trading",
      icon: TrendingUp,
      description: "Trade your tokens 24/7 on our regulated secondary market",
      details: [
        "Real-time price discovery",
        "Deep liquidity pools",
        "Settlement in 10 days or less",
        "No lock-up periods"
      ]
    },
    {
      title: "Returns",
      icon: DollarSign,
      description: "Earn quarterly dividends from rental income plus capital appreciation",
      details: [
        "Quarterly dividend distributions",
        "Average 6-8% annual yield",
        "Automatic reinvestment options",
        "Tax-efficient structure"
      ]
    }
  ];

  const benefits = {
    owners: [
      {
        title: "Unlock Liquidity",
        description: "Access 20-40% of your property value without selling",
        icon: Zap
      },
      {
        title: "Maintain Control",
        description: "Keep majority ownership and management rights",
        icon: Lock
      },
      {
        title: "Reduce Costs",
        description: "Lower transaction costs vs traditional sale",
        icon: DollarSign
      },
      {
        title: "Fast Process",
        description: "Complete tokenization in 30-60 days",
        icon: Clock
      }
    ],
    investors: [
      {
        title: "Low Minimum",
        description: "Start investing with just €500",
        icon: Users
      },
      {
        title: "Diversification",
        description: "Build a portfolio across multiple properties",
        icon: BarChart3
      },
      {
        title: "Liquidity",
        description: "Sell anytime on secondary market",
        icon: TrendingUp
      },
      {
        title: "Passive Income",
        description: "Earn quarterly rental dividends",
        icon: Award
      }
    ]
  };

  const faqs = [
    {
      question: "Is this regulated?",
      answer: "Yes, TerraBlock is fully compliant with the EU's Markets in Crypto-Assets (MiCA) regulation and registered with the Swedish Financial Authority. All property tokens are classified as security tokens and follow strict regulatory guidelines."
    },
    {
      question: "How are properties valued?",
      answer: "Each property undergoes independent valuation by certified Nordic property appraisers. Valuations are updated annually and made publicly available to all token holders."
    },
    {
      question: "What happens if a property is sold?",
      answer: "If a property is sold, proceeds are distributed proportionally to all token holders after deducting any outstanding loans and transaction costs. Token holders vote on major decisions including property sales."
    },
    {
      question: "How do I receive dividends?",
      answer: "Rental income is collected monthly and distributed quarterly to token holders after deducting property management fees and reserves. Dividends are paid directly to your linked bank account or digital wallet."
    },
    {
      question: "What are the fees?",
      answer: "We charge a 2% transaction fee on secondary market trades and a 1.5% annual management fee on property assets. There are no hidden fees - all costs are transparently disclosed."
    },
    {
      question: "Can international investors participate?",
      answer: "Yes, investors from all EU countries can participate. We're working on expanding access to additional countries. All investors must complete KYC/AML verification."
    },
    {
      question: "How is this different from REITs?",
      answer: "Unlike REITs, you own actual property tokens representing direct ownership. You can choose specific properties, trade 24/7, and benefit from blockchain transparency and lower fees."
    },
    {
      question: "What technology do you use?",
      answer: "We use Ethereum Layer 2 scaling solutions for fast, low-cost transactions. Property tokens follow the ERC-3643 standard for compliant security tokens with built-in regulatory features."
    }
  ];

  const timeline = [
    { phase: "Q4 2025", action: "Foundation Setup", description: "Company incorporation & technical architecture" },
    { phase: "Q1 2026", action: "MVP Launch", description: "Pilot program with 3 properties (€25M AUM)" },
    { phase: "Q2 2026", action: "CASP Application", description: "Regulatory compliance & scale to €55M AUM" },
    { phase: "Q3 2026", action: "License & Expansion", description: "CASP approval & reach €80M AUM" },
    { phase: "Q4 2026", action: "Secondary Market", description: "P2P trading launch, €120M AUM target" },
    { phase: "2027", action: "Nordic Dominance", description: "€400M AUM across all Nordic countries" },
    { phase: "2028+", action: "Global Expansion", description: "€1.5B AUM vision across 500+ properties" }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-hover to-[#002850] text-white">
        <div className="container-width py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
              <BookOpen className="w-4 h-4" />
              Educational Guide
            </div>
            
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              How Tokenization Works
            </h1>
            
            <p className="text-xl opacity-90 mb-8">
              Transform illiquid real estate into tradeable digital assets. 
              Learn how we&apos;re revolutionizing property investment in the Nordics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#process" className="px-8 py-4 bg-white text-primary font-semibold rounded-md hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Watch Video Guide
              </Link>
              <Link href="/waitlist" className="px-8 py-4 bg-transparent text-white font-semibold rounded-md border-2 border-white hover:bg-white/10 transition-all">
                Get Started
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Process */}
      <section id="process" className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              The Tokenization Process
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              From property selection to earning dividends - understand each step of the journey
            </p>
          </div>

          {/* Process Steps Navigation */}
          <div className="flex overflow-x-auto gap-2 mb-12 pb-4">
            {processSteps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all whitespace-nowrap ${
                  activeStep === index
                    ? "bg-primary text-white"
                    : "bg-background-secondary hover:bg-background-tertiary"
                }`}
              >
                <step.icon className="w-5 h-5" />
                <span className="font-medium">{step.title}</span>
              </button>
            ))}
          </div>

          {/* Active Step Details */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary-light rounded-xl flex items-center justify-center">
                  {(() => {
                    const Icon = processSteps[activeStep].icon;
                    return Icon ? <Icon className="w-8 h-8 text-primary" /> : null;
                  })()}
                </div>
                <div>
                  <div className="text-sm text-foreground-secondary">Step {activeStep + 1} of 6</div>
                  <h3 className="text-2xl font-heading font-bold">{processSteps[activeStep].title}</h3>
                </div>
              </div>

              <p className="text-lg text-foreground-secondary mb-8">
                {processSteps[activeStep].description}
              </p>

              <div className="space-y-3">
                {processSteps[activeStep].details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  className={`px-6 py-3 rounded-md font-medium transition-all ${
                    activeStep === 0
                      ? "bg-background-secondary text-foreground-secondary cursor-not-allowed"
                      : "bg-background-secondary hover:bg-background-tertiary"
                  }`}
                  disabled={activeStep === 0}
                >
                  Previous
                </button>
                <button
                  onClick={() => setActiveStep(Math.min(processSteps.length - 1, activeStep + 1))}
                  className={`px-6 py-3 rounded-md font-medium transition-all ${
                    activeStep === processSteps.length - 1
                      ? "bg-primary text-white"
                      : "bg-primary text-white hover:bg-primary-hover"
                  }`}
                >
                  {activeStep === processSteps.length - 1 ? "Get Started" : "Next Step"}
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary-light to-white p-8 rounded-2xl border border-primary/20">
                <div className="aspect-video bg-white rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-10 h-10 text-primary ml-1" />
                    </div>
                    <p className="text-foreground-secondary">Interactive Demo Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Comparison */}
      <section className="section-padding bg-background-secondary">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Benefits for Everyone
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Whether you own property or want to invest, tokenization creates value for all participants
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Property Owners */}
            <div className="bg-white rounded-xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-heading font-bold">For Property Owners</h3>
              </div>
              
              <div className="space-y-4">
                {benefits.owners.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4 p-4 rounded-lg hover:bg-background-secondary transition-colors"
                  >
                    <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{benefit.title}</h4>
                      <p className="text-sm text-foreground-secondary">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link href="/property-owners" className="btn-primary w-full text-center mt-6 inline-block">
                Learn More for Owners
              </Link>
            </div>

            {/* Investors */}
            <div className="bg-white rounded-xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-heading font-bold">For Investors</h3>
              </div>
              
              <div className="space-y-4">
                {benefits.investors.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4 p-4 rounded-lg hover:bg-background-secondary transition-colors"
                  >
                    <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{benefit.title}</h4>
                      <p className="text-sm text-foreground-secondary">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link href="/investors" className="btn-primary w-full text-center mt-6 inline-block">
                Learn More for Investors
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Traditional vs Tokenized
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              See how tokenization transforms every aspect of real estate investment
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-6 font-semibold">Aspect</th>
                  <th className="text-center py-4 px-6">
                    <div className="text-danger font-semibold">Traditional</div>
                  </th>
                  <th className="text-center py-4 px-6">
                    <div className="text-success font-semibold">Tokenized</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border hover:bg-background-secondary transition-colors">
                  <td className="py-4 px-6 font-medium">Minimum Investment</td>
                  <td className="text-center py-4 px-6 text-foreground-secondary">€5-10 Million</td>
                  <td className="text-center py-4 px-6 text-success font-semibold">€500</td>
                </tr>
                <tr className="border-b border-border hover:bg-background-secondary transition-colors">
                  <td className="py-4 px-6 font-medium">Time to Sell</td>
                  <td className="text-center py-4 px-6 text-foreground-secondary">12-18 Months</td>
                  <td className="text-center py-4 px-6 text-success font-semibold">10 Days</td>
                </tr>
                <tr className="border-b border-border hover:bg-background-secondary transition-colors">
                  <td className="py-4 px-6 font-medium">Transaction Costs</td>
                  <td className="text-center py-4 px-6 text-foreground-secondary">5-15%</td>
                  <td className="text-center py-4 px-6 text-success font-semibold">2%</td>
                </tr>
                <tr className="border-b border-border hover:bg-background-secondary transition-colors">
                  <td className="py-4 px-6 font-medium">Market Hours</td>
                  <td className="text-center py-4 px-6 text-foreground-secondary">Business Hours</td>
                  <td className="text-center py-4 px-6 text-success font-semibold">24/7</td>
                </tr>
                <tr className="border-b border-border hover:bg-background-secondary transition-colors">
                  <td className="py-4 px-6 font-medium">Diversification</td>
                  <td className="text-center py-4 px-6 text-foreground-secondary">Single Property</td>
                  <td className="text-center py-4 px-6 text-success font-semibold">Multiple Properties</td>
                </tr>
                <tr className="border-b border-border hover:bg-background-secondary transition-colors">
                  <td className="py-4 px-6 font-medium">Transparency</td>
                  <td className="text-center py-4 px-6 text-foreground-secondary">Limited</td>
                  <td className="text-center py-4 px-6 text-success font-semibold">Full Blockchain Transparency</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-background-secondary">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Get answers to common questions about property tokenization
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-lg border border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-background-secondary transition-colors"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${
                    openFaq === idx ? "rotate-180" : ""
                  }`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4">
                    <p className="text-foreground-secondary">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-foreground-secondary mb-4">Still have questions?</p>
            <Link href="/contact" className="btn-secondary inline-flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Join the Revolution
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Be part of the future of Nordic real estate investment
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
              
              {/* Timeline Items */}
              {timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex items-center gap-6 mb-8"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                    idx === 0 ? "bg-primary text-white" : "bg-white border-2 border-border"
                  }`}>
                    <span className="text-2xl font-bold">{idx + 1}</span>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-border flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{item.action}</h3>
                      <span className="text-sm text-primary font-medium">{item.phase}</span>
                    </div>
                    <p className="text-foreground-secondary">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/waitlist" className="btn-primary inline-flex items-center gap-2">
              Join Waitlist Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary-hover to-[#002850] text-white">
        <div className="container-width text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Ready to Transform Your Real Estate Investment?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of forward-thinking investors and property owners
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation" className="px-8 py-4 bg-white text-primary font-semibold rounded-md hover:bg-gray-100 transition-all">
              Schedule Consultation
            </Link>
            <Link href="/resources/whitepaper" className="px-8 py-4 bg-transparent text-white font-semibold rounded-md border-2 border-white hover:bg-white/10 transition-all">
              Download Whitepaper
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}