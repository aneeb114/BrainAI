import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-6"
          >
            <div className="w-8 h-px bg-primary" />
            Support Center
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">Get in <span className="text-gradient">Touch</span> with BrainyAI</h1>
          <p className="text-slate-400 text-lg mb-12 leading-relaxed max-w-lg">
            Have a question about our features, pricing, or the AI's capabilities? Our team is here to help you get the most out of BrainyAI.
          </p>

          <div className="space-y-8">
            {[
              { icon: Mail, label: "Email", value: "support@brainyai.pro", color: "text-blue-400" },
              { icon: Phone, label: "Phone", value: "+92 300 1234567", color: "text-purple-400" },
              { icon: MapPin, label: "Office", value: "DHA Phase 6, Lahore, Pakistan", color: "text-emerald-400" },
            ].map(item => (
              <div key={item.label} className="flex gap-6 items-center">
                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center border border-white/5">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div>
                   <h4 className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">{item.label}</h4>
                   <p className="text-white font-semibold">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden"
        >
           {/* Gradient glow */}
           <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px]" />
           
           <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-primary" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-primary" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subject</label>
                <select className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-primary appearance-none">
                  <option>Technical Support</option>
                  <option>Billing Question</option>
                  <option>Feature Request</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</label>
                <textarea className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-primary resize-none" placeholder="Tell us more about your inquiry..." />
              </div>
              <button className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                <Send className="w-5 h-5" />
                Send Message
              </button>
           </form>
        </motion.div>
      </div>

      {/* Live Chat CTA */}
      <section className="mt-32 text-center p-12 glass rounded-[3rem] border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-secondary/10" />
         <div className="relative z-10">
           <MessageCircle className="w-12 h-12 text-primary mx-auto mb-6 animate-bounce" />
           <h2 className="text-3xl font-display font-bold text-white mb-4">Prefer instant help?</h2>
           <p className="text-slate-400 mb-8 max-w-sm mx-auto">Our AI chatbot is available 24/7 to answer common questions instantly.</p>
           <button className="px-8 py-3 bg-white text-dark rounded-full font-bold hover:bg-slate-200 transition-colors">Start Live Chat</button>
         </div>
      </section>
    </div>
  );
}
