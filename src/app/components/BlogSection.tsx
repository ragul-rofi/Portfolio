import { motion } from "motion/react";
import { Clock, ArrowUpRight } from "lucide-react";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  url: string;
}

export default function BlogSection() {
  const blogPosts: BlogPost[] = [
    {
      title: "Building Production-Ready AI Systems with Claude",
      excerpt:
        "A deep dive into architecting scalable AI applications using Claude LLM. Exploring best practices for prompt engineering, error handling, and deployment strategies.",
      date: "March 15, 2026",
      readTime: "8 min read",
      category: "AI/ML",
      url: "https://medium.com/@ragularumugam",
    },
    {
      title: "The Future of Cloud Architecture: Lessons from Production",
      excerpt:
        "Insights gained from deploying microservices on AWS at scale. Understanding trade-offs between serverless and containerized approaches for modern applications.",
      date: "February 28, 2026",
      readTime: "6 min read",
      category: "Cloud",
      url: "https://medium.com/@ragularumugam",
    },
    {
      title: "From Student to Tech Entrepreneur: A Technical Journey",
      excerpt:
        "Navigating the intersection of academia and industry. How building real-world projects shaped my understanding of software engineering and business.",
      date: "January 20, 2026",
      readTime: "5 min read",
      category: "Career",
      url: "https://medium.com/@ragularumugam",
    },
    {
      title: "Geospatial Data Processing at Scale",
      excerpt:
        "Techniques for handling large-scale geographic datasets. From data ingestion to visualization, exploring the full pipeline for location-based applications.",
      date: "December 10, 2025",
      readTime: "10 min read",
      category: "Data Engineering",
      url: "https://medium.com/@ragularumugam",
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
            <span className="font-mono text-sm text-[#4682B4]">[03]</span>
            <div className="h-[1px] flex-1 bg-[#121212]/20" />
          </div>
          <h2 className="text-5xl md:text-6xl font-[900] tracking-tight text-[#121212]">
            THE MEDIUM<br />FEED
          </h2>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, idx) => (
            <motion.a
              key={post.title}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group block bg-white border border-[#121212]/10 hover:border-[#121212] transition-all duration-300 hover:shadow-[6px_6px_0px_0px_rgba(18,18,18,1)]"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-[#121212]/10">
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 border border-[#121212]/20 font-mono text-xs bg-[#F5F5F5]">
                    {post.category}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-[#121212]/30 group-hover:text-[#4682B4] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>

                {/* Title - Serif font for "technical paper" feel */}
                <h3 className="font-serif text-2xl leading-tight text-[#121212] mb-4 group-hover:text-[#4682B4] transition-colors">
                  {post.title}
                </h3>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-xs text-[#121212]/50">
                  <time className="font-mono">{post.date}</time>
                  <span className="w-1 h-1 bg-[#121212]/30 rounded-full" />
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span className="font-mono">{post.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-sm leading-relaxed text-[#121212]/70 line-clamp-3">{post.excerpt}</p>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6">
                <div className="font-mono text-xs text-[#4682B4] group-hover:translate-x-2 transition-transform duration-300">
                  READ_MORE →
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* View More Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="https://medium.com/@ragularumugam"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[#121212] bg-white font-mono text-sm hover:bg-[#121212] hover:text-[#F5F5F5] transition-colors duration-300"
          >
            VIEW_ALL_ARTICLES
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
