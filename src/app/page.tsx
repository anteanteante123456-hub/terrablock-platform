"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Building2, TrendingUp, Clock, Shield, ArrowRight, 
  CheckCircle, Users, Globe, Award, ChevronRight,
  FileText, BarChart3, Zap, Lock
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [daysCounter, setDaysCounter] = useState(0);
  const [liquidityAmount, setLiquidityAmount] = useState(0);
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  useEffect(() => {
    // Animate days counter up to 540
    const daysInterval = setInterval(() => {
      setDaysCounter(prev => {
        if (prev >= 540) {
          clearInterval(daysInterval);
          return 540;
        }
        return prev + 3;
      });
    }, 20);

    // Animate liquidity amount up to 70
    const liquidityInterval = setInterval(() => {
      setLiquidityAmount(prev => {
        if (prev >= 70) {
          clearInterval(liquidityInterval);
          return 70;
        }
        return prev + 1;
      });
    }, 30);

    return () => {
      clearInterval(daysInterval);
      clearInterval(liquidityInterval);
    };
  }, []);

  const problems = [
    {
      title: "18-Month Sales Process",
      description: "Traditional commercial property transactions take an average of 540 days",
      icon: Clock,
      stat: "540 days"
    },
    {
      title: "High Entry Barriers",
      description: "Minimum investments of €5-10 million exclude 99% of investors",
      icon: Lock,
      stat: "€10M minimum"
    },
    {
      title: "Illiquid Investment",
      description: "Property owners can't access equity without selling entire asset",
      icon: Building2,
      stat: "0% liquidity"
    },
    {
      title: "Complex Transactions",
      description: "Multiple intermediaries, legal complexity, and high transaction costs",
      icon: FileText,
      stat: "15% costs"
    }
  ];

  const solutions = [
    {
      title: "10-Day Settlement",
      description: "Buy and sell property tokens in days, not years",
      icon: Zap
    },
    {
      title: "€500 Minimum",
      description: "Democratized access to premium Nordic real estate",
      icon: Users
    },
    {
      title: "Instant Liquidity",
      description: "Trade tokens 24/7 on our regulated marketplace",
      icon: TrendingUp
    },
    {
      title: "Smart Contracts",
      description: "Automated compliance and reduced transaction costs",
      icon: Shield
    }
  ];

  const propertyTypes = [
    {
      type: "Office Buildings",
      avgValue: "€25M",
      yield: "6.5%",
      properties: 12
    },
    {
      type: "Retail Centers",
      avgValue: "€40M",
      yield: "7.2%",
      properties: 8
    },
    {
      type: "Logistics Hubs",
      avgValue: "€35M",
      yield: "8.1%",
      properties: 6
    },
    {
      type: "Mixed-Use",
      avgValue: "€55M",
      yield: "6.8%",
      properties: 4
    }
  ];

  const timeline = [
    {
      phase: "Q4 2025",
      title: "Foundation Phase",
      items: ["TerraBlock AB incorporation", "ERC-3643 implementation", "€130K initial funding"]
    },
    {
      phase: "Q1 2026",
      title: "MVP Launch",
      items: ["3 pilot properties (€15M)", "25 beta investors", "€25M AUM target"]
    },
    {
      phase: "Q2 2026",
      title: "CASP Application",
      items: ["Estonian FSA submission", "€55M AUM", "Smart contract audit"]
    },
    {
      phase: "Q3 2026",
      title: "License & Scale",
      items: ["CASP approval", "200+ investors", "€80M AUM"]
    },
    {
      phase: "Q4 2026",
      title: "Secondary Market",
      items: ["P2P trading launch", "20 properties", "€120M AUM"]
    },
    {
      phase: "2027",
      title: "Nordic Dominance",
      items: ["All 5 Nordic countries", "€400M AUM", "Secondary market liquidity"]
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section - Problem Statement */}
      <motion.section 
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-hover to-[#002850]"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-px bg-white/20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container-width relative z-10 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
                The €70 Billion Problem in Nordic Real Estate
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
              Commercial Property Takes
            </h1>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <motion.div 
                className="text-8xl md:text-9xl font-heading font-bold text-[#fcd535]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {daysCounter}
              </motion.div>
              <div className="text-left">
                <div className="text-3xl md:text-4xl font-heading font-bold">Days</div>
                <div className="text-lg opacity-80">Average Time to Sell</div>
              </div>
            </div>

            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
              While €{liquidityAmount} billion sits locked in Nordic commercial real estate,
              owners wait 18 months to access their capital.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/how-it-works" className="group px-8 py-4 bg-white text-primary font-semibold rounded-md hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                Discover the Solution
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/waitlist" className="px-8 py-4 bg-transparent text-white font-semibold rounded-md border-2 border-white hover:bg-white/10 transition-all">
                Join the Waitlist
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronRight className="w-8 h-8 rotate-90 opacity-60" />
          </motion.div>
        </div>
      </motion.section>

      {/* Problem Breakdown */}
      <section className="section-padding bg-background-secondary">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Why Nordic Real Estate Needs Innovation
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Traditional property investment is broken. High barriers, zero liquidity, 
              and months-long processes lock out investors and trap owner equity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg border border-border hover:shadow-lg transition-all"
              >
                <problem.icon className="w-12 h-12 text-danger mb-4" />
                <div className="text-3xl font-bold text-danger mb-2">{problem.stat}</div>
                <h3 className="text-lg font-semibold mb-2">{problem.title}</h3>
                <p className="text-sm text-foreground-secondary">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge badge-primary mb-4">The TerraBlock Solution</span>
              <h2 className="text-4xl font-heading font-bold mb-6">
                Real Estate Investment, Reimagined
              </h2>
              <p className="text-xl text-foreground-secondary mb-8">
                We&apos;re tokenizing Nordic commercial properties, creating a liquid, 
                accessible market that benefits both property owners and investors.
              </p>

              <div className="space-y-6">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={solution.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                      <solution.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{solution.title}</h3>
                      <p className="text-foreground-secondary">{solution.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/how-it-works" className="btn-primary inline-flex items-center gap-2">
                  Learn How It Works
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary-light to-white p-8 rounded-2xl border border-primary/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">10</div>
                    <div className="text-sm text-foreground-secondary">Days to Trade</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">€500</div>
                    <div className="text-sm text-foreground-secondary">Min. Investment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-sm text-foreground-secondary">Market Access</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">2%</div>
                    <div className="text-sm text-foreground-secondary">Transaction Fee</div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-white rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">Traditional Method</span>
                    <span className="text-sm text-danger">540 days</span>
                  </div>
                  <div className="w-full bg-danger-light rounded-full h-3 mb-6">
                    <div className="bg-danger h-3 rounded-full" style={{ width: '100%' }} />
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">With TerraBlock</span>
                    <span className="text-sm text-success">10 days</span>
                  </div>
                  <div className="w-full bg-success-light rounded-full h-3">
                    <div className="bg-success h-3 rounded-full" style={{ width: '10%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="section-padding bg-background-secondary">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Premium Nordic Properties
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Access institutional-grade commercial real estate across the Nordics,
              from Stockholm office towers to Copenhagen retail centers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {propertyTypes.map((type, index) => (
              <motion.div
                key={type.type}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg border border-border hover:shadow-lg transition-all"
              >
                <Building2 className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-semibold mb-3">{type.type}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-foreground-secondary">Avg. Value</span>
                    <span className="text-sm font-semibold">{type.avgValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-foreground-secondary">Avg. Yield</span>
                    <span className="text-sm font-semibold text-success">{type.yield}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-foreground-secondary">Properties</span>
                    <span className="text-sm font-semibold">{type.properties}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/properties" className="btn-secondary inline-flex items-center gap-2">
              View Properties
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="section-padding">
        <div className="container-width">
          <div className="bg-primary-light rounded-2xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Built on Trust & Compliance
              </h2>
              <p className="text-lg text-foreground-secondary">
                Fully regulated under MiCA, partnered with leading Nordic institutions
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">MiCA Compliant</h3>
                <p className="text-sm text-foreground-secondary">
                  Regulated by Swedish Financial Authority
                </p>
              </div>
              <div className="text-center">
                <Award className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Bank Partnerships</h3>
                <p className="text-sm text-foreground-secondary">
                  Tier-1 Nordic banking partners
                </p>
              </div>
              <div className="text-center">
                <Lock className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Asset Security</h3>
                <p className="text-sm text-foreground-secondary">
                  Properties held in regulated SPVs
                </p>
              </div>
              <div className="text-center">
                <Globe className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">EU Passport</h3>
                <p className="text-sm text-foreground-secondary">
                  Access from anywhere in Europe
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="section-padding bg-background-secondary">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Launch Timeline
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Join us early and be part of the Nordic real estate revolution
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {index < timeline.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border z-0" />
                )}
                <div className="bg-white p-6 rounded-lg border border-border relative z-10">
                  <div className="text-primary font-semibold mb-2">{phase.phase}</div>
                  <h3 className="font-semibold mb-4">{phase.title}</h3>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary-hover to-[#002850] text-white">
        <div className="container-width text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Be Part of the €70 Billion Solution
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join forward-thinking property owners and investors who are reshaping Nordic real estate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/property-owners" className="px-8 py-4 bg-white text-primary font-semibold rounded-md hover:bg-gray-100 transition-all">
              I Own Property
            </Link>
            <Link href="/investors" className="px-8 py-4 bg-transparent text-white font-semibold rounded-md border-2 border-white hover:bg-white/10 transition-all">
              I Want to Invest
            </Link>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-3xl font-bold mb-2">€1.5B</div>
              <div className="text-sm opacity-80">2029 AUM Target</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-sm opacity-80">Target Investors</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Q1 2026</div>
              <div className="text-sm opacity-80">MVP Launch</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}