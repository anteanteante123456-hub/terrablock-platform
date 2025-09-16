"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, TrendingUp } from "lucide-react";
import dynamic from "next/dynamic";
import { formatCurrency, formatNumber } from "@/lib/utils";

const ThreeBackground = dynamic(() => import("./ThreeBackground"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent" />,
});

const stats = [
  { label: "Total Value Locked", value: 125000000, prefix: "€", format: "currency" },
  { label: "Properties Tokenized", value: 47, format: "number" },
  { label: "Average Yield", value: 8.2, suffix: "%", format: "percentage" },
];

function AnimatedCounter({ end, prefix = "", suffix = "", format = "number" }: {
  end: number;
  prefix?: string;
  suffix?: string;
  format?: "currency" | "number" | "percentage";
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("stats-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = end / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [end, isVisible]);

  const formatValue = () => {
    if (format === "currency") {
      return formatNumber(Math.floor(count));
    } else if (format === "percentage") {
      return count.toFixed(1);
    }
    return Math.floor(count).toString();
  };

  return (
    <span>
      {prefix}{formatValue()}{suffix}
    </span>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ThreeBackground />
      
      <div className="container mx-auto px-4 z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-primary/20 text-primary-light px-4 py-2 rounded-full mb-6"
          >
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">MiCA Compliant</span>
            <span className="text-xs">•</span>
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Layer 2 Ready</span>
            <span className="animate-pulse w-2 h-2 bg-success rounded-full" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-heading text-5xl md:text-7xl font-bold mb-6"
          >
            Unlock Nordic Real Estate{" "}
            <span className="gradient-text">Liquidity</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Transform illiquid real estate into tradeable digital assets. 
            From 18 months to 10 days with blockchain technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/properties" className="btn-primary inline-flex items-center justify-center">
              Explore Properties
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link href="/how-it-works" className="btn-secondary inline-flex items-center justify-center">
              How It Works
            </Link>
          </motion.div>

          <motion.div
            id="stats-section"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                className="glass p-6 rounded-xl"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  <AnimatedCounter
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    format={stat.format as "currency" | "number" | "percentage"}
                  />
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent pointer-events-none" />
    </section>
  );
}