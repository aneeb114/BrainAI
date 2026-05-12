import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, Code, Database, Languages, Cpu, PencilLine, 
  Sparkles, Upload, ArrowRight, Loader2, Play, CheckCircle2,
  Trash2, Copy, Github, Plus
} from "lucide-react";
import { summarizePdf, explainCode, solveProblem, translateToUrdu, generateStudyNotes } from "../lib/gemini";

type ToolType = 'pdf' | 'code' | 'study' | 'solver' | 'word2pdf' | 'pdf2word' | 'img2pdf' | 'merge' | 'split' | 'compress';

export default function Tools() {
  const [activeTool, setActiveTool] = useState<ToolType>('pdf');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);
  const [urduTranslation, setUrduTranslation] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  // Form states
  const [inputText, setInputText] = useState("");
  const [language, setLanguage] = useState("java");
  const [solverType, setSolverType] = useState<'SQL' | 'Java' | 'DLD'>('Java');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleConversion = async () => {
    if (files.length === 0) return;
    setLoading(true);
    setProgress(30);

    const formData = new FormData();
    if (activeTool === 'img2pdf' || activeTool === 'merge') {
      files.forEach(f => formData.append('files', f));
    } else {
      formData.append('file', files[0]);
    }

    let endpoint = "";
    switch (activeTool) {
      case 'word2pdf': endpoint = "/api/convert/word-to-pdf"; break;
      case 'pdf2word': endpoint = "/api/convert/pdf-to-word"; break;
      case 'img2pdf': endpoint = "/api/convert/image-to-pdf"; break;
      case 'merge': endpoint = "/api/pdf/merge"; break;
      case 'split': endpoint = "/api/pdf/split"; break;
      case 'compress': endpoint = "/api/pdf/compress"; break;
    }

    try {
      setProgress(60);
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Conversion failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `brainyai_${Date.now()}_${files[0].name.split('.')[0]}.${activeTool.includes('word') ? 'docx' : 'pdf'}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
      setProgress(100);
      setResult("Successfully converted! Your download should start automatically.");
    } catch (error) {
      console.error(error);
      setResult("Error: Failed to process file.");
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  const handleAction = async () => {
    if (['word2pdf', 'pdf2word', 'img2pdf', 'merge', 'split', 'compress'].includes(activeTool)) {
      return handleConversion();
    }
    if (!inputText && activeTool !== 'pdf') return;
    setLoading(true);
    setResult(null);
    setUrduTranslation(null);

    try {
      let response = "";
      switch (activeTool) {
        case 'code':
          response = await explainCode(inputText, language) || "";
          break;
        case 'study':
          response = await generateStudyNotes(inputText) || "";
          break;
        case 'solver':
          response = await solveProblem(inputText, solverType) || "";
          break;
        case 'pdf':
          // For demo purposes, we'll simulate PDF extraction if text is provided
          response = await summarizePdf(inputText || "Sample PDF content about AI in Education.") || "";
          break;
      }
      setResult(response);
    } catch (error) {
      console.error(error);
      setResult("### Error\nAn error occurred while processing your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUrduTranslate = async () => {
    if (!result) return;
    setIsTranslating(true);
    try {
      const translation = await translateToUrdu(result) || "";
      setUrduTranslation(translation);
    } catch (error) {
       console.error(error);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">AI Learning <span className="text-gradient">Powerhouse</span></h1>
        <p className="text-slate-400">Select a tool and let BrainyAI supercharge your study session.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar Tools Navigation */}
        <div className="lg:col-span-3 space-y-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => {
                setActiveTool(tool.id as ToolType);
                setResult(null);
                setUrduTranslation(null);
              }}
              className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl transition-all ${
                activeTool === tool.id 
                  ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]" 
                  : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
              }`}
            >
              <tool.icon className={`w-5 h-5 ${activeTool === tool.id ? "text-white" : "text-primary"}`} />
              <span className="font-semibold text-sm">{tool.name}</span>
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 md:p-8 rounded-3xl min-h-[500px] flex flex-col">
             <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                 {tools.find(t => t.id === activeTool)?.icon({ className: "w-5 h-5 text-primary" })}
               </div>
               <div>
                 <h2 className="text-white font-bold">{tools.find(t => t.id === activeTool)?.name}</h2>
                 <p className="text-slate-500 text-xs">Gemini 3.0 Flash</p>
               </div>
             </div>

             <div className="flex-grow space-y-4">
                {['pdf', 'word2pdf', 'pdf2word', 'img2pdf', 'merge', 'split', 'compress'].includes(activeTool) && (
                  <div 
                    onClick={() => document.getElementById('file-upload')?.click()}
                    className="flex-1 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-12 bg-[#0a0a0c]/50 hover:border-indigo-500/50 transition-colors group cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {files.length > 0 ? <CheckCircle2 className="w-8 h-8 text-green-500" /> : <Upload className="w-8 h-8 text-indigo-400" />}
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {files.length > 0 ? `${files.length} file(s) selected` : "Drag and drop your study material"}
                    </h3>
                    <p className="text-slate-500 text-sm mb-6">
                      {files.length > 0 ? files.map(f => f.name).join(', ') : "PDF, DOCX, or Images (Up to 50MB)"}
                    </p>
                    <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 transition-all rounded-full font-bold shadow-lg shadow-indigo-500/20 text-white">
                      {files.length > 0 ? "Change Files" : "Upload File"}
                    </button>
                    <input 
                      id="file-upload" 
                      type="file" 
                      className="hidden" 
                      multiple={['img2pdf', 'merge'].includes(activeTool)}
                      onChange={handleFileChange}
                    />
                  </div>
                )}

                {activeTool === 'code' && (
                  <div className="space-y-4">
                    <select 
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full h-12 glass border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-primary"
                    >
                      <option value="java">Java</option>
                      <option value="python">Python</option>
                      <option value="sql">SQL</option>
                      <option value="cpp">C++</option>
                    </select>
                    <textarea
                      placeholder="Paste your code here..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="w-full h-64 bg-dark/30 border border-white/5 rounded-2xl p-6 text-sm font-mono text-slate-300 focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>
                )}

                {activeTool === 'study' && (
                  <textarea
                    placeholder="Enter a topic (e.g., Photosynthesis, Neural Networks...)"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full h-64 bg-dark/30 border border-white/5 rounded-2xl p-6 text-sm text-slate-300 focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                )}

                {activeTool === 'solver' && (
                  <div className="space-y-4">
                     <div className="flex gap-2">
                        {['Java', 'SQL', 'DLD'].map((t) => (
                           <button
                             key={t}
                             onClick={() => setSolverType(t as any)}
                             className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                               solverType === t ? "bg-primary text-white" : "glass text-slate-400 hover:bg-white/5"
                             }`}
                           >
                             {t}
                           </button>
                        ))}
                     </div>
                     <textarea
                       placeholder={`Enter your ${solverType} problem description...`}
                       value={inputText}
                       onChange={(e) => setInputText(e.target.value)}
                       className="w-full h-64 bg-dark/30 border border-white/5 rounded-2xl p-6 text-sm text-slate-300 focus:outline-none focus:border-primary transition-colors resize-none"
                     />
                  </div>
                )}
             </div>

             <button
               onClick={handleAction}
               disabled={loading || (!inputText && activeTool !== 'pdf' && files.length === 0)}
               className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
             >
               {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-current" />}
               {loading ? "Processing..." : "Run Tool"}
             </button>

             {loading && (
               <div className="mt-4 space-y-2">
                 <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                   <span>Processing File</span>
                   <span>{progress}%</span>
                 </div>
                 <div className="w-full h-1 back bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     className="h-full bg-primary"
                     initial={{ width: 0 }}
                     animate={{ width: `${progress}%` }}
                   />
                 </div>
               </div>
             )}
          </div>
        </div>

        {/* Output Area */}
        <div className="lg:col-span-5 relative">
           <div className="glass-card rounded-3xl min-h-[500px] flex flex-col overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/2">
                 <div className="flex items-center gap-2">
                   <CheckCircle2 className="w-5 h-5 text-green-500" />
                   <span className="text-sm font-bold text-white uppercase tracking-wider">AI Response</span>
                 </div>
                 <div className="flex items-center gap-3 px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-[10px] text-indigo-300">
                    <span className="flex items-center gap-1 font-black uppercase tracking-tighter"><Sparkles className="w-2 h-2" /> URDU SUPPORT ENABLED</span>
                 </div>
              </div>

              <div className="flex-grow p-8 overflow-y-auto max-h-[600px] prose prose-invert prose-p:text-slate-400 prose-headings:text-white prose-code:text-primary">
                 {!result && !loading && (
                   <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                      <Brain className="w-16 h-16 text-slate-600 mb-4" />
                      <p className="text-lg font-medium text-slate-500">Your results will appear here</p>
                      <p className="text-sm text-slate-600 mt-2 max-w-xs">Run a tool to see magic happen in real-time.</p>
                   </div>
                 )}
                 {loading && (
                   <div className="space-y-4">
                      <div className="h-6 w-1/3 bg-white/5 animate-pulse rounded" />
                      <div className="h-24 w-full bg-white/5 animate-pulse rounded-xl" />
                      <div className="h-32 w-full bg-white/5 animate-pulse rounded-xl" />
                      <div className="h-24 w-full bg-white/5 animate-pulse rounded-xl" />
                   </div>
                 )}
                 {result && (
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="whitespace-pre-wrap font-sans leading-relaxed text-slate-300"
                   >
                     {result}
                   </motion.div>
                 )}
              </div>

              {result && (
                <div className="p-6 border-t border-white/5 flex gap-4">
                  <button 
                    onClick={handleUrduTranslate}
                    disabled={isTranslating}
                    className="flex-1 py-3 glass hover:bg-primary/10 hover:border-primary/50 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    {isTranslating ? <Loader2 className="w-4 h-4 animate-spin text-primary" /> : <Languages className="w-4 h-4 text-primary" />}
                    Explain in Urdu
                  </button>
                  <button className="px-5 glass hover:bg-white/5 rounded-xl transition-all">
                    <Copy className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              )}
           </div>

           {/* Urdu Slide-over */}
           <AnimatePresence>
             {urduTranslation && (
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: 20 }}
                 className="absolute inset-0 z-20 p-6"
               >
                 <div className="w-full h-full glass-card bg-primary/20 backdrop-blur-3xl rounded-3xl p-8 border-primary/50 shadow-2xl relative overflow-y-auto">
                    <button 
                      onClick={() => setUrduTranslation(null)}
                      className="absolute top-4 right-4 p-2 glass hover:bg-white/10 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                    <div className="flex items-center gap-3 mb-6">
                       <Languages className="w-6 h-6 text-white" />
                       <h3 className="text-xl font-bold text-white">اردو میں وضاحت</h3>
                    </div>
                    <div className="text-right font-serif text-xl leading-loose text-white" style={{ direction: 'rtl' }}>
                       {urduTranslation}
                    </div>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const tools = [
  { id: 'pdf', name: 'PDF Summarizer', icon: FileText },
  { id: 'code', name: 'Code Explainer', icon: Code },
  { id: 'study', name: 'Notes Generator', icon: PencilLine },
  { id: 'solver', name: 'SQL/Java Solver', icon: Database },
  { id: 'word2pdf', name: 'Word to PDF', icon: FileText },
  { id: 'pdf2word', name: 'PDF to Word', icon: FileText },
  { id: 'img2pdf', name: 'Image to PDF', icon: Upload },
  { id: 'merge', name: 'PDF Merger', icon: Plus },
  { id: 'split', name: 'PDF Splitter', icon: Trash2 },
  { id: 'compress', name: 'PDF Compressor', icon: ArrowRight },
];

const Brain = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-4.58 2.5 2.5 0 0 1 1.26-4.28 2.5 2.5 0 0 1 4.5-3.5Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-4.58 2.5 2.5 0 0 0-1.26-4.28 2.5 2.5 0 0 0-4.5-3.5Z"/>
  </svg>
);
