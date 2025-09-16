"use client";

import { Property } from "@/types/property";
import PropertyCard from "./PropertyCard";
import { motion } from "framer-motion";

interface PropertiesGridProps {
  properties: Property[];
  title?: string;
  subtitle?: string;
}

export default function PropertiesGrid({ properties, title, subtitle }: PropertiesGridProps) {
  return (
    <section className="py-16">
      {(title || subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {title && (
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property, index) => (
          <PropertyCard key={property.id} property={property} index={index} />
        ))}
      </div>

      {properties.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <p className="text-gray-400 text-lg">No properties found matching your criteria.</p>
        </motion.div>
      )}
    </section>
  );
}