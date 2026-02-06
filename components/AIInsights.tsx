
import React, { useState, useEffect } from 'react';
import { Student, AIAnalysis } from '../types';
import { analyzeStudent, generateClassSummary } from '../services/geminiService';
import { Sparkles, Brain, ArrowRight, Loader2, ShieldCheck, AlertTriangle, Info } from 'lucide-react';

interface AIInsightsProps {
  students: Student[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ students }) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [classSummary, setClassSummary] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [classLoading, setClassLoading] = useState<boolean>(false);

  const selectedStudent = students.find(s => s.id === selectedStudentId);

  const fetchAnalysis = async () => {
    if (!selectedStudent) return;
    setLoading(true);
    try {
      const data = await analyzeStudent(selectedStudent);
      setAnalysis(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClassSummary = async () => {
    setClassLoading(true);
    try {
      const data = await generateClassSummary(students);
      setClassSummary(data);
    } catch (error) {
      console.error(error);
    } finally {
      setClassLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, [selectedStudentId]);

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Brain className="text-indigo-600" />
          Predictive AI Insights
        </h1>
        <p className="text-slate-500">Gemini-powered analysis of student performance and behavioral trends.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Selector */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Select Student</h3>
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {students.map(student => (
                <button
                  key={student.id}
                  onClick={() => setSelectedStudentId(student.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    selectedStudentId === student.id 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full border border-white/20" />
                  <div className="text-left overflow-hidden">
                    <p className="text-sm font-bold truncate">{student.name}</p>
                    <p className={`text-[10px] ${selectedStudentId === student.id ? 'text-indigo-100' : 'text-slate-500'}`}>GPA: {student.gpa}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-2xl text-white shadow-lg">
            <Sparkles size={24} className="mb-4 text-indigo-200" />
            <h3 className="text-lg font-bold mb-2">Class Summary</h3>
            <p className="text-indigo-100 text-sm mb-4">Get a comprehensive overview of the entire cohort's performance.</p>
            <button 
              onClick={fetchClassSummary}
              disabled={classLoading}
              className="w-full bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all border border-white/10"
            >
              {classLoading ? <Loader2 className="animate-spin" size={18} /> : 'Generate Report'}
            </button>
          </div>
        </div>

        {/* AI Output */}
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                <Brain className="text-indigo-600 animate-pulse" size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Analyzing Performance...</h3>
              <p className="text-slate-500 max-w-sm">Gemini is processing grades, attendance, and notes to provide strategic advice.</p>
            </div>
          ) : analysis ? (
            <div className="space-y-6">
              {/* Analysis Header */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <img src={selectedStudent?.avatar} className="w-16 h-16 rounded-2xl border-2 border-slate-100" />
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">{selectedStudent?.name}</h2>
                      <p className="text-slate-500 font-medium">{selectedStudent?.grade}</p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl flex items-center gap-2 font-bold ${
                    analysis.riskLevel === 'Low' ? 'bg-green-50 text-green-700' :
                    analysis.riskLevel === 'Medium' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {analysis.riskLevel === 'Low' ? <ShieldCheck size={20} /> : <AlertTriangle size={20} />}
                    {analysis.riskLevel} Risk
                  </div>
                </div>
                
                <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 mb-6">
                  <div className="flex items-start gap-3">
                    <Info className="text-indigo-600 mt-0.5 shrink-0" size={18} />
                    <p className="text-slate-700 text-sm leading-relaxed italic">
                      "{analysis.summary}"
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Key Strengths
                    </h4>
                    <ul className="space-y-2">
                      {analysis.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                          <ArrowRight size={16} className="text-green-500 mt-0.5 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Areas for Growth
                    </h4>
                    <ul className="space-y-2">
                      {analysis.weaknesses.map((w, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                          <ArrowRight size={16} className="text-red-400 mt-0.5 shrink-0" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Sparkles className="text-yellow-500" size={20} />
                  Actionable Recommendations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.recommendations.map((rec, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-700 flex items-start gap-3">
                      <div className="bg-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs text-indigo-600 shadow-sm shrink-0">
                        {i + 1}
                      </div>
                      {rec}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
              <Brain className="text-slate-300 mb-4" size={48} />
              <h3 className="text-lg font-bold text-slate-800">Select a student for AI analysis</h3>
              <p className="text-slate-500 max-w-xs mx-auto">Analyze grades and behavior to help students reach their full potential.</p>
            </div>
          )}

          {/* Class Summary Output */}
          {classSummary && (
            <div className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-lg animate-in slide-in-from-bottom-4 duration-500">
               <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Brain className="text-indigo-600" size={20} />
                Strategic Class Report
              </h3>
              <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-line leading-relaxed">
                {classSummary}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
