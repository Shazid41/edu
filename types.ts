
export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  avatar: string;
  gpa: number;
  attendance: number;
  enrolledDate: string;
  status: 'Active' | 'Inactive' | 'Probation';
  subjects: SubjectGrade[];
  notes: string;
}

export interface SubjectGrade {
  subject: string;
  score: number;
  teacher: string;
}

export interface AIAnalysis {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
}

export type ViewType = 'dashboard' | 'students' | 'attendance' | 'grades' | 'ai-insights';
