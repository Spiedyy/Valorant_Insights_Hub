"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { NavbarComp } from "@/app/components/navbar";

export default function AgentComp() {
  const [agent, setAgent] = useState(null);

  const pathname = usePathname();
  const agentUuid = pathname.split("/").pop();

  useEffect(() => {
    try {
      const fetchAgent = async () => {
        const response = await fetch(
          `https://valorant-api.com/v1/agents/${agentUuid}`
        );
        const data = await response.json();
        setAgent(data.data);
      };
      fetchAgent();
    } catch (error) {
      console.error("Failed to fetch agent:", error);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <NavbarComp />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto p-4 transform translate-z-0"
      >
        {agent && (
          <motion.div 
          variants={cardVariants} className="container mx-auto p-4 transform translate-z-0">
            <div className="bg-neutral-900 shadow-md rounded-lg overflow-hidden">
              <img src={agent.displayIcon} alt={agent.displayName} />
              <h1 className="text-2xl font-semibold text-neutral-100 p-4">
                {agent.displayName}
              </h1>
              <p className="text-neutral-200 p-4">{agent.description}</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
