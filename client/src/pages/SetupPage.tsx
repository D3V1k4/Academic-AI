import { useState } from 'react';
import { Target, Book, Calendar, ChevronRight, Save, Upload, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SetupPage() {
  const { user, completeSetup, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [academicInfo, setAcademicInfo] = useState({ 
    prevCgpa: user?.cgpa || '', 
    targetCgpa: user?.targetCgpa || '',
    studentId: user?.studentId || '',
    branch: user?.branch || '',
    semester: user?.semester || ''
  });
  const [subjects, setSubjects] = useState([{ name: 'Operating Systems', credits: '4' }]);
  const [prefs, setPrefs] = useState({ hours: '4', time: 'Night', weak: '', strong: '' });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else finishSetup();
  };

  const finishSetup = () => {
    setLoading(true);
    
    updateProfile({
      cgpa: academicInfo.prevCgpa,
      targetCgpa: academicInfo.targetCgpa,
      studentId: academicInfo.studentId,
      branch: academicInfo.branch,
      semester: academicInfo.semester,
      subjects: subjects,
      preferences: prefs
    });

    setTimeout(() => {
      completeSetup();
      navigate('/dashboard');
    }, 1500);
  };

  const addSubject = () => setSubjects([...subjects, { name: '', credits: '3' }]);

  return (
    <div className="max-w-3xl mx-auto space-y-8 transition-colors p-4 sm:p-8">
      <div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2 transition-colors">Academic Profile Setup</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">Calibrate your AI Mentor by providing your current academic footprint.</p>
      </div>

      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className={`h-2 flex-1 rounded-full transition-colors ${step >= i ? 'bg-pink-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors min-h-[400px]">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-xl font-bold flex items-center gap-2 dark:text-white"><Book className="text-pink-500" /> Academic & Subjects</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">Student ID</label>
                <input type="text" value={academicInfo.studentId} onChange={e => setAcademicInfo({...academicInfo, studentId: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">Branch / Major</label>
                <input type="text" value={academicInfo.branch} onChange={e => setAcademicInfo({...academicInfo, branch: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-slate-900 dark:text-white" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">Semester</label>
                <select value={academicInfo.semester} onChange={e => setAcademicInfo({...academicInfo, semester: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-slate-900 dark:text-white">
                  <option value="">Select</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={String(s)}>Sem {s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">Current CGPA</label>
                <input type="number" step="0.01" value={academicInfo.prevCgpa} onChange={e => setAcademicInfo({...academicInfo, prevCgpa: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">Target CGPA</label>
                <input type="number" step="0.01" value={academicInfo.targetCgpa} onChange={e => setAcademicInfo({...academicInfo, targetCgpa: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-slate-900 dark:text-white" />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">Subjects for Current Semester</label>
              <div className="space-y-3">
                {subjects.map((s, idx) => (
                  <div key={idx} className="flex gap-4">
                     <input type="text" placeholder="Subject Name" value={s.name} onChange={e => {
                       const newS = [...subjects]; newS[idx].name = e.target.value; setSubjects(newS);
                     }} className="flex-[2] px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-slate-900 dark:text-white" />
                     <input type="number" placeholder="Credits" value={s.credits} onChange={e => {
                       const newS = [...subjects]; newS[idx].credits = e.target.value; setSubjects(newS);
                     }} className="flex-[1] px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-slate-900 dark:text-white" />
                  </div>
                ))}
                <button onClick={addSubject} className="text-sm font-bold text-pink-500 hover:text-pink-600">+ Add Subject</button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
             <h3 className="text-xl font-bold flex items-center gap-2 dark:text-white"><Calendar className="text-pink-500" /> Timetable Sync</h3>
             <p className="text-slate-500 dark:text-slate-400 font-medium">Upload your schedule or sync it. The AI will extract classes, lab timings, and assignment deadlines.</p>
             
             <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-10 flex flex-col items-center justify-center text-center bg-slate-50 dark:bg-slate-800/50">
                <Upload className="w-10 h-10 text-slate-400 mb-4" />
                <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">Drag and drop your syllabus or timetable</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Supports .txt, .csv, .pdf</p>
                <button className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-6 py-2 rounded-lg font-bold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-600">Choose File</button>
             </div>
             <p className="text-center font-bold text-slate-400">OR</p>
             <button className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700">Manually Enter Schedule Later</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-xl font-bold flex items-center gap-2 dark:text-white"><Target className="text-pink-500" /> Study Preferences</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">Daily Study Hours</label>
                <input type="number" value={prefs.hours} onChange={e => setPrefs({...prefs, hours: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">Preferred Study Time</label>
                <select value={prefs.time} onChange={e => setPrefs({...prefs, time: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-slate-900 dark:text-white">
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Night</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">Weak Subjects</label>
                <input type="text" placeholder="e.g. Operating Systems" value={prefs.weak} onChange={e => setPrefs({...prefs, weak: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">Strong Subjects</label>
                <input type="text" placeholder="e.g. DBMS" value={prefs.strong} onChange={e => setPrefs({...prefs, strong: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-slate-900 dark:text-white" />
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-between">
          <button onClick={() => setStep(step - 1)} disabled={step === 1} className={`px-6 py-3 font-bold ${step === 1 ? 'text-slate-300 dark:text-slate-600' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>Back</button>
          
          <button 
             onClick={handleNext} 
             disabled={loading}
             className="bg-yellow-400 text-slate-900 hover:bg-yellow-500 px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm"
          >
            {loading ? 'Analyzing...' : step === 3 ? 'Generate Dashboard' : 'Next Step'} 
            {!loading && <ArrowRight className="w-5 h-5 ml-1" />}
          </button>
        </div>
      </div>
    </div>
  );
}
