import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { User, Mail, Shield, Book, Award, Settings, Share2, LogOut, Edit2, Save, X } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout, updateProfile } = useAuth();
  const { consistencyScore, totalTasks, theme, toggleTheme } = useData();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    university: user?.university || '',
    branch: user?.branch || '',
    semester: user?.semester || '',
    cgpa: user?.cgpa || '',
    studentId: user?.studentId || '',
    targetCgpa: user?.targetCgpa || ''
  });

  const handleSave = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      university: user?.university || '',
      branch: user?.branch || '',
      semester: user?.semester || '',
      cgpa: user?.cgpa || '',
      studentId: user?.studentId || '',
      targetCgpa: user?.targetCgpa || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 transition-colors">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1 transition-colors">Student Profile</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">Manage your academic identity and preferences.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 transition-colors">
        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-pink-400 to-yellow-400 p-1 relative shadow-lg">
          <div className="w-full h-full rounded-full border-4 border-white dark:border-slate-900 bg-white dark:bg-slate-800 flex items-center justify-center text-pink-500 text-5xl font-black transition-colors">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="inline-block px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 font-bold text-xs rounded-full uppercase tracking-widest mb-3 transition-colors">
            Pro Scholar
          </div>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 transition-colors">{user?.name}</h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center md:justify-start gap-2 transition-colors">
            <Mail className="w-4 h-4" /> {user?.email}
          </p>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Tasks Done</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white transition-colors">{totalTasks}</p>
          </div>
          <div className="w-px bg-slate-200 dark:bg-slate-700 transition-colors"></div>
          <div className="text-center">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Consistency</p>
            <p className="text-2xl font-black text-pink-500 dark:text-pink-400 transition-colors">{consistencyScore}%</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 transition-colors mb-6">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 transition-colors">
            <Book className="w-5 h-5 text-blue-500" /> Academic Profile
          </h4>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-pink-500 flex items-center gap-1 transition-colors">
               <Edit2 className="w-4 h-4" /> Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleCancel} className="text-sm font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 flex items-center gap-1 transition-colors">
                 <X className="w-4 h-4" /> Cancel
              </button>
              <button onClick={handleSave} className="text-sm font-bold text-pink-500 hover:text-pink-600 flex items-center gap-1 transition-colors">
                 <Save className="w-4 h-4" /> Save
              </button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors">
             <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 transition-colors">Student ID</p>
             {isEditing ? (
                <input type="text" value={editForm.studentId} onChange={(e) => setEditForm({...editForm, studentId: e.target.value})} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500" />
             ) : (
                <p className="font-bold text-slate-900 dark:text-white transition-colors">{user?.studentId || 'Not set'}</p>
             )}
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors">
             <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 transition-colors">University</p>
             {isEditing ? (
                <input type="text" value={editForm.university} onChange={(e) => setEditForm({...editForm, university: e.target.value})} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500" />
             ) : (
                <p className="font-bold text-slate-900 dark:text-white transition-colors">{user?.university || 'Not set'}</p>
             )}
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors">
             <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 transition-colors">Branch / Major</p>
             {isEditing ? (
                <input type="text" value={editForm.branch} onChange={(e) => setEditForm({...editForm, branch: e.target.value})} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500" />
             ) : (
                <p className="font-bold text-slate-900 dark:text-white transition-colors">{user?.branch || 'Not set'}</p>
             )}
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors">
             <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 transition-colors">Current Semester</p>
             {isEditing ? (
                <select value={editForm.semester} onChange={(e) => setEditForm({...editForm, semester: e.target.value})} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500">
                    <option value="">Select Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={String(s)}>Semester {s}</option>)}
                </select>
             ) : (
                <p className="font-bold text-slate-900 dark:text-white transition-colors">Semester {user?.semester || 'Not set'}</p>
             )}
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors">
             <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 transition-colors">Current CGPA</p>
             {isEditing ? (
                <input type="number" step="0.01" value={editForm.cgpa} onChange={(e) => setEditForm({...editForm, cgpa: e.target.value})} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500" />
             ) : (
                <p className="font-bold text-slate-900 dark:text-white transition-colors">{user?.cgpa || 'Not set'}</p>
             )}
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors">
             <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 transition-colors">Target CGPA</p>
             {isEditing ? (
                <input type="number" step="0.01" value={editForm.targetCgpa} onChange={(e) => setEditForm({...editForm, targetCgpa: e.target.value})} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500" />
             ) : (
                <p className="font-bold text-slate-900 dark:text-white transition-colors">{user?.targetCgpa || 'Not set'}</p>
             )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm transition-colors">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 transition-colors">
            <Shield className="w-5 h-5 text-yellow-500" /> Account Security
          </h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors">
               <div>
                 <p className="font-bold text-slate-900 dark:text-white transition-colors">Password</p>
                 <p className="text-xs font-medium text-slate-500 dark:text-slate-400 transition-colors">Last changed 3 months ago</p>
               </div>
               <button className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-pink-500 transition-colors">Update</button>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors">
               <div>
                 <p className="font-bold text-slate-900 dark:text-white transition-colors">Two-Factor Auth</p>
                 <p className="text-xs font-medium text-slate-500 dark:text-slate-400 transition-colors">Enhance your account security</p>
               </div>
               <button className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-pink-500 transition-colors">Enable</button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm transition-colors">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 transition-colors">
            <Book className="w-5 h-5 text-pink-500" /> Preferences
          </h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors">
               <div>
                 <p className="font-bold text-slate-900 dark:text-white transition-colors">Dark Theme</p>
                 <p className="text-xs font-medium text-slate-500 dark:text-slate-400 transition-colors">Toggle appearance</p>
               </div>
               <button 
                  onClick={toggleTheme}
                  className={`w-12 h-6 rounded-full transition-colors relative ${theme === 'dark' ? 'bg-pink-500' : 'bg-slate-300'}`}
                >
                 <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${theme === 'dark' ? 'left-7' : 'left-1'}`} />
               </button>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors">
               <div>
                 <p className="font-bold text-slate-900 dark:text-white transition-colors">Notifications</p>
                 <p className="text-xs font-medium text-slate-500 dark:text-slate-400 transition-colors">Daily reminders and alerts</p>
               </div>
               <button className="w-12 h-6 rounded-full bg-pink-500 relative transition-colors">
                 <div className="w-4 h-4 rounded-full bg-white absolute top-1 left-7 transition-all" />
               </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button onClick={logout} className="flex items-center gap-2 font-bold px-6 py-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors border border-red-200 dark:border-red-900/50">
           <LogOut className="w-4 h-4" /> Log out of OS
        </button>
      </div>
    </div>
  );
}
