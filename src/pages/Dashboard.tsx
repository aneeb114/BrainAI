import { motion } from "motion/react";
import { 
  LayoutDashboard, FileText, Code, Clock, 
  Settings, LogOut, Bell, Search, User, 
  TrendingUp, BarChart3, PieChart as PieChartIcon, 
  BookMarked, History, MoreVertical, Plus,
  Sparkles, PencilLine, Database
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Mon', usage: 40 },
  { name: 'Tue', usage: 30 },
  { name: 'Wed', usage: 65 },
  { name: 'Thu', usage: 45 },
  { name: 'Fri', usage: 90 },
  { name: 'Sat', usage: 35 },
  { name: 'Sun', usage: 20 },
];

const activityData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-dark flex">
      {/* Mini Sidebar (Optional, maybe just a regular section for simplicity in demo) */}
      <div className="w-20 lg:w-64 border-r border-white/5 bg-dark/50 hidden md:flex flex-col">
        <div className="p-6">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="flex-grow px-4 space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.label}
              className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-lg transition-all ${
                link.active 
                  ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]" 
                  : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
              }`}
            >
              <link.icon className="w-4 h-4 flex-shrink-0" />
              <span className="hidden lg:block font-medium text-sm">{link.label}</span>
            </button>
          ))}
        </div>
        <div className="p-6 border-t border-white/5">
           <button className="flex items-center gap-4 text-slate-500 hover:text-red-400 transition-colors w-full px-4">
             <LogOut className="w-5 h-5" />
             <span className="hidden lg:block font-bold text-sm">Logout</span>
           </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 md:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
           <div>
             <h1 className="text-3xl font-display font-bold text-white mb-2">Welcome back, <span className="text-gradient">Student</span> 👋</h1>
             <p className="text-slate-500 text-sm">You have 5 assignments due this week. Stay focused!</p>
           </div>
           <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="relative flex-grow md:flex-grow-0 md:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
               <input 
                 className="w-full h-10 bg-white/5 border border-white/10 rounded-full pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary"
                 placeholder="Search documents..."
               />
             </div>
             <button className="w-10 h-10 glass border-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer relative">
               <Bell className="w-5 h-5 text-slate-400" />
               <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-dark" />
             </button>
             <div className="w-10 h-10 rounded-full bg-linear-to-tr from-primary to-secondary p-0.5">
               <div className="w-full h-full rounded-full bg-dark flex items-center justify-center overflow-hidden">
                 <User className="w-5 h-5 text-slate-400" />
               </div>
             </div>
           </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
           {stats.map((stat) => (
             <motion.div
               key={stat.label}
               whileHover={{ y: -5 }}
               className="glass-card p-6 rounded-3xl"
             >
               <div className="flex justify-between items-start mb-4">
                 <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} bg-white/10`}>
                   <stat.icon className="w-6 h-6 text-white" />
                 </div>
                 <div className="flex items-center gap-1 text-green-500 text-xs font-bold font-mono">
                   <TrendingUp className="w-3 h-3" />
                   {stat.trend}
                 </div>
               </div>
               <p className="text-slate-500 text-sm mb-1">{stat.label}</p>
               <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
             </motion.div>
           ))}
        </div>

        {/* Charts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 mb-10">
           <div className="lg:col-span-5 glass-card p-8 rounded-3xl">
              <div className="flex justify-between items-center mb-10">
                 <div>
                   <h3 className="text-xl font-bold text-white">Study Intensity</h3>
                   <p className="text-slate-500 text-sm">Real-time daily usage metrics</p>
                 </div>
                 <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:outline-none">
                    <option>Last 7 Days</option>
                    <option>Last Month</option>
                 </select>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} axisLine={false} tickLine={false} dy={10} />
                    <YAxis stroke="#64748b" fontSize={11} axisLine={false} tickLine={false} dx={-10} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#09090b', borderRadius: '12px', border: '1px solid #ffffff10', fontSize: '12px' }} 
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>

           <div className="lg:col-span-2 glass-card p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-white mb-8">Quick Links</h3>
              <div className="space-y-4">
                 {[
                   { label: "AI Exam Prep", info: "Last session: 2h ago", color: "text-blue-400" },
                   { label: "My Library", info: "42 documents saved", color: "text-purple-400" },
                   { label: "Code History", info: "128 snippets", color: "text-cyan-400" },
                   { label: "Urdu Notes", info: "15 translated concepts", color: "text-slate-400" },
                 ].map(item => (
                   <button key={item.label} className="w-full flex items-center justify-between p-4 glass hover:bg-white/5 rounded-2xl border-white/5 text-left group transition-all">
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1 group-hover:text-primary transition-colors">{item.label}</h4>
                        <p className="text-[11px] text-slate-500">{item.info}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-white transition-colors" />
                   </button>
                 ))}
                 <button className="w-full pt-4 text-sm text-primary font-bold hover:underline flex items-center justify-center gap-2">
                   View All Insights <Plus className="w-4 h-4" />
                 </button>
              </div>
           </div>
        </div>

        {/* Recent History Table */}
        <div className="glass-card rounded-3xl overflow-hidden border border-white/5">
           <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h3 className="text-xl font-bold text-white">Recent Activity</h3>
              <div className="flex gap-2">
                <button className="px-5 py-2 rounded-xl text-xs font-bold glass border-white/5 text-white hover:bg-white/10 transition-all">Export Report</button>
                <button className="px-5 py-2 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">Refresh</button>
              </div>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-white/2">
                       <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Document</th>
                       <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tool Used</th>
                       <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Date</th>
                       <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                       <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {recentActivity.map((activity, i) => (
                      <tr key={i} className="hover:bg-white/2 transition-colors">
                         <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                  <activity.icon className="w-4 h-4 text-primary" />
                               </div>
                               <span className="text-sm font-semibold text-white">{activity.title}</span>
                            </div>
                         </td>
                         <td className="px-8 py-6 text-sm text-slate-400">{activity.tool}</td>
                         <td className="px-8 py-6 text-sm text-slate-500 font-mono">{activity.date}</td>
                         <td className="px-8 py-6">
                            <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold uppercase rounded-full border border-green-500/20">
                               Success
                            </span>
                         </td>
                         <td className="px-8 py-6">
                            <button className="p-2 glass border-white/5 rounded-lg hover:bg-white/5 transition-all">
                               <MoreVertical className="w-4 h-4 text-slate-400" />
                            </button>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
}

const sidebarLinks = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "My Library", icon: BookMarked },
  { label: "AI Tools", icon: Sparkles },
  { label: "Study History", icon: History },
  { label: "Notes", icon: PencilLine },
  { label: "Programming", icon: Code },
  { label: "Settings", icon: Settings },
];

const stats = [
  { label: "AI Credits Used", value: "842", icon: Sparkles, color: "from-blue-500 to-indigo-500", trend: "+12%" },
  { label: "Saved Notes", value: "56", icon: FileText, color: "from-purple-500 to-pink-500", trend: "+4%" },
  { label: "Coding Tasks", value: "1,240", icon: Code, color: "from-orange-500 to-red-500", trend: "+25%" },
  { label: "Learning Hours", value: "48.5", icon: Clock, color: "from-teal-500 to-emerald-500", trend: "+9%" },
];

const ArrowRight = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);

const recentActivity = [
  { title: "Binary Search Tree.pdf", tool: "PDF Summarizer", date: "May 12, 2024", icon: FileText },
  { title: "Authentication.java", tool: "Code Explainer", date: "May 11, 2024", icon: Code },
  { title: "Data Structures Exam", tool: "Notes Generator", date: "May 10, 2024", icon: PencilLine },
  { title: "Users API Design", tool: "SQL Solver", date: "May 09, 2024", icon: Database },
];
