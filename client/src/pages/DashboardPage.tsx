import { AlertCircle, Target, TrendingUp, Book, Brain } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function DashboardPage() {
  const { user } = useAuth();
  
  const dynamicSubjects = user?.subjects && user.subjects.length > 0 
    ? user.subjects.map((s, i) => ({
        name: s.name,
        marks: 58 + i * 5,
        attendance: 75 + i * 3,
        assignments: 80 + i * 4,
      }))
    : [
        { name: 'OS', marks: 58, attendance: 75, assignments: 80 },
        { name: 'DBMS', marks: 62, attendance: 72, assignments: 85 },
        { name: 'CN', marks: 75, attendance: 85, assignments: 90 },
        { name: 'Java', marks: 89, attendance: 90, assignments: 95 },
        { name: 'Math', marks: 92, attendance: 95, assignments: 100 },
      ];

  const weakSubjects = user?.preferences?.weak || 'your weak subjects';

  const currentCGPA = parseFloat(user?.cgpa || '7.2');
  const targetCGPA = parseFloat(user?.targetCgpa || '8.5');
  const progressPercent = targetCGPA ? Math.min(100, Math.max(0, (currentCGPA / targetCGPA) * 100)).toFixed(1) : '0.0';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 transition-colors">
      
      {/* Top Banner / Welcome */}
      <div className="lg:col-span-3 bg-pink-500 rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between text-white shadow-sm border border-pink-600/20">
        <div>
          <h2 className="text-3xl font-black mb-2 tracking-tight">Welcome back, {user?.name || 'Student'}</h2>
          <p className="font-medium opacity-90">{user?.branch ? `${user.branch} • ` : ''}Semester {user?.semester || 'N/A'}</p>
        </div>
        <div className="mt-6 md:mt-0 px-6 py-3 bg-white/20 rounded-2xl border border-white/20 backdrop-blur-sm">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Academic Status</p>
          <div className="text-xl font-bold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400"></span> On Track</div>
        </div>
      </div>

      {/* CGPA Tracker */}
      <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-2xl">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">CGPA Tracker</h3>
        </div>
        
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">Current CGPA</p>
            <p className="text-4xl font-black text-slate-900 dark:text-white">{currentCGPA}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">Target</p>
            <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">{targetCGPA}</p>
          </div>
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-4 mb-4 overflow-hidden border border-slate-200 dark:border-slate-700">
          <div className="bg-yellow-400 h-full rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <p className="text-right font-bold text-yellow-500">{progressPercent}% to Goal</p>
      </div>

      {/* AI Insights Card */}
      <div className="lg:col-span-2 bg-slate-900 dark:bg-slate-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-sm">
        <div className="absolute -top-10 -right-10 opacity-10">
          <Brain className="w-64 h-64" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-pink-500/20 text-pink-400 text-xs font-black uppercase tracking-widest rounded-lg border border-pink-500/30">AI Analysis Engine</span>
          </div>
          
          <h3 className="text-2xl font-bold mb-6">Academic Recommendations</h3>
          
          <div className="space-y-4">
            <div className="bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <p className="font-medium text-slate-200 leading-relaxed">
                "To achieve a CGPA of <span className="font-bold text-yellow-400">{targetCGPA}</span>, you should focus more on <span className="font-bold text-pink-400">{weakSubjects}</span>. Based on your current performance, spending {user?.preferences?.hours || '2'} additional hours daily on these subjects can significantly improve your semester score."
              </p>
            </div>
            
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 backdrop-blur-sm flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
              <p className="font-medium text-red-100">
                <span className="font-bold text-red-300">Attendance Warning:</span> Your attendance in {dynamicSubjects[0]?.name || 'DBMS'} is below 75% (Currently {dynamicSubjects[0]?.attendance || 72}%). Improving attendance can increase your internal marks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Performance Chart */}
      <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Subject Performance Analysis</h3>
          </div>
          <div className="text-sm font-bold bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300">Current Semester</div>
        </div>
        
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dynamicSubjects}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontWeight: 'bold' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontWeight: 'bold' }} dx={-10} />
              <Tooltip 
                cursor={{ fill: '#f1f5f9', opacity: 0.1 }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px', fontWeight: 'bold' }} />
              <Bar dataKey="marks" name="Internal Marks (%)" fill="#ec4899" radius={[4, 4, 0, 0]} />
              <Bar dataKey="attendance" name="Attendance (%)" fill="#facc15" radius={[4, 4, 0, 0]} />
              <Bar dataKey="assignments" name="Assignments (%)" fill="#334155" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    </div>
  );
}
