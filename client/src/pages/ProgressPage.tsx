import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';
import { Target, Zap, Clock, Brain, AlertCircle, AlertTriangle, Calendar, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const burnOutData = [
  { day: 'Mon', stress: 30, productivity: 80 },
  { day: 'Tue', stress: 40, productivity: 85 },
  { day: 'Wed', stress: 55, productivity: 70 },
  { day: 'Thu', stress: 70, productivity: 60 },
  { day: 'Fri', stress: 45, productivity: 90 },
  { day: 'Sat', stress: 20, productivity: 40 },
  { day: 'Sun', stress: 25, productivity: 50 },
];

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const { consistencyScore } = useData();
  const { user } = useAuth();
  
  const currentCGPA = parseFloat(user?.cgpa || '0');
  const targetCGPA = parseFloat(user?.targetCgpa || '0');
  const predictedCGPA = currentCGPA && targetCGPA ? (currentCGPA + (targetCGPA - currentCGPA) * 0.6).toFixed(2) : 'N/A';

  return (
    <div className="space-y-6 transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Predicted CGPA Card */}
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 p-6 opacity-20">
              <Target className="w-24 h-24" />
           </div>
           <div className="relative z-10">
              <p className="text-xs font-black uppercase tracking-widest text-pink-200 mb-2">AI Prediction</p>
              <h3 className="text-xl font-bold mb-6">End of Semester Forecast</h3>
              <div className="flex items-end gap-4 mb-2">
                 <div className="text-6xl font-black">{predictedCGPA}</div>
                 <div className="text-pink-200 font-bold mb-2 uppercase text-sm tracking-wide">Expected CGPA</div>
              </div>
              <p className="text-sm font-medium text-pink-100 mt-4 leading-relaxed">Based on your current assignment scores and {consistencyScore}% consistency rate, you are projected to increase your CGPA from {currentCGPA}.</p>
           </div>
        </div>

        {/* Backlog Risk Detection */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
           <div>
             <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Backlog Risk Detection</h3>
             </div>
             
             <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-2xl mb-4">
               <p className="font-bold text-red-800 dark:text-red-400 text-lg flex items-center gap-2"><AlertCircle className="w-5 h-5" /> High risk in {user?.preferences?.weak || 'Operating Systems'}</p>
               <p className="text-sm font-medium text-red-600 dark:text-red-300 mt-2">Your internal marks and upcoming heavy syllabus components indicate a steep difficulty curve.</p>
             </div>
             
             <div className="p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/50 rounded-2xl">
               <p className="font-bold text-yellow-800 dark:text-yellow-400 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Moderate risk in {user?.subjects && user?.subjects.length > 1 ? user.subjects[1].name : 'DBMS'}</p>
             </div>
           </div>
           
           <button className="mt-6 w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700">View Prevention Strategy</button>
        </div>

        {/* Exam Preparation Planner */}
        <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-8 shadow-sm text-white relative overflow-hidden">
           <div className="absolute -bottom-10 -right-10 opacity-20">
             <Calendar className="w-40 h-40 text-yellow-400" />
           </div>
           <div className="relative z-10">
             <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-3">
               <Brain className="w-6 h-6 text-yellow-500" /> Exam Prep Planner
             </h3>
             <ul className="space-y-4">
               <li className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20"><Target className="w-4 h-4 text-yellow-400" /></div>
                 <div>
                   <p className="font-bold text-white">Daily Targets</p>
                   <p className="text-xs text-slate-300 mt-0.5">2 chapters of {user?.preferences?.weak || 'OS'} per day.</p>
                 </div>
               </li>
               <li className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20"><Calendar className="w-4 h-4 text-pink-400" /></div>
                 <div>
                   <p className="font-bold text-white">Revision Schedule</p>
                   <p className="text-xs text-slate-300 mt-0.5">Spaced repetition generated for weekends.</p>
                 </div>
               </li>
               <li className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20"><FileText className="w-4 h-4 text-blue-400" /></div>
                 <div>
                   <p className="font-bold text-white">Mock Test Plan</p>
                   <p className="text-xs text-slate-300 mt-0.5">Every Sunday at 10:00 AM.</p>
                 </div>
               </li>
             </ul>
             
             <button className="mt-8 w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold rounded-xl transition-colors">Generate Full Schedule</button>
           </div>
        </div>

      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 transition-colors">Productivity vs Stress Flow</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1 transition-colors">AI tracking your burnout probability</p>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-pink-500"></div>
              <span className="dark:text-slate-300">Productivity</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <span className="dark:text-slate-300">Stress Level</span>
            </div>
          </div>
        </div>
        
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={burnOutData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#facc15" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#64748b" strokeOpacity={0.2} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#f8fafc' }}
                cursor={{ stroke: '#64748b', strokeWidth: 2, strokeOpacity: 0.2 }}
              />
              <Area type="monotone" dataKey="productivity" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorProd)" />
              <Area type="monotone" dataKey="stress" stroke="#facc15" strokeWidth={3} fillOpacity={1} fill="url(#colorStress)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
