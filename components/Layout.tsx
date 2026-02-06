
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  CalendarCheck, 
  BrainCircuit, 
  LogOut,
  Bell,
  Search
} from 'lucide-react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'students', label: 'Students', icon: <Users size={20} /> },
    { id: 'grades', label: 'Grades', icon: <GraduationCap size={20} /> },
    { id: 'attendance', label: 'Attendance', icon: <CalendarCheck size={20} /> },
    { id: 'ai-insights', label: 'AI Insights', icon: <BrainCircuit size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <div className="flex items-center gap-3 text-indigo-600">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <GraduationCap size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">EduPulse AI</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as ViewType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeView === item.id 
                  ? 'bg-indigo-50 text-indigo-600 font-medium' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-indigo-600 rounded-2xl p-4 text-white mb-4">
            <p className="text-xs font-medium opacity-80 mb-1">PRO PLAN</p>
            <p className="text-sm font-semibold mb-3">AI Insights Enabled</p>
            <button className="w-full bg-white text-indigo-600 py-2 rounded-lg text-sm font-bold shadow-sm">
              Manage API
            </button>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 transition-colors">
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="relative w-96 hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search students, classes, records..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1 rounded-lg transition-colors">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800">Admin User</p>
                <p className="text-xs text-slate-500">Principal's Office</p>
              </div>
              <img 
                src="https://picsum.photos/seed/admin/100" 
                alt="Profile" 
                className="w-9 h-9 rounded-full border border-slate-200 shadow-sm"
              />
            </div>
          </div>
        </header>

        <main className="p-6 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
