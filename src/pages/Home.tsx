import { motion } from "motion/react";
import { ArrowRight, Sparkles, BookOpen, FileText, Code, Database, Cpu, PencilLine, Languages } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-52">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-primary text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span>The Future of Learning is Here</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tight mb-8"
            >
              Your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI Study Assistant</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-12"
            >
              Generate notes, summarize PDFs, solve programming problems, and learn smarter using our advanced Gemini-powered AI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/tools"
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-500 transition-all hover:scale-105 flex items-center justify-center gap-2 group shadow-lg shadow-indigo-500/20"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/tools"
                className="w-full sm:w-auto px-8 py-4 glass border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Upload PDF
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-6xl mx-auto px-4 mt-24 relative"
        >
          <div className="glass-card rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] p-4 lg:p-8">
             <div className="w-full h-full rounded-xl bg-dark/50 border border-white/5 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
                <div className="relative text-center">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                   <h3 className="text-2xl font-bold text-white mb-2">AI Dashboard Preview</h3>
                   <p className="text-slate-400 text-sm">Experience the power of BrainyAI</p>
                </div>
                
                {/* Decorative mock UI elements */}
                <div className="absolute top-10 left-10 w-48 h-32 glass border border-white/10 rounded-lg p-4 -rotate-6 hidden md:block">
                  <div className="flex gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-white/10 rounded" />
                    <div className="h-2 w-[80%] bg-white/10 rounded" />
                  </div>
                </div>
                <div className="absolute bottom-10 right-10 w-64 h-48 glass border border-white/10 rounded-lg p-6 rotate-3 hidden md:block">
                  <div className="h-4 w-1/2 bg-primary/20 rounded mb-6" />
                  <div className="flex items-end gap-2 h-24">
                    <div className="w-6 bg-primary/40 rounded-t h-[60%]" />
                    <div className="w-6 bg-accent/40 rounded-t h-[40%]" />
                    <div className="w-6 bg-secondary/40 rounded-t h-[90%]" />
                    <div className="w-6 bg-primary/40 rounded-t h-[70%]" />
                  </div>
                </div>
             </div>
          </div>
          {/* Outer glows */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/30 blur-3xl -z-10" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/30 blur-3xl -z-10" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-dark/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Unleash the Power of AI</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Professional-grade tools designed to solve the most complex academic and programming challenges.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass-card group hover:scale-[1.02] transition-all p-8 rounded-2xl cursor-default"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg shadow-${feature.color.split('-')[1]}/20`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{feature.description}</p>
                <Link to="/tools" className="text-primary text-sm font-semibold flex items-center gap-1 group/btn">
                  Try Now
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programming Section */}
      <section className="py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">Code Faster. <br /><span className="text-gradient">Learn Smarter.</span></h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Stuck on a tricky Java loop or a complex SQL join? Our AI understands your code line-by-line, identifies errors, and suggests optimized solutions in seconds.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Multi-Language Support", desc: "Python, Java, C++, SQL, and more.", icon: Cpu },
                  { title: "Instant Debugging", desc: "Identify syntax and logic errors automatically.", icon: Code },
                  { title: "Optimization", desc: "Get suggestions for better performance and readability.", icon: Sparkles },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl glass flex-shrink-0 flex items-center justify-center border border-white/10">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
               <div className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl p-4 md:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="ml-2 text-xs font-mono text-slate-500">solution.java</span>
                  </div>
                  <pre className="font-mono text-sm leading-relaxed">
                    <code className="text-slate-300">
                      <span className="text-purple-400">public class</span> <span className="text-yellow-300">StudyMate</span> {'{'}<br />
                      &nbsp;&nbsp;<span className="text-purple-400">public static void</span> <span className="text-blue-300">main</span>(String[] args) {'{'}<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;AI Assistant = <span className="text-purple-400">new</span> AI();<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;Assistant.<span className="text-blue-300">solve</span>(<span className="text-green-300">"Complex Algorithm"</span>);<br />
                      &nbsp;&nbsp;{'}'}<br />
                      {'}'}
                    </code>
                  </pre>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="mt-8 p-6 glass bg-blue-500/10 rounded-xl border border-blue-500/20"
                  >
                    <div className="flex items-center gap-2 mb-3">
                       <Brain className="w-5 h-5 text-primary" />
                       <span className="text-sm font-bold text-white tracking-wide uppercase">AI Analysis</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                       Your algorithm has a time complexity of O(n²). I recommend using a HashMap to reduce it to <span className="text-primary font-bold">O(n)</span>.
                    </p>
                  </motion.div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 bg-dark/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Simple, Transparent Pricing</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Choose the plan that fits your learning style. Start for free and upgrade as you grow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {pricingPlans.map((plan, i) => (
               <motion.div
                 key={plan.name}
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 className={`glass-card p-10 rounded-3xl relative overflow-hidden ${plan.isPopular ? 'border-primary/50' : 'border-white/5'}`}
               >
                 {plan.isPopular && (
                   <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                     Most Popular
                   </div>
                 )}
                 <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                 <div className="flex items-baseline gap-1 mb-8">
                   <span className="text-4xl font-bold text-white tracking-tight">{plan.price}</span>
                   <span className="text-slate-500">/mo</span>
                 </div>
                 <ul className="mb-10 space-y-4">
                   {plan.features.map(f => (
                     <li key={f} className="flex items-center gap-3 text-slate-400 text-sm">
                       <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                       {f}
                     </li>
                   ))}
                 </ul>
                 <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.isPopular ? 'bg-primary text-white hover:bg-primary/90' : 'glass border border-white/10 text-white hover:bg-white/5'}`}>
                   Get Started
                 </button>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* FAQ Widget */}
      <section className="py-24 px-4 mb-20">
         <div className="max-w-3xl mx-auto">
           <h2 className="text-3xl font-display font-bold text-center text-white mb-12">Common Questions</h2>
           <div className="space-y-4">
             {faqs.map(faq => (
               <details key={faq.q} className="glass-card rounded-2xl group border-white/5 overflow-hidden">
                 <summary className="p-6 cursor-pointer text-white font-semibold flex justify-between items-center list-none select-none">
                    {faq.q}
                    <ArrowRight className="w-4 h-4 transition-transform group-open:rotate-90" />
                 </summary>
                 <div className="p-6 pt-0 text-slate-400 text-sm leading-relaxed border-t border-white/5">
                    {faq.a}
                 </div>
               </details>
             ))}
           </div>
         </div>
      </section>
    </div>
  );
}

const Brain = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-4.58 2.5 2.5 0 0 1 1.26-4.28 2.5 2.5 0 0 1 4.5-3.5Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-4.58 2.5 2.5 0 0 0-1.26-4.28 2.5 2.5 0 0 0-4.5-3.5Z"/>
  </svg>
);

const features = [
  { title: "AI Notes Generator", description: "Instantly create detailed study notes on any topic with key points and summaries.", icon: PencilLine, color: "from-blue-500 to-cyan-500" },
  { title: "PDF Summarizer", description: "Upload course materials and get concise insights, summaries, and important questions.", icon: FileText, color: "from-purple-500 to-indigo-500" },
  { title: "SQL Solver", description: "Debug queries and solve complex database problems with step-by-step logic.", icon: Database, color: "from-orange-500 to-red-500" },
  { title: "Urdu AI Teacher", description: "Struggling with a concept? Get it explained in easy-to-understand Urdu.", icon: Languages, color: "from-green-500 to-emerald-500" },
  { title: "Java Helper", description: "Solve Java programming questions and understand OOP concepts effortlessly.", icon: Code, color: "from-blue-600 to-indigo-600" },
  { title: "DLD Solver", description: "Logic gates, flip-flops, and Boolean algebra simplified with AI diagrams.", icon: Cpu, color: "from-pink-500 to-rose-500" },
  { title: "Assignment Idea", description: "Get unique ideas and structured outlines for your college projects.", icon: Sparkles, color: "from-amber-500 to-orange-500" },
  { title: "Code Explainer", description: "Learn how complex code blocks work with line-by-line visual explanations.", icon: BookOpen, color: "from-teal-500 to-emerald-500" },
];

const pricingPlans = [
  { name: "Free", price: "$0", features: ["10 AI Requests/day", "PDF Summaries (up to 5 pages)", "All Basic Tools", "Community Support"] },
  { name: "Pro", price: "$9", features: ["Unlimited AI Requests", "PDF Summaries (Unlimited)", "Advanced Coding AI", "Priority Support", "Saved History"], isPopular: true },
  { name: "Team", price: "$29", features: ["Everything in Pro", "Collaborative Workspace", "Analytics Dashboard", "API Access", "Custom Templates"] },
];

const faqs = [
  { q: "How does the PDF summarizer work?", a: "Simply upload your PDF file (up to 50MB). Our AI reads the text content, extracts the most important information, and provides a structured summary including key questions and vocabulary." },
  { q: "Does BrainyAI support other programming languages?", a: "Yes! While we specialize in SQL, Java, and Python, our AI can handle over 50+ programming languages including C++, JavaScript, Go, and Ruby." },
  { q: "Can I use BrainyAI in Urdu?", a: "Absolutely. We have a dedicated Urdu AI Teacher mode that translates complex technical concepts into clear, conversational Urdu script to ensure you never miss a detail." },
  { q: "Is my data secure?", a: "We take privacy seriously. Your uploaded files and code snippets are processed securely and are never used to train the base AI model without your explicit permission." },
];
