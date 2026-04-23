import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface LoadingAnimationProps {
  onComplete: () => void;
}

export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowLogo(true);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  const nodes = [
    { x: 50, y: 50, id: 0 },
    { x: 30, y: 30, id: 1 },
    { x: 70, y: 30, id: 2 },
    { x: 30, y: 70, id: 3 },
    { x: 70, y: 70, id: 4 },
    { x: 20, y: 50, id: 5 },
    { x: 80, y: 50, id: 6 },
    { x: 50, y: 20, id: 7 },
    { x: 50, y: 80, id: 8 },
  ];

  const connections = [
    [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 5], [2, 6], [1, 7], [4, 8],
    [5, 3], [6, 4], [7, 2], [8, 3],
  ];

  return (
    <motion.div
      className="fixed inset-0 bg-[#F5F5F5] flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: showLogo ? 0 : 1 }}
      transition={{ duration: 0.5, delay: showLogo ? 0.3 : 0 }}
    >
      <div className="relative">
        {/* Node Network */}
        <svg width="400" height="400" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Draw connections */}
          {connections.map(([start, end], idx) => {
            const delay = (idx / connections.length) * 1.5;
            return (
              <motion.line
                key={`connection-${idx}`}
                x1={`${nodes[start].x}%`}
                y1={`${nodes[start].y}%`}
                x2={`${nodes[end].x}%`}
                y2={`${nodes[end].y}%`}
                stroke="#121212"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: showLogo ? 0 : 1,
                  opacity: showLogo ? 0 : 0.3,
                }}
                transition={{
                  pathLength: { duration: 0.5, delay },
                  opacity: { duration: 0.3, delay: showLogo ? 0 : delay },
                }}
              />
            );
          })}

          {/* Draw nodes */}
          {nodes.map((node, idx) => {
            const delay = (idx / nodes.length) * 1.5;
            return (
              <motion.circle
                key={`node-${node.id}`}
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r="4"
                fill="#121212"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: showLogo ? 0 : 1,
                  opacity: showLogo ? 0 : 1,
                }}
                transition={{
                  scale: { duration: 0.3, delay: showLogo ? 0 : delay },
                  opacity: { duration: 0.2, delay: showLogo ? 0 : delay },
                }}
              />
            );
          })}
        </svg>

        {/* Logo appears when nodes collapse */}
        {showLogo && (
          <motion.div
            className="text-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-4xl font-mono tracking-tight text-[#121212]">RA</div>
          </motion.div>
        )}

        {/* Terminal-style percentage counter */}
        {!showLogo && (
          <motion.div
            className="absolute top-[calc(50%+250px)] left-1/2 -translate-x-1/2 font-mono text-sm text-[#121212]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-[#4682B4]">LOADING</span> [{progress}%]
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
