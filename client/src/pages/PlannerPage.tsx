import { useState } from 'react';
import { Play, Pause, Check, Clock, Calendar, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

export default function PlannerPage() {
  const { tasks, toggleTask } = useData();
  const { user } = useAuth();
  const [activeTask, setActiveTask] = useState<number | null>(null);
  
  const [activeDay, setActiveDay] = useState('Monday');

  const weakSub = user?.preferences?.weak || 'OS';
  const strongSub = user?.preferences?.strong || 'Math';
  const timePref = user?.preferences?.time || 'Night';

  const schedule = [
    { day: 'Monday', tasks: [{ subject: weakSub, hours: 2, type: 'Focus' }, { subject: 'DAA', hours: 1, type: 'Revision' }] },
    { day: 'Tuesday', tasks: [{ subject: 'DBMS', hours: 2, type: 'Focus' }, { subject: 'CN', hours: 1, type: 'Revision' }] },
    { day: 'Wednesday', tasks: [{ subject: 'Java', hours: 1.5, type: 'Lab Prep' }, { subject: strongSub, hours: 1.5, type: 'Focus' }] },
    { day: 'Thursday', tasks: [{ subject: weakSub, hours: 1, type: 'Revision' }, { subject: 'DBMS', hours: 2, type: 'Project' }] },
    { day: 'Friday', tasks: [{ subject: strongSub, hours: 2, type: 'Focus' }, { subject: 'CN', hours: 1, type: 'Revision' }] },
    { day: 'Saturday', tasks: [{ subject: 'Mock Test', hours: 3, type: 'Exam Prep' }] },
    { day: 'Sunday', tasks: [{ subject: 'Weekly Review', hours: 1, type: 'Planning' }] },
  ];

  const currentTasks = schedule.find(d => d.day === activeDay)?.tasks || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 transition-colors">
      
      {/* Left Column - Weekly Plan */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-between items-end flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1 transition-colors">AI Study Planner</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">Dynamically generated based on your weak subjects and goals.</p>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl transition-colors hover:bg-slate-200 dark:hover:bg-slate-700">
            <RefreshCw className="w-4 h-4" /> Regenerate Plan
          </button>
        </div>

        {/* Day Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {schedule.map(d => (
            <button 
              key={d.day}
              onClick={() => setActiveDay(d.day)}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-colors ${activeDay === d.day ? 'bg-pink-500 text-white shadow-md shadow-pink-500/20' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-pink-50 dark:hover:bg-slate-800'}`}
            >
              {d.day}
            </button>
          ))}
        </div>

        <div className="space-y-4">
            {currentTasks.map((task, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-xl flex items-center justify-center shrink-0 ${
                    task.type === 'Focus' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600' :
                    task.type === 'Revision' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                  }`}>
                    <Layers className="w-6 h-6" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{task.subject}</h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="flex items-center gap-1.5 text-sm font-bold text-slate-500 dark:text-slate-400">
                        <Clock className="w-4 h-4" /> {task.hours} hrs
                      </span>
                      <span className="text-xs font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded uppercase tracking-wider">{task.type}</span>
                    </div>
                  </div>
                </div>

                <button 
                    onClick={() => setActiveTask(idx)}
                    className={`p-4 rounded-xl transition-colors ${
                      activeTask === idx ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {activeTask === idx ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                 </button>
              </div>
            ))}
        </div>
      </div>

      {/* Right Column - Status & Timer */}
      <div className="space-y-6">
        {/* Active Session Timer */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 p-8 rounded-3xl text-white shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden transition-colors min-h-[300px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
          
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-4 relative z-10">Active Session</p>
          <div className="text-6xl font-black tabular-nums tracking-tighter mb-6 relative z-10 font-mono text-white">
            {activeTask !== null ? '59:59' : '00:00'}
          </div>
          
          <p className="text-slate-300 font-medium mb-8 max-w-xs relative z-10 text-sm">
            {activeTask !== null ? `Focusing on ${currentTasks[activeTask].subject}` : 'Select a study block to begin deep work.'}
          </p>

          <button 
            disabled={activeTask === null}
            className={`px-8 py-3.5 rounded-2xl font-bold transition-all relative z-10 shadow-lg ${
            activeTask !== null  ? 'bg-pink-500 text-white hover:bg-pink-600 shadow-pink-500/25' : 'bg-white/10 text-white/50 cursor-not-allowed border border-white/10'
          }`}>
            Complete Block
          </button>
        </div>

        {/* Schedule Insights */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-yellow-500" /> Plan Adjustments
          </h3>
          <div className="space-y-4">
             <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50">
                <p className="text-sm font-bold text-yellow-800 dark:text-yellow-400">DBMS hours increased</p>
                <p className="text-xs text-yellow-700 dark:text-yellow-500 mt-1 font-medium">Because your latest marks were 62%, the AI added 1 extra hour for DBMS.</p>
             </div>
             <div className="p-4 rounded-xl bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-900/50">
                <p className="text-sm font-bold text-pink-800 dark:text-pink-400">{weakSub} moved to {timePref}</p>
                <p className="text-xs text-pink-700 dark:text-pink-500 mt-1 font-medium">Based on your study preferences, weak subjects are scheduled to match your {timePref} block.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
