import { BookOpen, Video, FileText, CheckCircle, ExternalLink, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ResourcesPage() {
  const { user } = useAuth();
  const weakSub = user?.preferences?.weak || 'Operating Systems';

  return (
    <div className="space-y-8 transition-colors">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1 transition-colors">AI Curated Resources</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">Resources adapted to your learning speed and weak topics.</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 border border-yellow-200 dark:border-yellow-900/50 transition-colors">
           <Zap className="w-4 h-4 fill-current text-yellow-500 dark:text-yellow-400" /> Auto-Updated for Midterms
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            subject: weakSub, 
            topic: 'Core Concepts & Exam Revision',
            type: 'Video Playlist',
            icon: Video,
            color: 'pink',
            match: '98% Match',
            desc: 'Visual animated explanations specifically targeting frequent PYQ variations.'
          },
          { 
            subject: 'Database Mgmt', 
            topic: 'Normalization 1NF-BCNF',
            type: 'Interactive PDF',
            icon: FileText,
            color: 'yellow',
            match: '95% Match',
            desc: 'Quick revision notes condensing 4 hours of lectures into 20 minutes of reading.'
          },
          { 
            subject: 'Data Structures', 
            topic: 'Graph Algorithms',
            type: 'Practice Set',
            icon: BookOpen,
            color: 'blue',
            match: '92% Match',
            desc: 'Curated list of standard algorithms verified against last 5 years university papers.'
          }
        ].map((res, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full hover:border-pink-200 dark:hover:border-pink-500/50 transition-colors">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-2xl transition-colors ${
                res.color === 'pink' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' : 
                res.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' : 
                'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              }`}>
                <res.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 px-2.5 py-1 rounded-lg transition-colors">
                {res.type}
              </span>
            </div>
            
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1 transition-colors">{res.subject}</p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 leading-tight transition-colors">{res.topic}</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed mb-6 transition-colors">
                {res.desc}
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800 transition-colors">
               <span className="font-bold text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1 transition-colors">
                 <CheckCircle className="w-4 h-4" /> {res.match}
               </span>
               <button className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-bold text-sm flex items-center gap-1 group transition-colors">
                 Open Resource <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
               </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-8 relative overflow-hidden transition-colors">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold text-white mb-2">Previous Year Questions Analyzer</h3>
            <p className="text-slate-400 font-medium">Upload your university papers or let our AI pull from the global repository to predict the most likely questions for your upcoming exams.</p>
          </div>
          <button className="bg-white dark:bg-slate-700 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors whitespace-nowrap">
            Generate Mock Test
          </button>
        </div>
      </div>
    </div>
  );
}
