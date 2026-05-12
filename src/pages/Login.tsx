import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Brain, Mail, Lock, ArrowRight, Github, Chrome } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

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
          <h1 className="text-3xl font-display font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-500 text-sm">Please enter your details to sign in</p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
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
             <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Password</label>
                <a href="#" className="text-[10px] font-bold text-primary uppercase tracking-wider hover:underline">Forgot?</a>
             </div>
             <div className="relative">
               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
               <input 
                 type="password"
                 className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-all" 
                 placeholder="••••••••" 
               />
             </div>
          </div>

          <button className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 mt-8 group">
            Sign In
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-10 mb-8 flex items-center gap-4">
           <div className="h-px flex-grow bg-white/5" />
           <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest whitespace-nowrap">Or continue with</span>
           <div className="h-px flex-grow bg-white/5" />
        </div>

        <div className="grid grid-cols-2 gap-4">
           <button className="flex items-center justify-center gap-2 h-12 glass border-white/5 rounded-xl text-slate-300 hover:bg-white/5 transition-all text-xs font-bold">
             <Chrome className="w-4 h-4" /> Google
           </button>
           <button className="flex items-center justify-center gap-2 h-12 glass border-white/5 rounded-xl text-slate-300 hover:bg-white/5 transition-all text-xs font-bold">
             <Github className="w-4 h-4" /> Github
           </button>
        </div>

        <p className="text-center mt-10 text-sm text-slate-500">
          Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Sign up for free</Link>
        </p>
      </motion.div>
    </div>
  );
}
