
import React from 'react';
import { Student } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { TrendingUp, Users, UserCheck, AlertCircle } from 'lucide-react';

interface DashboardProps {
  students: Student[];
}

const Dashboard: React.FC<DashboardProps> = ({ students }) => {
  const avgGpa = (students.reduce((acc, s) => acc + s.gpa, 0) / students.length).toFixed(2);
  const avgAttendance = (students.reduce((acc, s) => acc + s.attendance, 0) / students.length).toFixed(1);
  const activeStudents = students.filter(s => s.status === 'Active').length;
  const probationStudents = students.filter(s => s.status === 'Probation').length;

  const chartData = students.map(s => ({
    name: s.name.split(' ')[0],
    gpa: s.gpa,
    attendance: s.attendance
  }));

  const stats = [
    { label: 'Total Students', value: students.length, icon: <Users className="text-blue-600" />, bg: 'bg-blue-50' },
    { label: 'Avg Attendance', value: `${avgAttendance}%`, icon: <UserCheck className="text-green-600" />, bg: 'bg-green-50' },
    { label: 'Avg GPA', value: avgGpa, icon: <TrendingUp className="text-indigo-600" />, bg: 'bg-indigo-50' },
    { label: 'Academic Alert', value: probationStudents, icon: <AlertCircle className="text-red-600" />, bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-800">Academic Overview</h1>
        <p className="text-slate-500">Here's what's happening in your school today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Performance Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[0, 4.5]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="gpa" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Attendance Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="attendance" stroke="#10b981" fillOpacity={1} fill="url(#colorAttendance)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Recent Student Activity</h3>
          <button className="text-indigo-600 text-sm font-semibold hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">GPA</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.slice(0, 5).map(student => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full border border-slate-200" />
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.grade}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      student.status === 'Active' ? 'bg-green-100 text-green-700' : 
                      student.status === 'Probation' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-700">{student.gpa}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
