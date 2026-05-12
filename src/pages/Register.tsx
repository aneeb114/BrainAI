import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Brain, Mail, Lock, ArrowRight, User, ShieldCheck } from "lucide-react";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square bg-secondary/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-card p-10 rounded-[2.5rem] relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
            <div className="w-12 h-12 bg-gradient rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-display font-bold text-white">Brainy<span className="text-primary">AI</span></span>
          </Link>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-500 text-sm">Join 10k+ students learning with AI</p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-all" 
                placeholder="John Doe" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-all" 
                placeholder="name@company.com" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Password</label>
             <div className="relative">
               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
               <input 
                 type="password"
                 className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-all" 
                 placeholder="••••••••" 
               />
             </div>
          </div>

          <div className="flex items-center gap-3 px-1 pt-2">
             <input type="checkbox" className="w-4 h-4 rounded bg-white/5 border border-white/10 checked:bg-primary appearance-none cursor-pointer border-solid" />
             <span className="text-xs text-slate-500">I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a></span>
          </div>

          <button className="w-full py-4 bg-gradient text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20 mt-8 group">
            Create Account
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-10 flex items-center justify-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
           <ShieldCheck className="w-4 h-4 text-green-500" /> 256-bit encrypted secure registration
        </div>

        <p className="text-center mt-10 text-sm text-slate-500">
          Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in here</Link>
        </p>
      </motion.div>
    </div>
  );
}
