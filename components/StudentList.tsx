
import React, { useState } from 'react';
import { Student } from '../types';
import { Plus, MoreVertical, Filter, Download, Mail, Trash2, Edit } from 'lucide-react';

interface StudentListProps {
  students: Student[];
  onAddStudent: () => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onAddStudent }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Student Directory</h1>
          <p className="text-slate-500">Manage all registered students in the institution.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-200 transition-colors">
            <Download size={18} />
            Export
          </button>
          <button 
            onClick={onAddStudent}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-md active:scale-95"
          >
            <Plus size={18} />
            Add Student
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <input 
            type="text" 
            placeholder="Search by name, email or grade..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium">
            <Filter size={18} />
            Filters
          </button>
          <select className="flex-1 sm:flex-none px-4 py-2.5 border border-slate-200 rounded-xl text-slate-600 bg-white hover:bg-slate-50 transition-colors text-sm font-medium focus:outline-none">
            <option>All Grades</option>
            <option>10th Grade</option>
            <option>11th Grade</option>
            <option>12th Grade</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Grade</th>
                <th className="px-6 py-4">GPA</th>
                <th className="px-6 py-4">Attendance</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full border-2 border-slate-100 group-hover:border-indigo-100 transition-colors" />
                        <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                          student.status === 'Active' ? 'bg-green-500' : 
                          student.status === 'Probation' ? 'bg-red-500' : 'bg-slate-300'
                        }`}></span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {student.grade}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-bold text-slate-800">{student.gpa}</span>
                      <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500" 
                          style={{ width: `${(student.gpa / 4.0) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-bold text-slate-800">{student.attendance}%</span>
                      <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${student.attendance > 90 ? 'bg-green-500' : student.attendance > 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${student.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-tight ${
                      student.status === 'Active' ? 'bg-green-100 text-green-700' : 
                      student.status === 'Probation' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                        <Mail size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                        <Plus className="text-slate-300" size={32} />
                      </div>
                      <p className="font-semibold">No students found</p>
                      <p className="text-sm">Try adjusting your search or filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
          <p>Showing {filteredStudents.length} of {students.length} students</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
