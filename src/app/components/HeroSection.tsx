import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      mouseX.set(x);
      mouseY.set(y);
      rotateX.set(-y * 15);
      rotateY.set(x * 15);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, rotateX, rotateY]);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center px-8 md:px-16 lg:px-24 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Side - Typography */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <motion.div
              className="text-xs font-mono tracking-[0.3em] text-[#4682B4] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Software Engineer
            </motion.div>
            <h1 className="text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] tracking-[-0.02em] font-[900] text-[#121212]">
              RAGUL<br />ARUMUGAM
            </h1>
          </div>

          <div className="h-[2px] w-24 bg-[#121212]" />

          <p className="text-lg md:text-xl text-[#121212]/70 leading-relaxed max-w-lg">
            Building Cognitive Systems & Scalable Cloud Architecture.
          </p>

          <motion.button
            onClick={scrollToProjects}
            className="group relative mt-8 px-8 py-4 bg-[#121212] text-[#F5F5F5] font-mono text-sm tracking-wider overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <span className="inline-block w-2 h-2 bg-[#4682B4] rounded-full animate-pulse" />
              SYSTEM STATUS: ONLINE
            </span>
            <motion.div
              className="absolute inset-0 bg-[#4682B4]"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>

        {/* Right Side - Interactive 3D Component */}
        <motion.div
          ref={containerRef}
          className="relative h-[500px] flex items-center justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="relative w-[300px] h-[300px]"
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              perspective: 1000,
            }}
          >
            {/* Abstract Cube */}
            <div className="absolute inset-0">
              {/* Front Face */}
              <motion.div
                className="absolute inset-0 border-2 border-[#121212] bg-[#F5F5F5]/80 backdrop-blur-sm"
                style={{ transform: "translateZ(75px)" }}
              >
                <div className="absolute top-4 left-4 w-12 h-12 border-2 border-[#4682B4]" />
                <div className="absolute bottom-4 right-4 w-8 h-8 bg-[#121212]" />
              </motion.div>

              {/* Back Face */}
              <motion.div
                className="absolute inset-0 border-2 border-[#121212] bg-[#F5F5F5]/50"
                style={{ transform: "translateZ(-75px) rotateY(180deg)" }}
              >
                <div className="absolute top-4 right-4 w-16 h-16 border-2 border-[#4682B4]" />
              </motion.div>

              {/* Left Face */}
              <motion.div
                className="absolute inset-0 border-2 border-[#121212] bg-[#F5F5F5]/60"
                style={{
                  transform: "rotateY(-90deg) translateZ(150px)",
                  width: "150px",
                }}
              />

              {/* Right Face */}
              <motion.div
                className="absolute inset-0 border-2 border-[#121212] bg-[#F5F5F5]/60"
                style={{
                  transform: "rotateY(90deg) translateZ(150px)",
                  width: "150px",
                }}
              >
                <div className="absolute bottom-4 left-4 w-10 h-10 border-2 border-[#4682B4]" />
              </motion.div>

              {/* Top Face */}
              <motion.div
                className="absolute inset-0 border-2 border-[#121212] bg-[#F5F5F5]/70"
                style={{
                  transform: "rotateX(90deg) translateZ(150px)",
                  height: "150px",
                }}
              />

              {/* Bottom Face */}
              <motion.div
                className="absolute inset-0 border-2 border-[#121212] bg-[#F5F5F5]/70"
                style={{
                  transform: "rotateX(-90deg) translateZ(150px)",
                  height: "150px",
                }}
              />
            </div>
          </motion.div>

          {/* Floating Labels */}
          <motion.div
            className="absolute top-12 right-12 font-mono text-xs text-[#121212]/50"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            &lt;ARCHITECT/&gt;
          </motion.div>
          <motion.div
            className="absolute bottom-12 left-12 font-mono text-xs text-[#121212]/50"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          >
            &lt;ENGINEER/&gt;
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
