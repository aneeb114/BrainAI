import { motion } from "motion/react";
import { Search, Calendar, User, ArrowRight, Tag } from "lucide-react";

export default function Blog() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-4"
          >
            <div className="w-8 h-px bg-primary" />
            Learn with BrainyAI
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Articles & <span className="text-gradient">Insights</span></h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Deep dives into AI integration, study techniques, and programming tutorials designed for the modern learner.
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-all shadow-lg"
            placeholder="Search articles..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, idx) => (
          <motion.article
            key={post.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group flex flex-col glass-card rounded-3xl overflow-hidden hover:scale-[1.02] transition-all cursor-pointer"
          >
            <div className="aspect-video relative overflow-hidden">
               <img 
                 src={post.image} 
                 alt={post.title} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute top-4 left-4">
                 <span className="px-4 py-1.5 glass backdrop-blur-md border hover:bg-primary/20 border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors">
                    {post.category}
                 </span>
               </div>
            </div>
            
            <div className="p-8 flex-grow flex flex-col">
               <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-6">
                 <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {post.date}</span>
                 <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {post.author}</span>
               </div>
               
               <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors leading-tight">{post.title}</h3>
               <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                 {post.excerpt}
               </p>
               
               <div className="pt-6 border-t border-white/5 mt-auto flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3 h-3 text-primary/50" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Gemini AI, Study Tips</span>
                  </div>
                  <button className="flex items-center gap-1 text-sm font-bold text-white group-hover:text-primary transition-colors">
                    Read More
                    <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-20 flex justify-center">
        <button className="px-8 py-4 glass border-white/10 text-white rounded-2xl font-bold hover:bg-white/5 transition-all">
          Load More Articles
        </button>
      </div>
    </div>
  );
}

const posts = [
  {
    title: "How to use Gemini AI for Better Course Summaries",
    excerpt: "Learn the art of prompt engineering to extract key insights from your academic PDFs using BrainyAI's latest features.",
    image: "https://picsum.photos/seed/ai-study/800/600",
    date: "May 10, 2024",
    author: "Dr. Sarah Chen",
    category: "AI Tools"
  },
  {
    title: "Mastering SQL Debugging in 2024",
    excerpt: "Database management can be tricky. Here's how our AI SQL Solver can help you find bugs in complex JOIN statements.",
    image: "https://picsum.photos/seed/sql/800/600",
    date: "May 08, 2024",
    author: "Alex Rivers",
    category: "Tutorial"
  },
  {
    title: "Digital Logic Design: The Visual Way",
    excerpt: "Struggling with K-maps or Logic Gates? We break down the most essential DLD concepts with clear visual explanations.",
    image: "https://picsum.photos/seed/dld/800/600",
    date: "May 05, 2024",
    author: "Prof. James Wilson",
    category: "Concepts"
  },
  {
    title: "Python vs Java: Which should you learn first?",
    excerpt: "A comprehensive guide for beginners comparing the syntax, use-cases, and AI support for the world's most popular languages.",
    image: "https://picsum.photos/seed/pyjava/800/600",
    date: "May 01, 2024",
    author: "Linda Grace",
    category: "Career"
  },
  {
    title: "Effective Note Taking for Programmers",
    excerpt: "Coding is more than just typing. Discover why structured notes are the secret weapon of elite software engineers.",
    image: "https://picsum.photos/seed/notes/800/600",
    date: "April 28, 2024",
    author: "Michael K.",
    category: "Productivity"
  },
  {
    title: "Urdu in STEM: Bridging the Language Gap",
    excerpt: "How BrainyAI's Urdu mode is helping thousands of students in Pakistan master advanced engineering concepts in their native language.",
    image: "https://picsum.photos/seed/urdu/800/600",
    date: "April 25, 2024",
    author: "Aneeb Ur Rehman",
    category: "Bilingual"
  },
];
