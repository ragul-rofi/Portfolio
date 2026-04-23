import { motion } from "motion/react";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

export default function AboutSection() {
  const skillCategories: SkillCategory[] = [
    {
      title: "Core Development",
      skills: [
        { name: "Python", level: 95 },
        { name: "TypeScript/JavaScript", level: 90 },
        { name: "React & Next.js", level: 88 },
        { name: "Node.js", level: 85 },
        { name: "SQL & NoSQL", level: 82 },
      ],
    },
    {
      title: "AI/ML",
      skills: [
        { name: "Claude LLM Integration", level: 92 },
        { name: "Machine Learning", level: 85 },
        { name: "NLP & RAG Systems", level: 88 },
        { name: "TensorFlow/PyTorch", level: 80 },
        { name: "AI Agent Development", level: 90 },
      ],
    },
    {
      title: "Cloud/DevOps",
      skills: [
        { name: "AWS (S3, Lambda, EC2)", level: 90 },
        { name: "Docker & Kubernetes", level: 85 },
        { name: "CI/CD Pipelines", level: 82 },
        { name: "Terraform", level: 78 },
        { name: "System Architecture", level: 88 },
      ],
    },
  ];

  return (
    <section className="min-h-screen py-24 px-8 md:px-16 lg:px-24 bg-[#F5F5F5]">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-sm text-[#4682B4]">[01]</span>
            <div className="h-[1px] flex-1 bg-[#121212]/20" />
          </div>
          <h2 className="text-5xl md:text-6xl font-[900] tracking-tight text-[#121212]">
            THE FULL-STACK<br />NARRATIVE
          </h2>
        </motion.div>

        {/* About Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 max-w-3xl"
        >
          <p className="text-lg leading-relaxed text-[#121212]/80 mb-6">
            Third-year Computer Science student at Rathinam Technical Campus with a mission to become an{" "}
            <span className="font-[600] text-[#121212]">irreplaceable tech entrepreneur</span>. My expertise lies at
            the intersection of cognitive systems, scalable cloud architecture, and innovative AI solutions.
          </p>
          <p className="text-lg leading-relaxed text-[#121212]/80">
            I specialize in building production-ready systems that solve real-world problems, from AI-powered plugins
            to cloud-native applications. My approach combines technical precision with entrepreneurial vision.
          </p>
        </motion.div>

        {/* Skills Matrix */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIdx * 0.1 }}
              className="bg-white border-2 border-[#121212] p-8 hover:shadow-[8px_8px_0px_0px_rgba(18,18,18,1)] transition-shadow duration-300"
            >
              {/* Category Title */}
              <div className="mb-6">
                <h3 className="font-mono text-sm text-[#4682B4] tracking-wider mb-2">
                  {`[CATEGORY_${String(categoryIdx + 1).padStart(2, "0")}]`}
                </h3>
                <h4 className="text-xl font-[700] text-[#121212]">{category.title}</h4>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIdx) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-sm text-[#121212]/80">{skill.name}</span>
                      <span className="font-mono text-xs text-[#4682B4]">{skill.level}%</span>
                    </div>
                    <div className="h-[2px] bg-[#121212]/10 relative overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-[#121212]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: categoryIdx * 0.1 + skillIdx * 0.05,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="border-l-2 border-[#4682B4] pl-6">
            <div className="font-mono text-xs text-[#121212]/50 mb-2">INSTITUTION</div>
            <div className="text-lg text-[#121212]">Rathinam Technical Campus</div>
          </div>
          <div className="border-l-2 border-[#4682B4] pl-6">
            <div className="font-mono text-xs text-[#121212]/50 mb-2">SPECIALIZATION</div>
            <div className="text-lg text-[#121212]">Computer Science & Engineering</div>
          </div>
          <div className="border-l-2 border-[#4682B4] pl-6">
            <div className="font-mono text-xs text-[#121212]/50 mb-2">STATUS</div>
            <div className="text-lg text-[#121212]">3rd Year Student</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
