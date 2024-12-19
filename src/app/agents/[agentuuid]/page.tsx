"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { NavbarComp } from "@/app/components/navbar";

export default function AgentComp() {
  const [agent, setAgent] = useState(null);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const buttons = ["Description", "Role", "Ability's"];

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
        className="container mx-auto p-4 transform"
      >
        {agent && (
          <motion.div
            variants={cardVariants}
            className="container w-1/2 mx-auto p-4 transform translate-z-0"
          >
            <div className="bg-neutral-900 shadow-md rounded-lg overflow-hidden">
              <h1 className="text-2xl font-semibold text-neutral-100 p-4 text-center">
                {agent.displayName}
              </h1>
              <div className="flex justify-center items-center">
                <img
                  className="w-96 h-auto object-cover"
                  src={agent.fullPortrait}
                  alt={agent.displayName}
                />
              </div>
              <div className="flex justify-center items-center p-4">
                <div className="w-full max-w-xl h-auto rounded-lg overflow-hidden flex flex-col">
                  <div className="bg-neutral-800 p-2 rounded-t-lg border-b border-neutral-700 h-11">
                    <ul className="flex w-full p-0 m-0 list-none font-medium text-sm">
                      {tabs.map((item) => (
                        <motion.li
                          key={item.label}
                          initial={false}
                          className="relative flex-1 px-4 py-2 cursor-pointer flex justify-center items-center"
                          onClick={() => setSelectedTab(item)}
                        >
                          {`${item.label}`}
                          {item === selectedTab ? (
                            <motion.div
                              className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500"
                              layoutId="underline"
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                                duration: 0.5,
                              }}
                            />
                          ) : null}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <motion.div className="px-8 p-4">
                <div key={selectedTab.label}>
                  {selectedTab === tabs[0] && agent.description}
                  {selectedTab === tabs[1] &&
                    agent.role.displayName + " - " + agent.role.description}
                  {selectedTab === tabs[2] &&
                    agent.abilities.map((ability) => (
                      <div key={ability.displayName} className="mb-4">
                        <h2 className="font-bold text-lg">
                          {ability.displayName}
                        </h2>
                        <p>{ability.description}</p>
                      </div>
                    ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}

export interface Tab {
  label: string;
}

export const tabs: Tab[] = [
  { label: "Description" },
  { label: "Role" },
  { label: "Ability's" },
];
