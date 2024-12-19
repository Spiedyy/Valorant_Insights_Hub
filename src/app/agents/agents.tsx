"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import ThreeDotsWave from "@/app/components/Threedotswave";

export default function AgentsComp() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  const closeModal = () => setSelectedAgent(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch("https://valorant-api.com/v1/agents");
        const data = await response.json();
        setAgents(data.data);
      } catch (error) {
        console.error("Failed to fetch agents:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchAgents();
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
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ThreeDotsWave />
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto p-4 transform translate-z-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {agents.map((agent) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                key={agent.uuid}
                variants={cardVariants}
                className="bg-neutral-900 shadow-md rounded-lg overflow-hidden cursor-pointer transform translate-z-0"
                onClick={() => setSelectedAgent(agent)}
              >
                <div className="flex justify-center items-center">
                  <img src={agent.displayIcon} alt={agent.displayName} />
                </div>
                <div className="p-4">
                  <h1 className="font-bold text-xl">{agent.displayName}</h1>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex justify-center items-center transform translate-z-0"
          >
            <div className="bg-neutral-800 rounded-lg p-6 w-3/4 md:w-1/2 lg:w-1/4 lg:h-2/3 drop-shadow-lg">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h2 className="font-bold text-2xl mb-4">
                    {selectedAgent.displayName}
                  </h2>
                  <img
                    src={selectedAgent.displayIcon}
                    alt={selectedAgent.displayName}
                    className="w-40 h-40 mx-auto mb-4"
                  />
                </div>
                <div>
                  <p className="text-gray-500">{selectedAgent.description}</p>
                  <div className="flex justify-between">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="mt-4 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-00 transform translate-z-0"
                      onClick={closeModal}
                    >
                      Close
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="mt-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600 transform translate-z-0"
                      onClick={() => {
                        closeModal();
                        router.push(`/agents/${selectedAgent.uuid}`);
                      }}
                    >
                      More info
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
