import { Brain, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-white">Brainy<span className="text-primary">AI</span></span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Empowering students and developers with cutting-edge AI tools for smarter learning and efficient coding.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 glass border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                <Twitter className="w-4 h-4 text-slate-400" />
              </a>
              <a href="#" className="w-10 h-10 glass border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                <Github className="w-4 h-4 text-slate-400" />
              </a>
              <a href="#" className="w-10 h-10 glass border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                <Linkedin className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><Link to="/tools" className="text-slate-400 hover:text-white transition-colors text-sm">AI Tools</Link></li>
              <li><Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors text-sm">Dashboard</Link></li>
              <li><Link to="/blog" className="text-slate-400 hover:text-white transition-colors text-sm">Blog</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Tools</h4>
            <ul className="space-y-4">
              <li><Link to="/tools" className="text-slate-400 hover:text-white transition-colors text-sm">PDF Summarizer</Link></li>
              <li><Link to="/tools" className="text-slate-400 hover:text-white transition-colors text-sm">Code Explainer</Link></li>
              <li><Link to="/tools" className="text-slate-400 hover:text-white transition-colors text-sm">SQL Solver</Link></li>
              <li><Link to="/tools" className="text-slate-400 hover:text-white transition-colors text-sm">Urdu Teacher</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Subscribe</h4>
            <p className="text-slate-400 text-sm mb-4">Get the latest AI learning tips delivered to your inbox.</p>
            <form className="relative">
              <input
                type="email"
                placeholder="Email address"
                className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              />
              <button className="absolute right-1 top-1 bottom-1 px-4 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © 2024 BrainyAI. Built with Gemini AI.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-white text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-white text-xs transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-500 hover:text-white text-xs transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
