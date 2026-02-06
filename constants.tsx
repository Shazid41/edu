
import { Student } from './types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.j@school.edu',
    grade: '10th Grade',
    avatar: 'https://picsum.photos/seed/alice/200',
    gpa: 3.8,
    attendance: 98,
    enrolledDate: '2023-09-01',
    status: 'Active',
    subjects: [
      { subject: 'Mathematics', score: 92, teacher: 'Dr. Smith' },
      { subject: 'Physics', score: 88, teacher: 'Prof. Miller' },
      { subject: 'Literature', score: 95, teacher: 'Ms. Davis' }
    ],
    notes: 'Exceptional performance in writing. Participates in debate club.'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.s@school.edu',
    grade: '11th Grade',
    avatar: 'https://picsum.photos/seed/bob/200',
    gpa: 2.9,
    attendance: 82,
    enrolledDate: '2023-09-01',
    status: 'Probation',
    subjects: [
      { subject: 'Mathematics', score: 65, teacher: 'Dr. Smith' },
      { subject: 'Physics', score: 70, teacher: 'Prof. Miller' },
      { subject: 'History', score: 78, teacher: 'Mr. Wilson' }
    ],
    notes: 'Struggling with math concepts. Missed several classes recently.'
  },
  {
    id: '3',
    name: 'Catherine Lee',
    email: 'cath.lee@school.edu',
    grade: '10th Grade',
    avatar: 'https://picsum.photos/seed/catherine/200',
    gpa: 4.0,
    attendance: 100,
    enrolledDate: '2023-09-01',
    status: 'Active',
    subjects: [
      { subject: 'Biology', score: 98, teacher: 'Mrs. Green' },
      { subject: 'Chemistry', score: 99, teacher: 'Dr. White' },
      { subject: 'French', score: 97, teacher: 'Mme. Dubois' }
    ],
    notes: 'Top of her class. Interested in medical school.'
  },
  {
    id: '4',
    name: 'Daniel Brown',
    email: 'dbrown@school.edu',
    grade: '12th Grade',
    avatar: 'https://picsum.photos/seed/daniel/200',
    gpa: 3.2,
    attendance: 90,
    enrolledDate: '2022-09-01',
    status: 'Active',
    subjects: [
      { subject: 'Advanced Math', score: 82, teacher: 'Dr. Smith' },
      { subject: 'Comp Science', score: 89, teacher: 'Mr. Gates' },
      { subject: 'Philosophy', score: 85, teacher: 'Ms. Plato' }
    ],
    notes: 'Strong analytical skills. Enjoys programming.'
  }
];

export const SUBJECTS = [
  'Mathematics', 'Physics', 'Biology', 'Chemistry', 'Literature', 
  'History', 'Geography', 'Art', 'Comp Science', 'Physical Ed'
];
