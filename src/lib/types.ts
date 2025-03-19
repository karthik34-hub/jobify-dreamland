
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  resume?: Resume;
}

export interface Resume {
  id: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  locationType: 'remote' | 'onsite' | 'hybrid';
  salary?: string;
  postedAt: string;
  description: string;
  requirements: string[];
  skills: string[];
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  experienceLevel: 'entry' | 'intermediate' | 'senior' | 'executive';
  isFeatured?: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: 'applied' | 'under-review' | 'interviewed' | 'offered' | 'rejected';
  appliedAt: string;
  jobTitle: string;
  companyName: string;
  resumeId?: string;
  coverLetter?: string;
}

export interface FilterOptions {
  locationType?: ('remote' | 'onsite' | 'hybrid')[];
  employmentType?: ('full-time' | 'part-time' | 'contract' | 'internship')[];
  experienceLevel?: ('entry' | 'intermediate' | 'senior' | 'executive')[];
  skills?: string[];
  location?: string;
}
