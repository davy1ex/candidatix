import { Resume } from '../model/types';

const mockResumes: Resume[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    skillsTag: ['React', 'TypeScript', 'Next.js'],
    workExperience: '• Developed SPA and optimized UI performance\n• Created UI Components lib\n• Create AI writed reponse to resume',
    experienceYears: 3,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-04-01T15:30:00Z',
  },
  {
    id: '2',
    title: 'Fullstack Developer',
    skillsTag: ['Node.js', 'PostgreSQL', 'React'],
    workExperience: 'Built APIs and integrated frontend',
    experienceYears: 5,
    createdAt: '2023-06-15T09:20:00Z',
    updatedAt: '2024-03-20T12:45:00Z',
  },
];


export async function getAllResumes(): Promise<Resume[]> {
  return mockResumes;
}

export async function getResumeById(id: string): Promise<Resume | null> {
  return mockResumes.find((r) => r.id === id) ?? null;
}
