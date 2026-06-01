import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Task {
  id: number;
  title: string;
  time: number;
  type: string;
  priority: string;
  completed: boolean;
}

export type Theme = 'light' | 'dark';

interface DataContextType {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  toggleTask: (id: number) => void;
  completedCount: number;
  totalTasks: number;
  consistencyScore: number;
  theme: Theme;
  toggleTheme: () => void;
}

const defaultTasks: Task[] = [
  { id: 1, title: 'Operating Systems: Deadlock Prevention', time: 45, type: 'Focus', priority: 'high', completed: false },
  { id: 2, title: 'Revise Database Normalization', time: 30, type: 'Revision', priority: 'medium', completed: false },
  { id: 3, title: 'Data Structures: Graph Traversals', time: 60, type: 'Practice', priority: 'high', completed: false },
];

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Optionally local storage could go here
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const consistencyScore = totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);

  return (
    <DataContext.Provider value={{
      tasks,
      setTasks,
      toggleTask,
      completedCount,
      totalTasks,
      consistencyScore,
      theme,
      toggleTheme
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};
