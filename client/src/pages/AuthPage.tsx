import { useState, FormEvent, ChangeEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, ArrowRight } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const { login, register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    university: '',
    branch: '',
    semester: '',
    cgpa: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isForgotPassword) {
      alert("Password reset instructions sent.");
      setIsForgotPassword(false);
      return;
    }
    if (isLogin) {
      login(formData);
    } else {
      register(formData);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const TopLogo = () => (
    <div className="flex items-center gap-3 lg:mb-10 mb-6 justify-center">
      <div className="p-2 bg-pink-500 rounded-lg shadow-sm">
        <Brain className="w-6 h-6 text-white" />
      </div>
      <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Academic AI</h1>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans overflow-hidden selection:bg-pink-200">
      {/* Left side - Visual & Quote */}
      <div className="hidden lg:flex w-1/2 bg-yellow-300 p-12 flex-col justify-center items-center relative overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNHYtbGgtaHYzbDR2NGgtNHY0aC00di00aC00di00aDR2LTRoNHptMC0xNGgtdi00aDR2NGg0djRoLTR2LTRoLTR2NGgtNHYtNGg0em0wLTRoLTR2LTRoNHY0aDR2NGgtNHYtNGgtNHY0aC00di00aDR6IiBmaWxsPSIjYzk5MzE1IiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvZz48L3N2Zz4=')]">
        
        <div className="relative z-10 w-full max-w-lg">
          <div className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-t-xl absolute -top-4 left-1/2 -translate-x-1/2 uppercase tracking-widest z-20">
            Quote
          </div>
          <div className="bg-white rounded-[2rem] border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] p-12 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-8">
              "A goal without a plan<br/>is just a wish."
            </h2>
            
            <div className="border-t-2 border-slate-900 pt-8 mt-4">
              <p className="font-bold text-slate-900 text-lg uppercase tracking-wider mb-1">
                Antoine de Saint-Exupéry
              </p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                LE PETIT PRINCE - 1943
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 w-full text-center text-yellow-700 font-bold uppercase tracking-widest text-[10px]">
          YOUR PERSONALIZED AI ACADEMIC MENTOR
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-slate-50 relative overflow-y-auto">
        <div className="w-full max-w-md my-auto">
          <TopLogo />

          <motion.div
            layout
            className="p-8 sm:p-10 bg-white rounded-3xl shadow-sm border border-slate-200"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
                {isForgotPassword ? 'Reset Password' : isLogin ? 'Welcome back' : 'Create account'}
              </h2>
              <p className="text-slate-500 font-medium">
                {isForgotPassword ? 'Enter your email to receive a reset link.' : isLogin ? 'Access your AI Academic Mentor.' : 'Set up your academic profile today.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isForgotPassword && (
                  <div className="flex gap-1 p-1 bg-slate-100 rounded-xl mb-6">
                    <button 
                      type="button" 
                      onClick={() => setIsLogin(true)} 
                      className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${isLogin ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Login
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setIsLogin(false)} 
                      className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${!isLogin ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Register
                    </button>
                  </div>
              )}

              <AnimatePresence mode="popLayout">
                {!isLogin && !isForgotPassword && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -20 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -20 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <input
                      type="text"
                      name="name"
                      required={!isLogin}
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all font-medium placeholder-slate-400"
                      placeholder="Full Name"
                    />
                    <input
                      type="text"
                      name="university"
                      required={!isLogin}
                      value={formData.university}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all font-medium placeholder-slate-400"
                      placeholder="University / College"
                    />
                    <input
                      type="text"
                      name="branch"
                      required={!isLogin}
                      value={formData.branch}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all font-medium placeholder-slate-400"
                      placeholder="Branch / Major (e.g. Computer Science)"
                    />
                    <div className="flex gap-4">
                        <select
                          name="semester"
                          required={!isLogin}
                          value={formData.semester}
                          onChange={handleChange}
                          className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all font-medium text-slate-700"
                        >
                          <option value="">Semester</option>
                          {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <input
                          type="number"
                          step="0.01"
                          name="cgpa"
                          required={!isLogin}
                          value={formData.cgpa}
                          onChange={handleChange}
                          className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all font-medium placeholder-slate-400"
                          placeholder="Current CGPA"
                        />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all font-medium placeholder-slate-400"
                  placeholder="Email Address"
                />
                
                {!isForgotPassword && (
                    <input
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all font-medium placeholder-slate-400"
                      placeholder="Password"
                    />
                )}
              </div>

              {isLogin && !isForgotPassword && (
                  <div className="text-right mt-2">
                    <button type="button" onClick={() => setIsForgotPassword(true)} className="font-bold text-xs text-pink-500 hover:text-pink-600">FORGOT PASSWORD?</button>
                  </div>
              )}

              {isForgotPassword && (
                 <div className="text-center mt-4">
                   <button type="button" onClick={() => setIsForgotPassword(false)} className="font-bold text-sm text-slate-500 hover:text-slate-700">Back to Login</button>
                 </div>
              )}

              <button
                type="submit"
                className="w-full py-4 mt-6 bg-pink-500 hover:bg-pink-600 transition-colors rounded-xl font-bold text-white shadow-lg shadow-pink-200 flex justify-center items-center gap-2"
              >
                {isForgotPassword ? 'Send Reset Link' : isLogin ? 'Login to Academic AI' : 'Create Academic Profile'} <ArrowRight className="w-5 h-5 ml-1" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
