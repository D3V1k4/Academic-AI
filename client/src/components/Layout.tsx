import { ReactNode, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../context/DataContext';
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  TrendingUp, 
  Settings, 
  LogOut,
  Menu,
  X,
  Brain,
  Bell,
  Moon,
  Sun
} from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Daily Planner', path: '/planner' },
    { icon: BookOpen, label: 'Resources', path: '/resources' },
    { icon: TrendingUp, label: 'Progress', path: '/progress' },
    { icon: Settings, label: 'Setup', path: '/setup' },
  ];

  return (
    <div className={`min-h-screen flex font-sans selection:bg-pink-200 transition-colors ${theme === 'dark' ? 'dark bg-slate-950' : 'bg-slate-50'}`}>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-20 transition-colors">
        <div className="p-6 flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 mb-2 transition-colors">
          <div className="w-12 h-12 rounded-full border-2 border-pink-500 shadow-sm bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-pink-500 font-bold text-lg shrink-0 transition-colors">
            {(user?.studentId || user?.name || 'U').charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
             <p className="font-bold text-slate-900 dark:text-white truncate transition-colors text-lg">{user?.studentId || user?.name}</p>
             <p className="text-sm text-slate-500 dark:text-slate-400 font-medium transition-colors truncate">Semester {user?.semester || 'N/A'} • Target: {user?.targetCgpa || 'N/A'}</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive 
                    ? 'bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 font-semibold' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 font-medium'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute left-0 top-1 bottom-1 w-1 bg-pink-500 rounded-r-full"
                  />
                )}
                <Icon className={`w-5 h-5 ${isActive ? 'text-pink-500 dark:text-pink-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 transition-colors">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden dark:bg-slate-950 transition-colors">
        {/* Header */}
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-16 sm:h-20 flex items-center justify-between px-4 sm:px-8 z-10 transition-colors">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white hidden sm:block transition-colors">
              {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-5">
            <button 
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 text-slate-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-slate-800 rounded-full transition-all"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="p-2 sm:p-2.5 text-slate-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-slate-800 rounded-full transition-all relative">
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 border-2 border-white dark:border-slate-900 rounded-full transition-colors"></span>
              <Bell className="w-5 h-5" />
            </button>
            
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block transition-colors"></div>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 dark:text-white transition-colors">{user?.studentId || user?.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors">{user?.branch || 'Branch Not Set'}, Sem {user?.semester || 'N/A'}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-400 to-yellow-400 p-[2px]">
                <div className="w-full h-full rounded-full border-2 border-white dark:border-slate-900 bg-white dark:bg-slate-800 flex items-center justify-center text-pink-600 dark:text-pink-400 font-bold transition-colors">
                  {(user?.studentId || user?.name || 'U').charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-900 flex flex-col z-50 lg:hidden shadow-2xl transition-colors"
            >
              <div className="p-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-500 rounded-lg text-white">
                    <Brain className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-bold dark:text-white transition-colors">Academic AI</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-4 transition-colors">
                 <div className="w-12 h-12 rounded-full border-2 border-pink-500 shadow-sm bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-pink-500 font-bold text-lg shrink-0 transition-colors">
                    {(user?.studentId || user?.name || 'U').charAt(0).toUpperCase()}
                 </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-slate-900 dark:text-white truncate transition-colors text-lg">{user?.studentId || user?.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium transition-colors truncate">Semester {user?.semester || 'N/A'} • Target: {user?.targetCgpa || 'N/A'}</p>
                </div>
              </div>

              <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 font-semibold' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-pink-500 dark:text-pink-400' : 'text-slate-400 dark:text-slate-500'}`} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-slate-200 dark:border-slate-800 transition-colors">
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
